// bot-ui.js

const bots = [
  { name: "Market Maker", alias: "MM-1", wallet: "0xAbc1...1234", role: "ทำราคาในตลาด", balance: 12000, pnl: 4.3, status: false },
  { name: "Arbitrage Bot", alias: "Arbi-Bot", wallet: "0xAbc2...2345", role: "หากำไรจากราคาต่าง DEX", balance: 9800, pnl: 2.1, status: false },
  { name: "Impact Bot", alias: "Impacky", wallet: "0xAbc3...3456", role: "ทำราคาเพื่อกระทบกลไกตลาด", balance: 10320, pnl: -1.7, status: false },
  { name: "Rebalancer", alias: "Balancer", wallet: "0xAbc4...4567", role: "รักษาสัดส่วน Liquidity Pool", balance: 8700, pnl: 0.0, status: false },
  { name: "Auto Swapper", alias: "Auto-SW", wallet: "0xAbc5...5678", role: "แปลงเหรียญอัตโนมัติ", balance: 11200, pnl: 3.5, status: false },
  { name: "Multi-Arb", alias: "M-Arb", wallet: "0xAbc6...6789", role: "ไล่ Arbitrage ข้ามหลาย Chain", balance: 9450, pnl: 1.2, status: false },
  { name: "Portfolio Adjust", alias: "Adjuster", wallet: "0xAbc7...7890", role: "ปรับพอร์ตเหรียญอัตโนมัติ", balance: 9990, pnl: -0.8, status: false },
  { name: "Volume Simulator", alias: "SimuBot", wallet: "0xAbc8...8901", role: "จำลองปริมาณซื้อขาย", balance: 8800, pnl: 2.9, status: false },
  { name: "Buy Wall Bot", alias: "WallBuy", wallet: "0xAbc9...9012", role: "ตั้ง Buy wall หลอกราคา", balance: 7600, pnl: -2.3, status: false },
  { name: "Sell Wall Bot", alias: "WallSell", wallet: "0xAbcA...0123", role: "ตั้ง Sell wall ควบคุมราคา", balance: 7400, pnl: -3.1, status: false },
  { name: "Trend Rider", alias: "TrendR", wallet: "0xAbcB...9999", role: "วิ่งตามเทรนด์ราคา", balance: 10450, pnl: 5.7, status: false },
];

const grid = document.getElementById("bot-grid");

grid.innerHTML = "";

bots.forEach((bot, index) => {
  const card = document.createElement("div");
  card.className = "bg-gray-800 rounded-2xl p-4 shadow-md space-y-3";

  const pnlColor = bot.pnl >= 0 ? 'text-green-400' : 'text-red-400';
  const statusText = bot.status ? '🟢 ทำงานอยู่' : '⚪ หยุดอยู่';
  const statusColor = bot.status ? 'text-green-400' : 'text-gray-400';

  card.innerHTML = `
    <div class="flex items-center space-x-4">
      <img src="assets/bot${index + 1}.png" alt="Bot Avatar" class="w-12 h-12 rounded-full bg-white" />
      <div>
        <input type="text" value="${bot.alias}" class="text-xl font-semibold bg-transparent border-b border-gray-600 focus:outline-none w-full" />
        <p class="text-sm text-gray-400">${bot.role}</p>
      </div>
    </div>
    <p class="text-sm text-gray-300">กระเป๋า: <span class="font-mono">${bot.wallet}</span></p>
    <p class="text-sm text-gray-300">ถือครอง: ${bot.balance.toLocaleString()} USDC</p>
    <p class="text-sm ${pnlColor}">กำไร/ขาดทุน: ${bot.pnl > 0 ? '+' : ''}${bot.pnl.toFixed(1)}%</p>
    <p class="text-sm ${statusColor}">${statusText}</p>
    <div class="flex items-center space-x-2">
      <button class="bg-green-500 hover:bg-green-400 px-4 py-1 rounded" onclick="toggleBot(${index}, true)">เริ่ม</button>
      <button class="bg-red-500 hover:bg-red-400 px-4 py-1 rounded" onclick="toggleBot(${index}, false)">หยุด</button>
      <button class="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded">Connect Wallet</button>
    </div>
  `;

  grid.appendChild(card);
});

function toggleBot(index, run) {
  bots[index].status = run;
  renderBots();
}

function renderBots() {
  grid.innerHTML = "";
  bots.forEach((_, i) => bots[i].alias = document.querySelectorAll('input')[i].value);
  bots.forEach((bot, index) => {
    const card = document.createElement("div");
    card.className = "bg-gray-800 rounded-2xl p-4 shadow-md space-y-3";

    const pnlColor = bot.pnl >= 0 ? 'text-green-400' : 'text-red-400';
    const statusText = bot.status ? '🟢 ทำงานอยู่' : '⚪ หยุดอยู่';
    const statusColor = bot.status ? 'text-green-400' : 'text-gray-400';

    card.innerHTML = `
      <div class="flex items-center space-x-4">
        <img src="assets/bot${index + 1}.png" alt="Bot Avatar" class="w-12 h-12 rounded-full bg-white" />
        <div>
          <input type="text" value="${bot.alias}" class="text-xl font-semibold bg-transparent border-b border-gray-600 focus:outline-none w-full" />
          <p class="text-sm text-gray-400">${bot.role}</p>
        </div>
      </div>
      <p class="text-sm text-gray-300">กระเป๋า: <span class="font-mono">${bot.wallet}</span></p>
      <p class="text-sm text-gray-300">ถือครอง: ${bot.balance.toLocaleString()} USDC</p>
      <p class="text-sm ${pnlColor}">กำไร/ขาดทุน: ${bot.pnl > 0 ? '+' : ''}${bot.pnl.toFixed(1)}%</p>
      <p class="text-sm ${statusColor}">${statusText}</p>
      <div class="flex items-center space-x-2">
        <button class="bg-green-500 hover:bg-green-400 px-4 py-1 rounded" onclick="toggleBot(${index}, true)">เริ่ม</button>
        <button class="bg-red-500 hover:bg-red-400 px-4 py-1 rounded" onclick="toggleBot(${index}, false)">หยุด</button>
        <button class="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded">Connect Wallet</button>
      </div>
    `;

    grid.appendChild(card);
  });
}
