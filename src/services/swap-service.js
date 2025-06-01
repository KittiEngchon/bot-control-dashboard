const { ethers } = require('ethers');

// ตัวอย่าง Uniswap V2 Router address บน Polygon (QuickSwap)
const UNISWAP_ROUTER_ADDRESS = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff';

// ABI แบบย่อของฟังก์ชัน swapExactTokensForTokens
const UNISWAP_ROUTER_ABI = [
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
];

// ฟังก์ชัน swap
async function swapTokens({
  provider,       // ethers provider (เช่น Infura, Alchemy หรือ MetaMask)
  wallet,         // ethers Wallet object ที่เชื่อมต่อกับ provider
  amountIn,       // จำนวน token ที่จะ swap (เป็น BigNumber หรือ string)
  amountOutMin,   // จำนวน token ขั้นต่ำที่จะรับ (slippage)
  path,           // array ที่เป็นเส้นทาง token [tokenInAddress, tokenOutAddress]
  to,             // ที่อยู่รับ token หลัง swap (ส่วนใหญ่จะเป็น wallet.address)
  deadlineSeconds // เวลาหมดอายุ transaction (วินาทีจากเวลาปัจจุบัน)
}) {
  const router = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, wallet);

  // ตั้งเวลาหมดอายุ
  const deadline = Math.floor(Date.now() / 1000) + deadlineSeconds;

  // ต้อง Approve token ก่อนถ้ายังไม่ได้อนุญาตให้ router ใช้ token นี้
  // สมมติ tokenIn คือ ERC20 ที่มีฟังก์ชัน approve
  const tokenInAddress = path[0];
  const erc20Abi = [
    'function approve(address spender, uint256 amount) public returns (bool)',
    'function allowance(address owner, address spender) public view returns (uint256)',
  ];
  const tokenInContract = new ethers.Contract(tokenInAddress, erc20Abi, wallet);

  // เช็ค allowance ก่อน approve
  const allowance = await tokenInContract.allowance(wallet.address, UNISWAP_ROUTER_ADDRESS);
  if (allowance.lt(amountIn)) {
    console.log('Approving token...');
    const approveTx = await tokenInContract.approve(UNISWAP_ROUTER_ADDRESS, amountIn);
    await approveTx.wait();
    console.log('Approved.');
  }

  // เรียก swapExactTokensForTokens
  console.log('Sending swap transaction...');
  const tx = await router.swapExactTokensForTokens(
    amountIn,
    amountOutMin,
    path,
    to,
    deadline,
    {
      gasLimit: ethers.utils.hexlify(300000), // ตั้งค่า gas limit
      // gasPrice: ethers.utils.parseUnits('30', 'gwei'), // กำหนด gas price ถ้าต้องการ
    }
  );

  console.log('Transaction hash:', tx.hash);

  // รอ transaction mined
  const receipt = await tx.wait();
  console.log('Transaction confirmed in block', receipt.blockNumber);

  return receipt;
}
