* {
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom right, #d3cce3, #e9e4f0);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

.container {
  max-width: 500px;
  width: 100%;
  background-color: white;
  margin: 20px;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

input[type="number"] {
  padding: 12px;
  width: 100%;
  max-width: 300px;
  margin: 10px auto;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.botoes {
  margin: 10px 0;
}

button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 1rem;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #1c5984;
}

#resultado {
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.1rem;
}

#listaNumeros {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#listaNumeros li {
  margin: 5px;
  padding: 8px 12px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
}

li.vermelho { background-color: #c0392b; }
li.preto { background-color: #2c3e50; }
li.verde { background-color: #27ae60; }

#sequenciasRepetidas {
  margin-top: 15px;
  font-size: 1rem;
  color: #34495e;
}

@media (max-width: 480px) {
  .container {
    padding: 15px;
  }

  input[type="number"],
  button {
    width: 100%;
    max-width: none;
  }

  .botoes {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
    }
