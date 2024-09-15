function gerarNumeroAleatorio(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarFloatAleatorio(
  min: number,
  max: number,
  precision: number,
): number {
  const fator = Math.pow(10, precision);
  return Math.floor(Math.random() * (max - min + 1) * fator) / fator;
}

export function gerarDadosClima(data: string) {
  const neblina = gerarNumeroAleatorio(0, 10);
  const mare = Math.random() > 0.5 ? 'enchente' : 'vazante';
  const vento = gerarNumeroAleatorio(0, 50); // valor de vento em nós
  const ondas = gerarFloatAleatorio(0.1, 5, 1); // altura da onda em metros com precisão de 1 decimal
  const climas = ['ensolarado', 'tempestade', 'nublado'];
  const clima = climas[gerarNumeroAleatorio(0, climas.length - 1)];

  return {
    neblina,
    mare,
    vento,
    ondas,
    clima,
    data,
  };
}
