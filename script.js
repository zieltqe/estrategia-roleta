let numeros = [];
let sinal = null;
let gale = 0;
let tentativasInvertidas = 0;
let emInvertido = false;
let corSequencia = null;
let contagemSequencia = 0;
let sequenciasCores = [];

function obterCor(numero) {
  if (numero === 0) return 'verde';
  const vermelhos = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  return vermelhos.includes(numero) ? 'vermelho' : 'preto';
}

// Função para registrar o número
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

// Função para analisar a sequência de cores mais repetidas
function analisarSequencia() {
  const resultado = document.getElementById('resultado');
  const n = numeros.length;
  if (n < 4) return;

  // Obtém as cores associadas aos números
  const cores = numeros.map(obterCor);

  // Encontrar a sequência de cores mais repetidas
  sequenciasCores = encontrarSequenciasMaisFrequentes(cores);

  // Se houver uma sequência mais repetida, o sinal será dado com base nela
  if (sequenciasCores.length > 0) {
    const corMaisFrequente = sequenciasCores[0].cor; // A cor mais frequente
    if (sinal && sinal.cor === corMaisFrequente) {
      // Se o sinal já estiver definido para a cor mais frequente, verifica se ganhou
      const ultimaCor = obterCor(numeros[n - 1]);
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
            resultado.textContent = `Invertendo sinal para ${obterCor(numeros[n - 1]).toUpperCase()} - Tentativa 1`;
          }
        } else {
          tentativasInvertidas++;
          if (tentativasInvertidas < 3) {
            resultado.textContent = `Tentativa ${tentativasInvertidas} no invertido: ${sinal.cor.toUpperCase()}`;
          } else {
            resultado.textContent = `PERDEU após todas as tentativas.`;
            resetarSinal();
          }
        }
      }
    } else {
      // Define o sinal com a cor mais frequente
      sinal = { cor: corMaisFrequente };
      gale = 0;
      tentativasInvertidas = 0;
      emInvertido = false;
      resultado.textContent = `SINAL DETECTADO: Jogar ${sinal.cor.toUpperCase()} (Gale 1)`;
    }
    return;
  }
}

// Função para encontrar as sequências de cores mais frequentes
function encontrarSequenciasMaisFrequentes(cores) {
  const sequencias = [];
  for (let i = 0; i < cores.length - 2; i++) {
    const sequencia = [cores[i], cores[i + 1], cores[i + 2]]; // Considera sequências de 3 cores
    const indice = sequencias.findIndex(seq => seq.cor.join() === sequencia.join());
    if (indice === -1) {
      sequencias.push({ cor: sequencia, qtd: 1 });
    } else {
      sequencias[indice].qtd++;
    }
  }

  return sequencias.sort((a, b) => b.qtd - a.qtd); // Ordena pela quantidade de repetições
}

// Função para resetar o sinal
function resetarSinal() {
  sinal = null;
  gale = 0;
  tentativasInvertidas = 0;
  emInvertido = false;
  corSequencia = null;
  contagemSequencia = 0;
}

// Função para limpar os dados
function limparDados() {
  numeros = [];
  sequenciasCores = [];
  resetarSinal();
  document.getElementById('resultado').textContent = '';
  document.getElementById('listaNumeros').innerHTML = '';
  document.getElementById('repetidos').textContent = '';
  document.getElementById('sequencias').textContent = '';
}

// Função para atualizar a lista de números
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

// Função para mostrar os números mais repetidos
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

// Função para mostrar as sequências
function mostrarSequencias() {
  const cores = numeros.map(obterCor);
  const sequencias = encontrarSequenciasMaisFrequentes(cores);
  
  document.getElementById('sequencias').textContent = `Sequências mais frequentes: ${sequencias.map(s => `${s.cor.join(', ')} (${s.qtd}x)`).join(', ')}`;
}
