// bot-ui.js

import { ethers } from "https://cdn.ethers.io/lib/ethers-5.6.esm.min.js";

let botWallets = new Array(11).fill(null);

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

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
        <button onclick="startBot(${index})">Start</button>
        <button onclick="stopBot(${index})">Stop</button>
      </div>
    `;
    container.appendChild(card);
  });
});

window.connectWallet = async function(index) {
  try {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    botWallets[index] = signer;
    document.getElementById(`wallet-${index}`).innerText = address;

    const balance = await provider.getBalance(address);
    const etherString = ethers.utils.formatEther(balance);
    document.getElementById(`balance-${index}`).innerText = parseFloat(etherString).toFixed(4) + " ETH";
  } catch (err) {
    console.error("Wallet connection error:", err);
  }
};

window.startBot = async function(index) {
  if (!botWallets[index]) {
    alert("Connect wallet ก่อน");
    return;
  }

  try {
    const signer = botWallets[index];
    const tx = await signer.sendTransaction({
      to: signer.address,
      value: ethers.utils.parseEther("0.000001"), // dummy tx
    });
    console.log(`Bot ${index} ส่งธุรกรรมแล้ว:`, tx.hash);
  } catch (e) {
    console.error(`Bot ${index} ส่งธุรกรรมล้มเหลว:`, e);
  }
};

window.stopBot = function(index) {
  console.log(`Bot ${index} หยุดการทำงาน (mock)`);
};
