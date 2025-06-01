# 🧠 Bot Control Dashboard

แดชบอร์ดสำหรับควบคุมและจัดการบอทเทรดอัตโนมัติ พร้อมระบบเชื่อมต่อวอลเล็ทและตั้งค่าการทำงานของบอทแบบเรียลไทม์

✳️ เชื่อมต่อ QuickSwap และ SushiSwap บนเครือข่าย Polygon

✅ ใช้ MetaMask (เชื่อมผ่าน Web3 Provider)

🤖 แต่ละ บอทมีกระเป๋าแยกของตัวเอง (wallet address + private key)

บอททำงานประสารกัน


A simple, modular dashboard for managing and configuring automated trading bots. Includes wallet integration and tick-based settings.

---

## 📦 ฟีเจอร์หลัก | Features

- ✅ หน้าแดชบอร์ดแบบเรียลไทม์ (Real-time dashboard UI)
- 🔄 ระบบเชื่อมต่อกับวอลเล็ท (Wallet connection via Web3)
- ⚙️ ตั้งค่า tick, ความถี่, โทเคนที่ใช้เทรด (Configurable bot ticks and token lists)
- 📊 รองรับการแสดงสถานะการทำงานของบอทแบบ live (Live bot status monitoring)

---

## 🖥️ ตัวอย่างหน้าจอ | Demo Screenshot

> *(เพิ่มภาพหน้าจอแดชบอร์ดของคุณที่นี่)*

---

## 🚀 วิธีใช้งาน | Getting Started

### 1. Clone โปรเจกต์
```bash
git clone https://github.com/KittiEngchon/bot-control-dashboard.git
cd bot-control-dashboard

bot-control-dashboard/
├── bots/                         # โฟลเดอร์รวมบอททั้งหมด
│   ├── sentinel/
│   │   ├── index.js              # โค้ดหลักบอท
│   │   └── config.json           # ค่าตั้งเฉพาะบอทนี้
│   ├── sniper/
│   │   ├── index.js
│   │   └── config.json
│   └── trader/
│       ├── index.js
│       └── config.json

├── wallets/                      # Private Key ของแต่ละบอท (ต้องเข้ารหัสจริงในโปรดักชัน)
│   ├── sentinel.json
│   ├── sniper.json
│   └── trader.json

├── dex/                          # โมดูลเชื่อมต่อ DEX
│   ├── router.js                 # เรียกใช้ QuickSwap / SushiSwap ได้ในไฟล์เดียว
│   ├── addresses.js              # เก็บ Router Address ของแต่ละ DEX
│   └── abis/
│       └── uniswap-v2-router.json

├── core/                         # โมดูลหลักของระบบควบคุม
│   ├── bot-engine.js             # สั่งรันทุกบอทแบบประสานกัน
│   ├── event-bus.js              # ส่งข้อมูลระหว่างบอท
│   └── bot-manager.js            # โหลดและจัดการบอทตาม config

├── ui/                           # Frontend UI (เชื่อม MetaMask)
│   ├── control-panel.js          # UI ควบคุมแต่ละบอท
│   ├── wallet-connector.js       # ใช้เชื่อม MetaMask
│   └── status-panel.js

├── utils/
│   ├── wallet-utils.js           # โหลด wallet (จากไฟล์) ให้บอทแต่ละตัว
│   └── logger.js

├── config/
│   └── system-config.json        # ตั้งค่าทั่วไป เช่น ChainID, token base

├── index.js                      # จุดเริ่มรันระบบ
├── index.html                    # หน้าเว็บ UI
└── README.md



โปรเจกต์นี้ยังอยู่ระหว่างการพัฒนา (Early-stage development)

โปรดตรวจสอบความปลอดภัยก่อนเชื่อมต่อวอลเล็ทจริง

ไม่แนะนำให้ใช้กับเงินจริงจนกว่าจะมีระบบตรวจสอบและ sandbox ที่ปลอดภัย




| ส่วน                            | สถานะ | หมายเหตุ                                        |
| ------------------------------- | ----- | ----------------------------------------------- |
| การเชื่อมกับ DEX                | ❌     | ยังไม่มี Uniswap/PancakeSwap integration        |
| การส่งธุรกรรมเทรด               | ❌     | ยังไม่เรียก Smart Contract หรือ swap            |
| ระบบเทรดอัตโนมัติ (Auto Loop)   | ⚠️    | มีแนวคิดจาก `tick`, แต่ยังไม่ครอบคลุม logic     |
| Backtest / บันทึกผลลัพธ์        | ❌     | ยังไม่มีระบบ log                                |
| แสดงราคาเหรียญแบบเรียลไทม์      | ❌     | ยังไม่ fetch ราคาผ่าน API                       |
| Strategy เช่น Sniper, DCA, FOMO | ❌     | ยังไม่ระบุ logic การเข้า order จริง             |
| หน้าจอแสดงสถานะการทำงาน         | ⚠️    | UI เริ่มต้นมี modal แต่ยังไม่เป็นกราฟ/ตารางจริง |


✅ แนวคิด: Bot ที่ประสานงานกัน
ไม่ใช่บอทตัวเดียวทำงานแยกกัน แต่เป็นระบบที่ หลายบอทสื่อสาร/ประสานกัน เพื่อให้การตัดสินใจแม่นยำขึ้น หรือแบ่งหน้าที่ เช่น

| บอท                     | หน้าที่                                                   |
| ----------------------- | --------------------------------------------------------- |
| 📡 **Sentinel Bot**     | ตรวจจับโอกาสจากตลาด (เช่น ราคา dump/hype) แล้วแจ้งตัวอื่น |
| 🛒 **Sniper Bot**       | รับสัญญาณจาก Sentinel แล้วเข้าออเดอร์เร็ว                 |
| 🧠 **Analyzer Bot**     | วิเคราะห์เทรนด์/กราฟย้อนหลัง แล้วแนะนำกลยุทธ์             |
| 🧬 **Strategy Manager** | เป็นตัวกลางเลือกว่าให้บอทไหนทำงาน                         |
| 💰 **Trader Bot**       | ทำคำสั่งซื้อ-ขายจริง เมื่อได้รับ "อนุญาต"                 |
| 🧾 **Logger Bot**       | เก็บบันทึกเทรด, PnL, Gas Fee, Wallet Stats                |

