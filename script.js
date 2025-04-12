let numeros = [];
let tentativas = 0;
let sinal = null;
let corAnterior = null;

function obterCor(numero) {
  if (numero === 0) return "verde";
  return numero % 2 === 0 ? "preto" : "vermelho";
}

function registrarNumero() {
  const input = document.getElementById("numeroInput");
  const numero = parseInt(input.value);
  if (isNaN(numero) || numero < 0 || numero > 36) {
    alert("Digite um número entre 0 e 36.");
    return;
  }

  numeros.push(numero);
  atualizarLista();
  analisarSequencia();
  mostrarRepetidos();
  mostrarSequenciasRepetidas();
  input.value = "";
}

function atualizarLista() {
  const lista = document.getElementById("listaNumeros");
  lista.innerHTML = "";
  numeros.forEach((numero) => {
    const li = document.createElement("li");
    li.textContent = numero;
    li.style.backgroundColor =
      obterCor(numero) === "vermelho"
        ? "#e74c3c"
        : obterCor(numero) === "preto"
        ? "#2c3e50"
        : "#27ae60";
    li.style.color = "white";
    lista.appendChild(li);
  });
}

function mostrarRepetidos() {
  const contagem = {};
  numeros.forEach((n) => {
    contagem[n] = (contagem[n] || 0) + 1;
  });

  const repetidos = Object.entries(contagem)
    .filter(([_, qtd]) => qtd > 1)
    .map(([num, qtd]) => `${num} apareceu ${qtd} vezes.`)
    .join("<br>");

  document.getElementById("repetidos").innerHTML =
    repetidos || "Nenhum número repetido ainda.";
}

function mostrarSequenciasRepetidas() {
  const cores = numeros.map(obterCor);
  const sequencias = {};

  let atual = [cores[0]];
  for (let i = 1; i < cores.length; i++) {
    if (cores[i] === atual[atual.length - 1]) {
      atual.push(cores[i]);
    } else {
      if (atual.length >= 3) {
        const key = atual.join(", ");
        sequencias[key] = (sequencias[key] || 0) + 1;
      }
      atual = [cores[i]];
    }
  }

  if (atual.length >= 3) {
    const key = atual.join(", ");
    sequencias[key] = (sequencias[key] || 0) + 1;
  }

  const top4 = Object.entries(sequencias)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([seq, qtd]) => `${seq} (${qtd}x)`)
    .join("<br>");

  document.getElementById("sequenciasRepetidas").innerHTML =
    `<h3>Sequências mais repetidas</h3>${top4 || "Nenhuma sequência encontrada"}`;
}

function analisarSequencia() {
  if (numeros.length < 4) return;

  const cores = numeros.map(obterCor);
  const ultimas = cores.slice(-30);
  let corSequencia = ultimas[0];
  let contagem = 1;

  for (let i = 1; i < ultimas.length; i++) {
    if (ultimas[i] === corSequencia) {
      contagem++;
    } else {
      if (contagem >= 3) break;
      corSequencia = ultimas[i];
      contagem = 1;
    }
  }

  const ultimaCor = cores[cores.length - 1];
  const penultimaCor = cores[cores.length - 2];

  if (ultimaCor !== penultimaCor && contagem >= 3) {
    sinal = penultimaCor;
    tentativas = 0;
  }

  if (sinal) {
    if (ultimaCor === sinal) {
      document.getElementById("resultado").innerText = `Sinal confirmado: ${sinal.toUpperCase()}`;
      sinal = null;
      tentativas = 0;
    } else {
      tentativas++;
      if (tentativas >= 2) {
        sinal = ultimaCor;
        tentativas = 0;
        document.getElementById("resultado").innerText = `Sinal invertido: ${sinal.toUpperCase()}`;
      } else {
        document.getElementById("resultado").innerText = `Tentativa ${tentativas}: Apostar em ${sinal.toUpperCase()}`;
      }
    }
  }
}

function limparDados() {
  numeros = [];
  tentativas = 0;
  sinal = null;
  document.getElementById("listaNumeros").innerHTML = "";
  document.getElementById("resultado").innerText = "";
  document.getElementById("repetidos").innerText = "";
  document.getElementById("sequenciasRepetidas").innerText = "";
      }
