// src/core/bot-engine.js
const eventBus = require('./event-bus');

class BotEngine {
  constructor(name, config = {}) {
    this.name = name;
    this.config = config;
    this.running = false;
    this.tickInterval = config.tickInterval || 5000; // ms
    this.tickTimer = null;
  }

  start() {
    if (this.running) return;
    this.running = true;
    console.log(`[${this.name}] Bot started.`);

    // ส่ง event แจ้งว่าบอทเริ่มทำงาน
    eventBus.emit('bot-started', { bot: this.name });

    this.tickTimer = setInterval(() => this.tick(), this.tickInterval);
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    clearInterval(this.tickTimer);
    this.tickTimer = null;

    console.log(`[${this.name}] Bot stopped.`);
    eventBus.emit('bot-stopped', { bot: this.name });
  }

  tick() {
    if (!this.running) return;

    console.log(`[${this.name}] Tick event fired.`);

    // ส่ง event เพื่อบอทอื่นหรือระบบฟังได้
    eventBus.emit('bot-tick', { bot: this.name, timestamp: Date.now() });

    // ตัวอย่าง: logic เทรดเบื้องต้น (placeholder)
    this.performTradingLogic();
  }

  performTradingLogic() {
    // ตัวอย่าง logic ง่าย ๆ
    console.log(`[${this.name}] Performing trading logic...`);

    // สมมติส่งสัญญาณบางอย่าง เช่น
    eventBus.emit('trade-signal', { bot: this.name, action: 'buy', token: 'MATIC', amount: 10 });
  }
}

module.exports = BotEngine;
