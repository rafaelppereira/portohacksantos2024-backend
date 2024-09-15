import { Controller, Sse } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FindTrafficRangeService } from './services/find-traffic-range.service';
@Controller({ version: '1', path: 'santosbrasil' })
export class APSController {
  constructor(
    private readonly findTrafficRangeService: FindTrafficRangeService,
  ) {}

  @Sse('traffic-range')
  trafficRange(): Observable<any> {
    return interval(60000).pipe(
      startWith(0),
      switchMap(async () => {
        const data = await this.findTrafficRangeService.execute();
        return data;
      }),
      map((result) => ({
        data: result,
      })),
    );
  }
}
