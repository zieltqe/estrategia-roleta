let numeros = [];
let sinalAtivo = null;
let gale = 0;
let invertido = false;
let tentativasInvertidas = 0;
let sequencias = [];  // Para armazenar os padrões de cores

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
  mostrarSequencias();
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
  sequencias.push(padrao);
  if (sequencias.length > 100) sequencias.shift();  // Limitar a quantidade de padrões registrados

  // Contabilizar quantas vezes o padrão aparece
  const contagemPadrao = sequencias.filter(p => p === padrao).length;

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
  sequencias = [];  // Resetando os padrões
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

function mostrarSequencias() {
  const cores = numeros.map(obterCor);
  let sequenciasMostradas = [];
  let atual = cores[0];
  let contagem = 1;

  // Detectando padrões de sequências
  for (let i = 1; i < cores.length; i++) {
    if (cores[i] === atual) {
      contagem++;
    } else {
      if (contagem >= 2) sequenciasMostradas.push(`${atual} (${contagem}x)`);
      atual = cores[i];
      contagem = 1;
    }
  }
  if (contagem >= 2) sequenciasMostradas.push(`${atual} (${contagem}x)`);

  document.getElementById('sequencias').textContent = `Sequências: ${sequenciasMostradas.join(', ')}`;
}
