export interface TrafficData {
  data: string;
  periodo: string;
  eta: string;
  local: string;
  nomenavio: string;
  imo: number;
  mercadoria: string;
  manobra: string;
  viagem: string;
  duv: number;
  liberado: number;
  pendente: number;
}

export function formatTrafficResultMapper(data: TrafficData[]) {
  const result = data.map((r, i) => {
    return {
      index: i,
      duv: r.duv,
      arrivalNotice: {
        eta: r.eta,
        IMO: r.imo,
        RAP: r.viagem,
        scaleType: r.manobra,
        shipName: r.nomenavio,
      },
      forecast: {
        RAP: r.viagem,
        IMO: r.imo,
        local: r.local,
        eta: r.eta,
        scaleType: r.manobra,
      },
    };
  });

  return result;
}
