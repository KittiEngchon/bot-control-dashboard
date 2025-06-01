# 🧠 Bot Control Dashboard

แดชบอร์ดสำหรับควบคุมและจัดการบอทเทรดอัตโนมัติ พร้อมระบบเชื่อมต่อวอลเล็ทและตั้งค่าการทำงานของบอทแบบเรียลไทม์

บอท 11 ตัว ประสานงานกัน

กระเป๋าแยกของแต่ละบอท (wallets/)

เชื่อม QuickSwap + SushiSwap ผ่าน MetaMask บน Polygon

UI หน้าเว็บแสดงผลบน Google Chrome พร้อมเชื่อม MetaMask

ใช้ event bus สื่อสารบอทภายในระบบ

รันผ่านเว็บเซิร์ฟเวอร์ (ไม่ใช่เปิดไฟล์โดยตรง)

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
├── public/                         # หน้าเว็บ HTML + assets
│   └── index.html                  # UI หลักควบคุมบอท

├── src/
│   ├── bots/                       # บอท 11 ตัวแยกโฟลเดอร์
│   │   ├── bot01-sniper/
│   │   ├── bot02-sentinel/
│   │   └── ... bot11-analytics/

│   ├── wallets/                    # wallet แต่ละบอท (เข้ารหัสจริงในโปรดักชัน)
│   │   ├── bot01-sniper.json
│   │   └── ...

│   ├── dex/                       # โมดูลเชื่อม QuickSwap, SushiSwap
│   │   ├── router.js
│   │   └── addresses.js

│   ├── core/                      # ตัวกลางระบบ
│   │   ├── bot-engine.js
│   │   ├── event-bus.js
│   │   └── bot-manager.js

│   ├── ui/                       # UI + เชื่อม MetaMask
│   │   ├── dashboard.js
│   │   ├── wallet-connector.js
│   │   └── bot-control-panel.js

│   ├── utils/
│   │   ├── wallet-utils.js
│   │   └── logger.js

│   └── config/
│       └── system-config.json

├── index.js                      # entry point ฝั่ง Node.js (backend controller)

├── package.json

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

