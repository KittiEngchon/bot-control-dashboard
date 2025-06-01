// src/core/bot-engine.js
const eventBus = require('./event-bus');

class BotEngine {
  constructor(name, config = {}) {
    this.name = name;
    this.config = config;
    this.running = false;
    this.tickInterval = config.tickInterval || 5000; // หน่วยเป็น ms
    this.tickTimer = null;
  }

  start() {
    if (this.running) return;
    this.running = true;
    console.log(`[${this.name}] Bot started with tick interval ${this.tickInterval} ms`);

    eventBus.emit('bot-started', { bot: this.name });

    this.scheduleNextTick();
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    if (this.tickTimer) {
      clearTimeout(this.tickTimer);
      this.tickTimer = null;
    }
    console.log(`[${this.name}] Bot stopped.`);
    eventBus.emit('bot-stopped', { bot: this.name });
  }

  scheduleNextTick() {
    if (!this.running) return;
    this.tickTimer = setTimeout(() => {
      this.tick();
      this.scheduleNextTick();
    }, this.tickInterval);
  }

  tick() {
    if (!this.running) return;
    console.log(`[${this.name}] Tick event at ${new Date().toISOString()}`);

    eventBus.emit('bot-tick', { bot: this.name, timestamp: Date.now() });

    this.performTradingLogic();
  }

  performTradingLogic() {
    console.log(`[${this.name}] Performing trading logic...`);
    eventBus.emit('trade-signal', {
      bot: this.name,
      action: 'buy',
      token: 'MATIC',
      amount: Math.floor(Math.random() * 10) + 1,
    });
  }
}

module.exports = BotEngine;

