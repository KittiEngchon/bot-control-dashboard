// src/core/event-bus.js
const EventEmitter = require('events');

class BotEventBus extends EventEmitter {}

const eventBus = new BotEventBus();

module.exports = eventBus;

