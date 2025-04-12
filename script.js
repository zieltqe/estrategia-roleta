let numeros = [];
let corAnterior = '';
let gale = 0;
let tentativaInvertida = 0;
let corAtualSinal = '';
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
  if (numeros.length < 3) return;

  const cor1 = obterCor(numeros[numeros.length - 1]);
  const cor2 = obterCor(numeros[numeros.length - 2]);
  const resultado = document.getElementById('resultado');

  if (!modoInvertido && cor1 === cor2) {
    corAtualSinal = cor1;
    gale = 0;
    resultado.textContent = `Sinal confirmado: jogar ${corAtualSinal.toUpperCase()} (Gale 1)`;
    return;
  }

  if (!modoInvertido && corAtualSinal) {
    if (cor1 === corAtualSinal) {
      resultado.textContent = `GANHOU no ${corAtualSinal.toUpperCase()}!`;
      corAtualSinal = '';
    } else {
      gale++;
      if (gale < 3) {
        resultado.textContent = `Tentar novamente: ${corAtualSinal.toUpperCase()} (Gale ${gale + 1})`;
      } else {
        modoInvertido = true;
        tentativaInvertida = 1;
        resultado.textContent = `Invertendo sinal: jogar ${cor1.toUpperCase()} (Gale 1)`;
      }
    }
    return;
  }

  if (modoInvertido) {
    if (cor1 === cor2) {
      resultado.textContent = `GANHOU no sinal invertido (${cor1.toUpperCase()})!`;
      modoInvertido = false;
      corAtualSinal = '';
    } else {
      tentativaInvertida++;
      if (tentativaInvertida < 3) {
        resultado.textContent = `Tentativa ${tentativaInvertida + 1} no sinal invertido: ${cor1.toUpperCase()}`;
      } else {
        resultado.textContent = `PERDEU após todas as tentativas!`;
        modoInvertido = false;
        corAtualSinal = '';
      }
    }
  }
}

function limparDados() {
  numeros = [];
  corAnterior = '';
  gale = 0;
  tentativaInvertida = 0;
  corAtualSinal = '';
  modoInvertido = false;
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
