let numeros = [];
let sinalAtivo = null;
let gale = 0;
let invertido = false;
let tentativasInvertidas = 0;
let padroes = [];  // Vai armazenar os padrões de cores detectados

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

  // Verificação do padrão de cores
  const cores = numeros.map(obterCor);
  const ultimoPadrao = cores.slice(-4); // Últimos 4 resultados de cores

  if (ultimoPadrao.length < 2) return; // Precisamos de pelo menos 2 elementos para comparar um padrão

  // Verificar se o padrão já existe no array de padrões
  const padrao = ultimoPadrao.join(',');
  padroes.push(padrao);

  // Contabilizar quantas vezes o padrão aparece nos últimos 5 resultados
  const contagemPadrao = padroes.filter(p => p === padrao).length;

  // Se o padrão se repetir 5 vezes ou mais
  if (contagemPadrao >= 5) {
    sinalAtivo = obterCor(numeros[n - 1]);
    gale = 0;
    invertido = false;
    tentativasInvertidas = 0;
    resultado.textContent = `SINAL: Jogar ${sinalAtivo.toUpperCase()} (Padrão ${padrao} se repetiu ${contagemPadrao}x)`;
  }

  // Mostrar os padrões registrados
  document.getElementById('padroes').textContent = `Padrões registrados: ${padroes.join(' | ')}`;
}

function resetarEstrategia() {
  sinalAtivo = null;
  gale = 0;
  invertido = false;
  tentativasInvertidas = 0;
  padroes = [];  // Resetando os padrões quando a estratégia é resetada
}

function limparDados() {
  numeros = [];
  resetarEstrategia();
  document.getElementById('resultado').textContent = '';
  document.getElementById('listaNumeros').innerHTML = '';
  document.getElementById('repetidos').textContent = '';
  document.getElementById('sequencias').textContent = '';
  document.getElementById('padroes').textContent = '';  // Limpar a exibição dos padrões
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
    }
