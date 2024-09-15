import { formatTrafficResultMapper } from '@/mappers/format-traffic-result.mapper';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { gerarDadosClima } from '@/utils/generate-data';

@Injectable()
export class FindTrafficRangeService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private generateRandomData(): any[] {
    return Array.from({ length: 1 }, () => ({
      index: 9999,
      duv: '9020902390',
      arrivalNotice: {
        eta: '06/09/2024',
        IMO: 982968102394,
        RAP: '3994/2024',
        scaleType: 'ATRACACAO',
        shipName: 'NITRO HUB',
      },
      forecast: {
        RAP: '3994/2024',
        IMO: 982968102394,
        local: 'AL 4',
        eta: '06/09/2024',
        scaleType: 'ATRACACAO',
      },
    }));
  }

  async execute() {
    let data = null;

    try {
      const response = await lastValueFrom(
        this.httpService.get(
          'https://intranet.portodesantos.com.br/_json/porto_hoje.asp?tipo=programados2',
        ),
      );
      data = response.data;
    } catch (error) {
      console.error('Failed to fetch traffic data', error);
      return { error: 'Failed to fetch traffic data' };
    }

    const simulatedData = this.generateRandomData();

    const formattedData = [
      ...simulatedData,
      ...formatTrafficResultMapper(data),
    ];

    const cachedData: any = await this.cacheManager.get('key');

    if (cachedData) {
      const formattedCachedData = cachedData;

      const currentData = formattedData.find(
        (f) => f.arrivalNotice.IMO === 982968102394,
      );

      const removeCurrentData = formattedData.filter(
        (f) => f.arrivalNotice.IMO !== 982968102394,
      );

      const markedData = this.markChanges(formattedCachedData, [
        {
          index: currentData.index,
          duv: currentData.duv,
          arrivalNotice: {
            eta: currentData.arrivalNotice.eta,
            IMO: 9829681,
            RAP: currentData.arrivalNotice.RAP,
            scaleType: currentData.arrivalNotice.scaleType,
            shipName: currentData.arrivalNotice.shipName,
          },
          forecast: {
            RAP: currentData.forecast.RAP,
            IMO: 9829681,
            local: currentData.forecast.local,
            eta: currentData.forecast.eta,
            scaleType: currentData.forecast.scaleType,
          },
        },
        ...removeCurrentData,
      ]);

      await this.cacheManager.set('key', formattedData, 90000);

      const forecast = markedData.map((m) => {
        const neblina = gerarDadosClima(m.arrivalNotice.eat).neblina;
        const clima = gerarDadosClima(m.arrivalNotice.eat).clima;
        const mare = gerarDadosClima(m.arrivalNotice.eat).mare;
        const ondas = gerarDadosClima(m.arrivalNotice.eat).ondas;
        const vento = gerarDadosClima(m.arrivalNotice.eat).vento;

        let delay = 0;

        if (neblina > 8) {
          delay = null;
        } else {
          if (clima === 'tempestade') {
            delay += 1; // 1 hora de atraso
          }
          if (mare === 'vazante') {
            delay += 0.5; // 30 minutos de atraso
          }
          if (ondas > 0.7) {
            delay += 2; // 2 horas de atraso
          }
          if (vento > 20) {
            delay += 1; // 1 hora de atraso
          }
        }

        return {
          ...m,
          mare,
          ondas,
          clima,
          vento,
          neblina,
          delay: delay !== null ? `${delay} hora(s)` : 'Acesso negado ao porto',
        };
      });

      return forecast;
    } else {
      await this.cacheManager.set('key', formattedData, 90000);

      const forecast = formattedData.map((m) => {
        const neblina = gerarDadosClima(m.arrivalNotice.eat).neblina;
        const clima = gerarDadosClima(m.arrivalNotice.eat).clima;
        const mare = gerarDadosClima(m.arrivalNotice.eat).mare;
        const ondas = gerarDadosClima(m.arrivalNotice.eat).ondas;
        const vento = gerarDadosClima(m.arrivalNotice.eat).vento;

        let delay = 0;

        if (neblina > 8) {
          delay = null;
        } else {
          if (clima === 'tempestade') {
            delay += 1; // 1 hora de atraso
          }
          if (mare === 'vazante') {
            delay += 0.5; // 30 minutos de atraso
          }
          if (ondas > 0.7) {
            delay += 2; // 2 horas de atraso
          }
          if (vento > 20) {
            delay += 1; // 1 hora de atraso
          }
        }

        return {
          ...m,
          mare,
          ondas,
          clima,
          vento,
          neblina,
          delay: delay !== null ? `${delay} hora(s)` : 'Acesso negado ao porto',
        };
      });
      return forecast;
    }
  }

  private markChanges(cachedData: any[], newData: any[]): any[] {
    const markedData = newData.map((newItem) => {
      const cachedItem = cachedData.find(
        (item) => item.index === newItem.index,
      );

      if (cachedItem) {
        const isChanged =
          JSON.stringify(cachedItem) !== JSON.stringify(newItem);

        if (isChanged) {
          return { ...newItem, alterado: 'true' };
        }
      }

      return newItem;
    });

    return markedData;
  }
}
