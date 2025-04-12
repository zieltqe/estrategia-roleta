let numeros = [];
let sinalAtivo = null;
let gale = 0;
let invertido = false;
let tentativasInvertidas = 0;
let sequenciasDetectadas = [];  // Para armazenar os padrões de cores

function obterCor(numero) {
  if (numero === 0) return 'verde';
  const vermelhos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
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
  detectarSequencias();
  aplicarEstrategia();
}

function aplicarEstrategia() {
  const resultado = document.getElementById('resultado');
  const n = numeros.length;
  if (n < 2) return;

  const corAtual = obterCor(numeros[n - 1]);
  const corAnterior = obterCor(numeros[n - 2]);

  // Criar uma sequência de 2 cores
  const padrao = `${corAnterior}, ${corAtual}`;

  // Registrar o padrão
  sequenciasDetectadas.push(padrao);
  if (sequenciasDetectadas.length > 100) sequenciasDetectadas.shift();  // Limitar a quantidade de padrões registrados

  // Contabilizar quantas vezes o padrão aparece
  const contagemPadrao = sequenciasDetectadas.filter(p => p === padrao).length;

  if (contagemPadrao >= 5) {
    sinalAtivo = corAtual;
    gale = 0;
    invertido = false;
    tentativasInvertidas = 0;
    resultado.textContent = `SINAL: Jogar ${sinalAtivo.toUpperCase()} (Padrão ${padrao} se repetiu ${contagemPadrao}x)`;
  }
}

function resetarEstrategia() {
  sinalAtivo = null;
  gale = 0;
  invertido = false;
  tentativasInvertidas = 0;
  sequenciasDetectadas = [];  // Resetando os padrões
}

function limparDados() {
  numeros = [];
  resetarEstrategia();
  document.getElementById('resultado').textContent = '';
  document.getElementById('listaNumeros').innerHTML = '';
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

function detectarSequencias() {
  const cores = numeros.map(obterCor);
  let sequencias = [];
  
  // Identificando padrões de sequência
  for (let i = 1; i < cores.length; i++) {
    for (let j = i + 1; j < cores.length; j++) {
      let padrao = cores.slice(i, j + 1).join(', ');
      sequencias.push(padrao);
    }
  }

  // Contabilizando e mostrando os padrões
  const contagemSequencias = {};
  sequencias.forEach(padrao => {
    contagemSequencias[padrao] = (contagemSequencias[padrao] || 0) + 1;
  });

  // Encontrar e exibir os padrões mais repetidos
  const sequenciasMaisComuns = Object.entries(contagemSequencias)
    .filter(([padrao, count]) => count >= 5)
    .map(([padrao, count]) => `${padrao} (${count}x)`)
    .join(', ');

  document.getElementById('sequencias').textContent = `Sequências detectadas: ${sequenciasMaisComuns}`;
    }
