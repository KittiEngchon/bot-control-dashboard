const BotEngine = require('./bot-engine');
const eventBus = require('./event-bus');
const { getMaticPriceUSD } = require('../utils/price-fetcher'); // ✅ เพิ่มบรรทัดนี้

const bots = [];

function createAndStartBots() {
  const botConfigs = [
    { name: 'bot01-sniper', tickInterval: 3000 },
    { name: 'bot02-sentinel', tickInterval: 5000 },
    { name: 'bot03-arbitrage', tickInterval: 7000 },
  ];

  botConfigs.forEach(cfg => {
    const bot = new BotEngine(cfg.name, { tickInterval: cfg.tickInterval });
    bots.push(bot);
    bot.start();
  });
}

// ฟัง event trade-signal จากบอทต่าง ๆ แล้วแสดงผล
eventBus.on('trade-signal', data => {
  console.log(`[Manager] Trade signal from ${data.bot}:`, data);
});

// ฟัง event status-update เพื่อรับข้อมูลสถานะจากบอท
eventBus.on('status-update', data => {
  console.log(`[Manager] Status update from ${data.bot}: ${data.status}`);
});

// ✅ ฟังก์ชันดึงราคา MATIC แบบเรียลไทม์
async function runBotLogic() {
  const price = await getMaticPriceUSD();
  if (price) {
    console.log(`📈 MATIC ล่าสุด: $${price}`);
    
    // ตัวอย่าง logic: แจ้งเตือนถ้าราคาต่ำกว่า $0.6
    if (price < 0.6) {
      console.log('⚠️ ราคาต่ำ! พิจารณาเข้าซื้อ');
    }
  } else {
    console.log('❌ ไม่สามารถดึงราคา MATIC จาก Coingecko ได้');
  }
}

// สร้างและสตาร์ทบอททั้งหมด
createAndStartBots();

// ✅ เรียกฟังก์ชัน runBotLogic ทุก 5 วินาที
setInterval(runBotLogic, 5000);

// หยุดบอททั้งหมดหลังจาก 20 วินาที
setTimeout(() => {
  bots.forEach(bot => bot.stop());
  console.log('All bots stopped.');
}, 20000);
