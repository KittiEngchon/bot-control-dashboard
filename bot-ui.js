// bot-ui.js

document.addEventListener("DOMContentLoaded", () => {
  const botData = [
    { name: "Market Maker", address: "0x111...", role: "Liquidity", image: "1.png" },
    { name: "Arbitrage", address: "0x112...", role: "Price Gap", image: "2.png" },
    { name: "Price Impact", address: "0x113...", role: "Monitor", image: "3.png" },
    { name: "Rebalancer", address: "0x114...", role: "Adjust Ratio", image: "4.png" },
    { name: "Auto Swapper", address: "0x115...", role: "Swap Trigger", image: "5.png" },
    { name: "Multi Arbitrage", address: "0x116...", role: "Multi-hop", image: "6.png" },
    { name: "Portfolio Adjust", address: "0x117...", role: "Weight Balance", image: "7.png" },
    { name: "Volume Simulator", address: "0x118...", role: "Fake Vol", image: "8.png" },
    { name: "Trend Watcher", address: "0x119...", role: "Follow Trend", image: "9.png" },
    { name: "Profit Tracker", address: "0x11A...", role: "PnL Report", image: "10.png" },
    { name: "Coordinator", address: "0x11B...", role: "Manager", image: "11.png" },
  ];

  const container = document.getElementById("bot-container");

  botData.forEach((bot, index) => {
    const card = document.createElement("div");
    card.className = "bot-card";
    card.innerHTML = `
      <img src="images/${bot.image}" class="bot-profile">
      <h3 contenteditable="true">${bot.name}</h3>
      <p><strong>Role:</strong> ${bot.role}</p>
      <p><strong>Wallet:</strong> ${bot.address}</p>
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

function connectWallet(index) {
  alert(`(จำลอง) เชื่อม Wallet สำหรับ Bot ${index}`);
}

// เชื่อมกับ bot-logic.js โดยที่ startBot(index), stopBot(index) ถูกประกาศไว้ใน global

