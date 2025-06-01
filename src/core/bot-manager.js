// src/core/bot-manager.js
const BotEngine = require('./bot-engine');
const eventBus = require('./event-bus');

const bots = [];

function createAndStartBots() {
  const botNames = ['bot01-sniper', 'bot02-sentinel'];
  botNames.forEach(name => {
    const bot = new BotEngine(name, { tickInterval: 3000 });
    bots.push(bot);
    bot.start();
  });
}

// ฟัง event
eventBus.on('trade-signal', (data) => {
  console.log(`[Manager] Received trade signal:`, data);
});

createAndStartBots();
