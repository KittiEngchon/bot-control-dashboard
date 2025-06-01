const { ethers } = require('ethers');

async function main() {
  // เชื่อม provider (เช่น Infura หรือ Polygon RPC)
  const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');

  // สร้าง wallet จาก private key (ระวังเก็บ private key ให้ดี)
  const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

  // ตั้งค่า swap parameters
  const amountIn = ethers.utils.parseUnits('1.0', 18); // 1 token input (สมมติมี 18 decimals)
  const amountOutMin = ethers.utils.parseUnits('0.95', 18); // รับขั้นต่ำ 0.95 token output (slippage 5%)
  const path = [
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH on Polygon (token in)
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'  // USDC on Polygon (token out)
  ];
  const to = wallet.address;
  const deadlineSeconds = 60 * 20; // 20 นาที

  // เรียก swap
  const receipt = await swapTokens({ provider, wallet, amountIn, amountOutMin, path, to, deadlineSeconds });
  console.log('Swap complete:', receipt.transactionHash);
}

main().catch(console.error);
