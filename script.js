function aplicarEstrategia() {
  const resultado = document.getElementById('resultado');
  const n = numeros.length;
  if (n < 4) return;

  const corAtual = obterCor(numeros[n - 1]);

  if (sinalAtivo) {
    if (corAtual === sinalAtivo || corAtual === 'verde') {
      resultado.textContent = `Vitória no ${sinalAtivo.toUpperCase()}!`;
      resetarEstrategia();
    } else {
      gale++;
      if (!invertido && gale < 3) {
        resultado.textContent = `Gale ${gale} ainda no ${sinalAtivo.toUpperCase()}`;
      } else if (!invertido) {
        // Inverte sinal
        invertido = true;
        gale = 1;
        sinalAtivo = corAtual;
        resultado.textContent = `Invertendo para ${sinalAtivo.toUpperCase()} - Tentativa 1`;
      } else {
        gale++;
        if (gale <= 3) {
          resultado.textContent = `Tentativa invertida ${gale} no ${sinalAtivo.toUpperCase()}`;
        } else {
          resultado.textContent = `Falhou após 2 gales + inversão. Resetando...`;
          resetarEstrategia();
        }
      }
    }
    return;
  }

  // Detecção da sequência
  let baseCor = obterCor(numeros[n - 2]);
  let contagem = 1;
  for (let i = n - 3; i >= 0; i--) {
    if (obterCor(numeros[i]) === baseCor) {
      contagem++;
    } else break;
  }

  // Aqui a modificação, agora verificamos se a sequência atingiu 5
  if (contagem >= 5 && corAtual !== baseCor) {
    sinalAtivo = baseCor;
    gale = 0;
    invertido = false;
    tentativasInvertidas = 0;
    resultado.textContent = `SINAL: Jogar ${sinalAtivo.toUpperCase()} (Sequência anterior de ${contagem})`;
  }
}
