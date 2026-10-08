const valorInput = document.getElementById("valor");
const moedaOrigem = document.getElementById("moeda-origem");
const moedaDestino = document.getElementById("moeda-destino");
const btnConverter = document.getElementById("btn-converter");
const btnTrocar = document.getElementById("btn-trocar");
const resultado = document.getElementById("resultado");

async function converter() {
  const valor = Number(valorInput.value);
  const de = moedaOrigem.value;
  const para = moedaDestino.value;

  if (!valor || valor <= 0) {
    resultado.innerHTML = "<p>Digite um valor válido</p>";
    return;
  }

  if (de === para) {
    resultado.innerHTML = `<p>${valor.toFixed(2)} ${de}</p>`;
    return;
  }

  resultado.innerHTML = "<p>Convertendo...</p>";

  try {
    // API gratuita (ExchangeRate-API)
    const resposta = await fetch(`https://api.exchangerate-api.com/v4/latest/${de}`);
    const dados = await resposta.json();

    const taxa = dados.rates[para];
    const convertido = (valor * taxa).toFixed(2);

    resultado.innerHTML = `
      <p>${valor} ${de} =</p>
      <p style="font-size: 1.5rem; margin-top: 6px;">${convertido} ${para}</p>
    `;
  } catch (erro) {
    resultado.innerHTML = "<p>Erro ao buscar cotação. Tente novamente.</p>";
  }
}

function trocarMoedas() {
  const temp = moedaOrigem.value;
  moedaOrigem.value = moedaDestino.value;
  moedaDestino.value = temp;
  converter();
}

btnConverter.addEventListener("click", converter);
btnTrocar.addEventListener("click", trocarMoedas);

// Converte ao carregar a página
converter();
