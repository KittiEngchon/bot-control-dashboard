// bot-ui.js

const bots = [
  { name: "Market Maker", wallet: "0xAbc1...1234", role: "ทำราคาในตลาด" },
  { name: "Arbitrage Bot", wallet: "0xAbc2...2345", role: "หากำไรจากราคาต่าง DEX" },
  { name: "Impact Bot", wallet: "0xAbc3...3456", role: "ทำราคาเพื่อกระทบกลไกตลาด" },
  { name: "Rebalancer", wallet: "0xAbc4...4567", role: "รักษาสัดส่วน Liquidity Pool" },
  { name: "Auto Swapper", wallet: "0xAbc5...5678", role: "แปลงเหรียญอัตโนมัติ" },
  { name: "Multi-Arb", wallet: "0xAbc6...6789", role: "ไล่ Arbitrage ข้ามหลาย Chain" },
  { name: "Portfolio Adjust", wallet: "0xAbc7...7890", role: "ปรับพอร์ตเหรียญอัตโนมัติ" },
  { name: "Volume Simulator", wallet: "0xAbc8...8901", role: "จำลองปริมาณซื้อขาย" },
  { name: "Buy Wall Bot", wallet: "0xAbc9...9012", role: "ตั้ง Buy wall หลอกราคา" },
  { name: "Sell Wall Bot", wallet: "0xAbcA...0123", role: "ตั้ง Sell wall ควบคุมราคา" },
  { name: "Trend Rider", wallet: "0xAbcB...9999", role: "วิ่งตามเทรนด์ราคา" },
];

const grid = document.getElementById("bot-grid");

bots.forEach((bot, index) => {
  const card = document.createElement("div");
  card.className = "bg-gray-800 rounded-2xl p-4 shadow-md space-y-3";

  card.innerHTML = `
    <div class="flex items-center space-x-4">
      <img src="assets/bot${index + 1}.png" alt="Bot Avatar" class="w-12 h-12 rounded-full bg-white" />
      <div>
        <h2 class="text-xl font-semibold">${bot.name}</h2>
        <p class="text-sm text-gray-400">${bot.role}</p>
      </div>
    </div>
    <p class="text-sm text-gray-300">กระเป๋า: <span class="font-mono">${bot.wallet}</span></p>
    <div class="flex items-center space-x-2">
      <button class="bg-green-500 hover:bg-green-400 px-4 py-1 rounded">เริ่ม</button>
      <button class="bg-red-500 hover:bg-red-400 px-4 py-1 rounded">หยุด</button>
      <button class="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded">Connect Wallet</button>
    </div>
  `;

  grid.appendChild(card);
});
