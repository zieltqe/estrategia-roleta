let numeros = [];
let sinal = null;
let gale = 0;
let tentativasInvertidas = 0;
let emInvertido = false;
let corSequencia = null;
let contagemSequencia = 0;

function obterCor(numero) {
  if (numero === 0) return 'verde';
  const vermelhos = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  return vermelhos.includes(numero) ? 'vermelho' : 'preto';
}

function registrarNumero() {
  const input = document.getElementById('numeroInput');
  const numero = parseInt(input.value);
  input.value = '';

  if (isNaN(numero) || numero < 0 || numero > 36) return;

  numeros.push(numero);
  if (numeros.length > 100) numeros.shift();

  atualizarLista();
  mostrarRepetidos();
  mostrarSequencias();
  analisarSequencia();
}

function analisarSequencia() {
  const resultado = document.getElementById('resultado');
  const n = numeros.length;
  if (n < 4) return;

  const ultimaCor = obterCor(numeros[n - 1]);

  if (sinal) {
    if (ultimaCor === sinal.cor || ultimaCor === 'verde') {
      resultado.textContent = `GANHOU no ${sinal.cor.toUpperCase()}!`;
      resetarSinal();
    } else {
      if (!emInvertido) {
        gale++;
        if (gale < 3) {
          resultado.textContent = `Tentativa ${gale + 1} no ${sinal.cor.toUpperCase()}`;
        } else {
          emInvertido = true;
          tentativasInvertidas = 1;
          sinal.cor = obterCor(numeros[n - 1]);
          resultado.textContent = `Invertendo sinal para ${sinal.cor.toUpperCase()} - Tentativa 1`;
        }
      } else {
        tentativasInvertidas++;
        if (tentativasInvertidas < 4) {
          resultado.textContent = `Tentativa ${tentativasInvertidas} no invertido: ${sinal.cor.toUpperCase()}`;
        } else {
          resultado.textContent = `PERDEU após todas as tentativas.`;
          resetarSinal();
        }
      }
    }
    return;
  }

  corSequencia = obterCor(numeros[n - 2]);
  contagemSequencia = 1;

  for (let i = n - 3; i >= 0; i--) {
    const cor = obterCor(numeros[i]);
    if (cor === corSequencia) {
      contagemSequencia++;
    } else {
      break;
    }
  }

  const corAtual = obterCor(numeros[n - 1]);
  if (contagemSequencia >= 3 && contagemSequencia <= 30 && corAtual !== corSequencia) {
    sinal = { cor: corSequencia };
    gale = 0;
    tentativasInvertidas = 0;
    emInvertido = false;
    resultado.textContent = `SINAL DETECTADO: Jogar ${sinal.cor.toUpperCase()} (Gale 1)`;
  }
}

function resetarSinal() {
  sinal = null;
  gale = 0;
  tentativasInvertidas = 0;
  emInvertido = false;
  corSequencia = null;
  contagemSequencia = 0;
}

function limparDados() {
  numeros = [];
  resetarSinal();
  document.getElementById('resultado').textContent = '';
  document.getElementById('listaNumeros').innerHTML = '';
  document.getElementById('repetidos').textContent = '';
  document.getElementById('sequencias').textContent = '';
}

function atualizarLista() {
  const ul = document.getElementById('listaNumeros');
  ul.innerHTML = '';
  numeros.slice().reverse().forEach(num => {
    const li = document.createElement('li');
    const cor = obterCor(num);
    li.textContent = num;
    li.className = cor;
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

function mostrarSequencias() {
  if (numeros.length < 3) {
    document.getElementById('sequencias').textContent = 'Sequências: (mínimo 3 números)';
    return;
  }

  const cores = numeros.map(obterCor);
  const sequencias = {};
  const tamanhoSequencia = 3; // você pode ajustar para 2, 4, etc.

  for (let i = 0; i <= cores.length - tamanhoSequencia; i++) {
    const seq = cores.slice(i, i + tamanhoSequencia).join(' → ');
    sequencias[seq] = (sequencias[seq] || 0) + 1;
  }

  const resultadoSequencias = Object.entries(sequencias)
    .sort((a, b) => b[1] - a[1])
    .map(([seq, vezes]) => `${seq} - ${vezes} vez${vezes > 1 ? 'es' : ''}`)
    .slice(0, 5) // mostra só as 5 mais frequentes
    .join('<br>');

  document.getElementById('sequencias').innerHTML = `Sequências mais comuns:<br>${resultadoSequencias}`;
      }
