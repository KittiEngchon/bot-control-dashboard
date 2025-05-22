// bot-logic.js

// ตัวอย่างสถานะเบื้องต้นของแต่ละบอท
const botStatus = Array.from({ length: 11 }, (_, i) => ({
  running: false,
  intervalId: null,
}));

// ----------- BOT 1: Market Maker -----------
function runMarketMaker(index) {
  console.log(`Market Maker Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    // ตัวอย่าง logic
    console.log(`[Bot ${index}] Providing liquidity on DEX...`);
  }, 5000);
}

// ----------- BOT 2: Arbitrage -----------
function runArbitrage(index) {
  console.log(`Arbitrage Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Scanning for arbitrage opportunities...`);
  }, 6000);
}

// ----------- BOT 3: Price Impact Checker -----------
function runPriceImpact(index) {
  console.log(`Price Impact Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Monitoring price slippage...`);
  }, 5500);
}

// ----------- BOT 4: Rebalancer -----------
function runRebalancer(index) {
  console.log(`Rebalancer Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Rebalancing token ratios...`);
  }, 8000);
}

// ----------- BOT 5: Auto Swapper -----------
function runAutoSwapper(index) {
  console.log(`Auto Swapper Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Auto-swapping tokens if trigger met...`);
  }, 4500);
}

// ----------- BOT 6: Multi Arbitrage -----------
function runMultiArbitrage(index) {
  console.log(`Multi Arbitrage Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Multi-hop arbitrage scanning...`);
  }, 7000);
}

// ----------- BOT 7: Portfolio Adjust -----------
function runPortfolioAdjust(index) {
  console.log(`Portfolio Adjust Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Adjusting portfolio allocations...`);
  }, 8500);
}

// ----------- BOT 8: Volume Simulator -----------
function runVolumeSimulator(index) {
  console.log(`Volume Simulator Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Simulating trade volume...`);
  }, 4000);
}

// ----------- BOT 9: Trend Watcher -----------
function runTrendWatcher(index) {
  console.log(`Trend Watcher Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Watching price trends...`);
  }, 6200);
}

// ----------- BOT 10: Profit Tracker -----------
function runProfitTracker(index) {
  console.log(`Profit Tracker Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Calculating PnL...`);
  }, 5000);
}

// ----------- BOT 11: Coordinator -----------
function runCoordinator(index) {
  console.log(`Coordinator Bot [${index}] started`);
  botStatus[index].intervalId = setInterval(() => {
    console.log(`[Bot ${index}] Managing command dispatch to team bots...`);
  }, 3000);
}

// ----------- START / STOP CONTROL -----------
const botFunctions = [
  runMarketMaker,
  runArbitrage,
  runPriceImpact,
  runRebalancer,
  runAutoSwapper,
  runMultiArbitrage,
  runPortfolioAdjust,
  runVolumeSimulator,
  runTrendWatcher,
  runProfitTracker,
  runCoordinator,
];

function startBot(index) {
  if (!botStatus[index].running) {
    botFunctions[index](index);
    botStatus[index].running = true;
  }
}

function stopBot(index) {
  if (botStatus[index].running) {
    clearInterval(botStatus[index].intervalId);
    botStatus[index].running = false;
    console.log(`Bot [${index}] stopped`);
  }
}
