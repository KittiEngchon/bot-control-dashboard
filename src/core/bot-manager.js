// src/core/bot-manager.js
const BotEngine = require('./bot-engine');
const eventBus = require('./event-bus');

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

eventBus.on('trade-signal', data => {
  console.log(`[Manager] Trade signal received from ${data.bot}:`, data);
});

createAndStartBots();

// ตัวอย่างหยุดบอทหลังจาก 20 วินาที
setTimeout(() => {
  bots.forEach(bot => bot.stop());
  console.log('All bots stopped.');
}, 20000);
const BotEngine = require('./bot-engine');
const eventBus = require('./event-bus');

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

// ฟัง event trade-signal
eventBus.on('trade-signal', data => {
  console.log(`[Manager] Trade signal from ${data.bot}:`, data);
});

// ฟัง event status-update เพื่อดูสถานะบอท
eventBus.on('status-update', data => {
  console.log(`[Manager] Status update from ${data.bot}: ${data.status}`);
});

createAndStartBots();

setTimeout(() => {
  bots.forEach(bot => bot.stop());
  console.log('All bots stopped.');
}, 20000);
