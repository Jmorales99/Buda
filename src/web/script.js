const portfolioContainer = document.getElementById("portfolio-list");
const addCryptoBtn = document.getElementById("add-crypto");
const calculateBtn = document.getElementById("calculate");
const resultBox = document.getElementById("result");
const fiatSelect = document.getElementById("fiat");

let markets = [];

async function fetchMarkets() {
  try {
    const res = await fetch("/api/markets");
    const data = await res.json();
    markets = data.markets.map((m) => m.id.toUpperCase());
  } catch (err) {
    console.error("Error al obtener mercados:", err);
  }
}

function createCryptoRow() {
  const div = document.createElement("div");
  div.classList.add("crypto-row");

  const select = document.createElement("select");
  select.classList.add("crypto-select");
  const uniqueCryptos = [...new Set(markets.map((m) => m.split("-")[0]))];
  uniqueCryptos.forEach((symbol) => {
    const option = document.createElement("option");
    option.value = symbol;
    option.textContent = symbol;
    select.appendChild(option);
  });

  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Cantidad";
  input.classList.add("crypto-amount");

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✖";
  removeBtn.classList.add("remove-btn");
  removeBtn.onclick = () => div.remove();

  div.appendChild(select);
  div.appendChild(input);
  div.appendChild(removeBtn);

  portfolioContainer.appendChild(div);
}

async function calculatePortfolio() {
  const fiat = fiatSelect.value;
  const rows = portfolioContainer.querySelectorAll("div");
  const portfolio = {};

  rows.forEach((row) => {
    const [select, input] = row.children;
    const symbol = select.value.trim();
    const amount = parseFloat(input.value);
    if (symbol && !isNaN(amount)) {
      portfolio[symbol] = amount;
    }
  });

  if (Object.keys(portfolio).length === 0) {
    alert("Por favor, agrega al menos una criptomoneda.");
    return;
  }

  resultBox.innerHTML = `<p class="loading">Consultando precios en Buda.com...</p>`;

  try {
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ portfolio, fiat_currency: fiat }),
    });

    const data = await res.json();
    resultBox.innerHTML = "";

    if (data.success) {
      const totalValue = data.total_value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const totalSection = document.createElement("div");
      totalSection.className = "total-card";
      totalSection.innerHTML = `
        <h3>Valor Total del Portafolio</h3>
        <p><strong>${totalValue} ${data.fiat_currency}</strong></p>
      `;
      resultBox.appendChild(totalSection);

      const table = document.createElement("table");
      table.className = "crypto-table";
      table.innerHTML = `
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Valor (${data.fiat_currency})</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(data.breakdown)
            .map(
              ([crypto, value]) => `
              <tr>
                <td>${crypto}</td>
                <td>${value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}</td>
              </tr>`
            )
            .join("")}
        </tbody>
      `;
      resultBox.appendChild(table);
    } else {
      resultBox.innerHTML = `
        <div class="error-card">
          <p> ${data.message || "Ocurrió un error al calcular el valor."}</p>
        </div>
      `;
    }
  } catch (err) {
    resultBox.innerHTML = `
      <div class="error-card">
        <p> Error al calcular el portafolio.</p>
      </div>
    `;
  }
}

addCryptoBtn.addEventListener("click", createCryptoRow);
calculateBtn.addEventListener("click", calculatePortfolio);

fetchMarkets().then(() => createCryptoRow());
