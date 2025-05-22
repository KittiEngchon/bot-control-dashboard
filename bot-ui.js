// bot-ui.js

import { ethers } from "https://cdn.ethers.io/lib/ethers-5.6.esm.min.js";

let botWallets = new Array(11).fill(null);
let botStates = JSON.parse(localStorage.getItem("botStates") || "[]");
if (botStates.length < 11) botStates = new Array(11).fill(false);

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

async function getETHPrice() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
    const data = await res.json();
    return data.ethereum.usd;
  } catch (err) {
    console.error("Error fetching ETH price:", err);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const botData = [
    { name: "Market Maker", address: "", role: "Liquidity", image: "1.png" },
    { name: "Arbitrage", address: "", role: "Price Gap", image: "2.png" },
    { name: "Price Impact", address: "", role: "Monitor", image: "3.png" },
    { name: "Rebalancer", address: "", role: "Adjust Ratio", image: "4.png" },
    { name: "Auto Swapper", address: "", role: "Swap Trigger", image: "5.png" },
    { name: "Multi Arbitrage", address: "", role: "Multi-hop", image: "6.png" },
    { name: "Portfolio Adjust", address: "", role: "Weight Balance", image: "7.png" },
    { name: "Volume Simulator", address: "", role: "Fake Vol", image: "8.png" },
    { name: "Trend Watcher", address: "", role: "Follow Trend", image: "9.png" },
    { name: "Profit Tracker", address: "", role: "PnL Report", image: "10.png" },
    { name: "Coordinator", address: "", role: "Manager", image: "11.png" },
  ];

  const container = document.getElementById("bot-container");

  botData.forEach((bot, index) => {
    const card = document.createElement("div");
    card.className = "bot-card";
    card.innerHTML = `
      <img src="images/${bot.image}" class="bot-profile">
      <h3 contenteditable="true">${bot.name}</h3>
      <p><strong>Role:</strong> ${bot.role}</p>
      <p><strong>Wallet:</strong> <span id="wallet-${index}">Not connected</span></p>
      <p><strong>Balance:</strong> <span id="balance-${index}">--</span></p>
      <p><strong>ETH PnL:</strong> <span id="pnl-${index}">--</span></p>
      <p><strong>Token Holdings:</strong> <span id="tokens-${index}">--</span></p>
      <canvas id="chart-${index}" width="200" height="80"></canvas>
      <div class="btn-group">
        <button onclick="connectWallet(${index})">Connect Wallet</button>
        <button id="start-${index}" onclick="toggleBot(${index})">${botStates[index] ? "Stop" : "Start"}</button>
      </div>
    `;
    container.appendChild(card);

    if (botStates[index]) {
      updateBot(index);
    }
  });

  setInterval(() => {
    botStates.forEach((state, index) => {
      if (state && botWallets[index]) updateBot(index);
    });
  }, 15000);
});

window.connectWallet = async function(index) {
  try {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    botWallets[index] = signer;
    document.getElementById(`wallet-${index}`).innerText = address;

    updateBot(index);
  } catch (err) {
    console.error("Wallet connection error:", err);
  }
};

async function updateBot(index) {
  try {
    const signer = botWallets[index];
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    const etherString = ethers.utils.formatEther(balance);
    document.getElementById(`balance-${index}`).innerText = parseFloat(etherString).toFixed(4) + " ETH";
    await updatePnL(index, parseFloat(etherString));
    await updateTokens(index, address);
    drawPriceChart(index);
  } catch (err) {
    console.error(`Bot ${index} update error:`, err);
  }
}

async function updatePnL(index, ethBalance) {
  const price = await getETHPrice();
  if (!price) {
    document.getElementById(`pnl-${index}`).innerText = "Error";
    return;
  }
  const usdValue = ethBalance * price;
  const pnlSpan = document.getElementById(`pnl-${index}`);
  pnlSpan.innerText = `$${usdValue.toFixed(2)}`;
  pnlSpan.style.color = usdValue >= 0 ? "green" : "red";
}

async function updateTokens(index, address) {
  const tokenList = [
    {
      symbol: "USDC",
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      decimals: 6,
    },
    {
      symbol: "MATIC",
      address: "0x0000000000000000000000000000000000001010",
      decimals: 18,
      isNative: true,
    },
    {
      symbol: "DAI",
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      decimals: 18,
    }
  ];

  try {
    const results = [];

    for (const token of tokenList) {
      if (token.isNative) {
        const balance = await provider.getBalance(address);
        results.push(`${token.symbol}: ${parseFloat(ethers.utils.formatUnits(balance, token.decimals)).toFixed(2)}`);
      } else {
        const abi = ["function balanceOf(address) view returns (uint256)"];
        const tokenContract = new ethers.Contract(token.address, abi, provider);
        const balance = await tokenContract.balanceOf(address);
        results.push(`${token.symbol}: ${parseFloat(ethers.utils.formatUnits(balance, token.decimals)).toFixed(2)}`);
      }
    }

    document.getElementById(`tokens-${index}`).innerText = results.join(", ");
  } catch (err) {
    console.error("Token fetch error:", err);
    document.getElementById(`tokens-${index}`).innerText = "Error";
  }
}

function drawPriceChart(index) {
  const ctx = document.getElementById(`chart-${index}`).getContext("2d");
  const data = Array.from({ length: 10 }, () => 1000 + Math.random() * 100);
  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        label: "Price",
        data,
        borderColor: "#4caf50",
        fill: false
      }]
    },
    options: { responsive: false, scales: { x: { display: false }, y: { display: false } } }
  });
}

window.toggleBot = function(index) {
  botStates[index] = !botStates[index];
  localStorage.setItem("botStates", JSON.stringify(botStates));
  document.getElementById(`start-${index}`).innerText = botStates[index] ? "Stop" : "Start";

  if (botStates[index] && botWallets[index]) {
    updateBot(index);
  }
};


