
function calcularAgua() {
  const consumo = Number(document.getElementById("consumo").value);
  const reducao = Number(document.getElementById("reducao").value);
  const resultado = document.getElementById("resultadoAgua");

  if (consumo <= 0 || reducao <= 0 || reducao > 100) {
    resultado.textContent = "Informe valores válidos.";
    return;
  }

  const economia = consumo * reducao / 100;
  const novoConsumo = consumo - economia;

  resultado.innerHTML = `
    <h3>Resultado da economia</h3>
    Economia mensal: <strong>${economia.toLocaleString("pt-BR")} litros</strong><br>
    Novo consumo: ${novoConsumo.toLocaleString("pt-BR")} litros<br>
    Economia anual: ${(economia * 12).toLocaleString("pt-BR")} litros
  `;
}

function simularEnergia() {
  const consumo = Number(document.getElementById("energia").value);
  const conta = Number(document.getElementById("conta").value);
  const percentual = Number(document.getElementById("percentualEnergia").value);
  const resultado = document.getElementById("resultadoEnergia");

  if (consumo <= 0 || conta <= 0 || percentual <= 0 || percentual > 100) {
    resultado.textContent = "Informe valores válidos.";
    return;
  }

  const economia = conta * percentual / 100;

  resultado.innerHTML = `
    <h3>Simulação de energia solar</h3>
    Consumo mensal: ${consumo} kWh<br>
    Economia mensal estimada: <strong>R$ ${economia.toFixed(2)}</strong><br>
    Economia anual estimada: R$ ${(economia * 12).toFixed(2)}
  `;
}

async function consultarClima() {
  const cidade = document.getElementById("cidade").value.trim();
  const resultado = document.getElementById("resultadoClima");

  if (!cidade) {
    resultado.textContent = "Digite uma cidade.";
    return;
  }

  resultado.textContent = "Consultando previsão meteorológica...";

  try {
    const geo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`
    );

    const geoData = await geo.json();

    if (!geoData.results?.length) {
      resultado.textContent = "Cidade não encontrada.";
      return;
    }

    const local = geoData.results[0];

    const clima = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${local.latitude}&longitude=${local.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&timezone=auto&forecast_days=5`
    );

    const dados = await clima.json();

    resultado.innerHTML = `
      <h3>Previsão: ${local.name}</h3>
      ${dados.daily.time.map((dia, i) => `
        <p>
          <strong>${new Date(dia + "T12:00:00").toLocaleDateString("pt-BR")}</strong><br>
          Temperatura: ${dados.daily.temperature_2m_min[i]}°C a
          ${dados.daily.temperature_2m_max[i]}°C<br>
          Probabilidade de chuva:
          ${dados.daily.precipitation_probability_max[i]}%<br>
          Precipitação:
          ${dados.daily.precipitation_sum[i]} mm
        </p>
      `).join("<hr>")}
      <small>Fonte: Open-Meteo.</small>
    `;
  } catch (erro) {
    resultado.textContent = "Não foi possível consultar o clima. Tente novamente.";
  }
}

function cadastrarProjeto() {
  const nome = document.getElementById("nomeProjeto").value.trim();
  const descricao = document.getElementById("descricaoProjeto").value.trim();
  const lista = document.getElementById("listaProjetos");

  if (!nome || !descricao) {
    alert("Preencha o nome e a descrição do projeto.");
    return;
  }

  const projeto = document.createElement("div");
  projeto.className = "projeto";

  const titulo = document.createElement("h3");
  titulo.textContent = nome;

  const texto = document.createElement("p");
  texto.textContent = descricao;

  projeto.append(titulo, texto);
  lista.appendChild(projeto);

  document.getElementById("nomeProjeto").value = "";
  document.getElementById("descricaoProjeto").value = "";
}