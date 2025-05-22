// bot-wallet-connect.js

// ใช้กับแต่ละบอท 11 ตัว และเก็บสถานะ wallet แยกตัว
const botWallets = Array.from({ length: 11 }, (_, i) => ({
  address: null,
  connected: false,
  signer: null,
}));

// ฟังก์ชันเชื่อม Wallet สำหรับแต่ละบอทโดย index
async function connectWallet(botIndex) {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask not found');
    return;
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    botWallets[botIndex].address = address;
    botWallets[botIndex].connected = true;
    botWallets[botIndex].signer = signer;

    // แสดงผลใน UI
    document.getElementById(`walletAddress-${botIndex}`).innerText = shortenAddress(address);
    document.getElementById(`walletStatus-${botIndex}`).innerText = '✅ Connected';
  } catch (err) {
    console.error(err);
    alert('Wallet connection failed');
  }
}

function shortenAddress(address) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

// เชื่อมกับปุ่ม connect แต่ละตัวใน UI (เช่นใน bot-ui.js หรือ HTML)
function setupConnectButtons() {
  for (let i = 0; i < 11; i++) {
    const btn = document.getElementById(`connectWalletBtn-${i}`);
    if (btn) {
      btn.addEventListener('click', () => connectWallet(i));
    }
  }
}

document.addEventListener('DOMContentLoaded', setupConnectButtons);
