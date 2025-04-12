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

let numeros = [];
let sinalAtivo = null;
let gale = 0;
let invertido = false;
let tentativasInvertidas = 0;

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
  
  aplicarEstrategia(); // <- Nova função chamada aqui
}

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
  for (let i = n - 3; i >= 0 && contagem < 30; i--) {
    if (obterCor(numeros[i]) === baseCor) {
      contagem++;
    } else break;
  }

  if (contagem >= 3 && corAtual !== baseCor) {
    sinalAtivo = baseCor;
    gale = 0;
    invertido = false;
    tentativasInvertidas = 0;
    resultado.textContent = `SINAL: Jogar ${sinalAtivo.toUpperCase()} (Sequência anterior de ${contagem})`;
  }
}

function resetarEstrategia() {
  sinalAtivo = null;
  gale = 0;
  invertido = false;
  tentativasInvertidas = 0;
}

function limparDados() {
  numeros = [];
  resetarEstrategia();
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
  const cores = numeros.map(obterCor);
  let sequencias = [];
  let atual = cores[0];
  let contagem = 1;

  for (let i = 1; i < cores.length; i++) {
    if (cores[i] === atual) {
      contagem++;
    } else {
      if (contagem >= 2) sequencias.push(`${atual} (${contagem}x)`);
      atual = cores[i];
      contagem = 1;
    }
  }
  if (contagem >= 2) sequencias.push(`${atual} (${contagem}x)`);

  document.getElementById('sequencias').textContent = `Sequências: ${sequencias.join(', ')}`;

  // ADIÇÃO: detectar padrões alternados de cores
  const padroes = {};
  for (let i = 0; i <= cores.length - 4; i++) {
    const padrao = cores.slice(i, i + 4).join('-');
    padroes[padrao] = (padroes[padrao] || 0) + 1;
  }

  const padroesRepetidos = Object.entries(padroes)
    .filter(([_, qtd]) => qtd >= 2)
    .sort((a, b) => b[1] - a[1]);

  if (padroesRepetidos.length) {
    const lista = padroesRepetidos.map(([p, qtd]) => `${p} (${qtd}x)`).join(', ');
    document.getElementById('sequencias').textContent += ` | Padrões: ${lista}`;
    
    const padraoAlvo = padroesRepetidos.find(([_, qtd]) => qtd >= 5);
    if (padraoAlvo) {
      const corFinal = padraoAlvo[0].split('-').pop();
      document.getElementById('resultado').textContent = `PADRÃO FORTE DETECTADO: Apostar em ${corFinal.toUpperCase()} (Padrão ${padraoAlvo[0]} ocorreu ${padraoAlvo[1]}x)`;
    }
  }
          }
