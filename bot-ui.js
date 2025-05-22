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
      <p><strong>PnL:</strong> <span id="pnl-${index}">--</span></p>
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
  document.getElementById(`pnl-${index}`).innerText = `$${usdValue.toFixed(2)}`;
}

window.toggleBot = function(index) {
  botStates[index] = !botStates[index];
  localStorage.setItem("botStates", JSON.stringify(botStates));
  document.getElementById(`start-${index}`).innerText = botStates[index] ? "Stop" : "Start";

  if (botStates[index] && botWallets[index]) {
    updateBot(index);
  }
};
