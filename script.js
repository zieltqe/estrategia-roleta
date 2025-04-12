let numeros = [];
let corSequencia = '';
let contagemSequencia = 0;
let sinalAtual = '';
let gale = 0;
let tentativaInvertida = 0;
let modoInvertido = false;

function registrarNumero() {
  const input = document.getElementById('numeroInput');
  const numero = parseInt(input.value);
  input.value = '';

  if (isNaN(numero) || numero < 0 || numero > 36) return;

  numeros.push(numero);
  if (numeros.length > 50) numeros.shift();

  atualizarLista();
  analisarSequencia();
  mostrarRepetidos();
}

function obterCor(numero) {
  if (numero === 0) return 'verde';
  const vermelhos = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  return vermelhos.includes(numero) ? 'vermelho' : 'preto';
}

function analisarSequencia() {
  const resultado = document.getElementById('resultado');
  if (numeros.length < 2) return;

  let ultimaCor = '';
  let novaCor = '';
  
  for (let i = numeros.length - 1; i >= 0; i--) {
    let cor = obterCor(numeros[i]);
    if (cor === 'verde') continue;

    if (!corSequencia) {
      corSequencia = cor;
      contagemSequencia = 1;
    } else if (cor === corSequencia) {
      contagemSequencia++;
    } else {
      // Se quebra de sequência e já tem no mínimo 3 da mesma cor
      if (contagemSequencia >= 3 && contagemSequencia <= 30) {
        if (!sinalAtual) {
          sinalAtual = corSequencia;
          gale = 0;
          modoInvertido = false;
          resultado.textContent = `Sinal: Jogar ${sinalAtual.toUpperCase()} (Gale 1)`;
        } else {
          aplicarSinal(cor);
        }
      }
      // Reiniciar sequência com nova cor
      corSequencia = cor;
      contagemSequencia = 1;
    }
  }
}

function aplicarSinal(ultimaCor) {
  const resultado = document.getElementById('resultado');

  if (obterCor(numeros[numeros.length - 1]) === 'verde') {
    resultado.textContent = `Zero saiu. Continuar jogando ${sinalAtual.toUpperCase()} (Gale ${gale + 1})`;
    return;
  }

  if (!modoInvertido) {
    if (ultimaCor === sinalAtual) {
      resultado.textContent = `GANHOU no ${sinalAtual.toUpperCase()}!`;
      resetarSinal();
    } else {
      gale++;
      if (gale < 3) {
        resultado.textContent = `Tentar novamente: ${sinalAtual.toUpperCase()} (Gale ${gale + 1})`;
      } else {
        modoInvertido = true;
        tentativaInvertida = 1;
        resultado.textContent = `Invertendo sinal: Jogar ${ultimaCor.toUpperCase()} (Gale 1)`;
      }
    }
  } else {
    if (ultimaCor === obterCor(numeros[numeros.length - 1])) {
      resultado.textContent = `GANHOU no sinal invertido (${ultimaCor.toUpperCase()})!`;
      resetarSinal();
    } else {
      tentativaInvertida++;
      if (tentativaInvertida < 3) {
        resultado.textContent = `Tentativa ${tentativaInvertida + 1} no invertido: ${ultimaCor.toUpperCase()}`;
      } else {
        resultado.textContent = `PERDEU após todas as tentativas.`;
        resetarSinal();
      }
    }
  }
}

function resetarSinal() {
  sinalAtual = '';
  gale = 0;
  tentativaInvertida = 0;
  modoInvertido = false;
  corSequencia = '';
  contagemSequencia = 0;
}

function limparDados() {
  numeros = [];
  resetarSinal();
  document.getElementById('resultado').textContent = '';
  document.getElementById('listaNumeros').innerHTML = '';
  document.getElementById('repetidos').textContent = '';
}

function atualizarLista() {
  const ul = document.getElementById('listaNumeros');
  ul.innerHTML = '';
  numeros.slice().reverse().forEach(num => {
    const li = document.createElement('li');
    li.textContent = num;
    ul.appendChild(li);
  });
}

function mostrarRepetidos() {
  const contagem = {};
  numeros.forEach(num => contagem[num] = (contagem[num] || 0) + 1);

  const repetidos = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([num, qtd]) => `${num} (${qtd}x)`)
    .join(', ');

  document.getElementById('repetidos').textContent = `Mais saíram: ${repetidos}`;
}
