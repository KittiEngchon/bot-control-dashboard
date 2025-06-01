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




โปรเจกต์นี้ยังอยู่ระหว่างการพัฒนา (Early-stage development)

โปรดตรวจสอบความปลอดภัยก่อนเชื่อมต่อวอลเล็ทจริง

ไม่แนะนำให้ใช้กับเงินจริงจนกว่าจะมีระบบตรวจสอบและ sandbox ที่ปลอดภัย



✅ แนวคิด: Bot ที่ประสานงานกัน
ไม่ใช่บอทตัวเดียวทำงานแยกกัน แต่เป็นระบบที่ หลายบอทสื่อสาร/ประสานกัน เพื่อให้การตัดสินใจแม่นยำขึ้น หรือแบ่งหน้าที่ เช่น

รายชื่อบอท 11 ตัว พร้อมหน้าที่
Market Maker Bot

ทำหน้าที่สร้างสภาพคล่อง สร้างคำสั่งซื้อขาย (order book)

ควบคุมสเปรดราคาให้เหมาะสมในตลาด

Arbitrage Bot

หาโอกาส Arbitrage ระหว่าง DEX ต่าง ๆ

ทำกำไรจากส่วนต่างราคาแบบอัตโนมัติ

Impact Bot

วิเคราะห์และควบคุมผลกระทบของการเทรดขนาดใหญ่ (Price Impact)

ลดความเสียหายจากการเทรดครั้งใหญ่

Rebalancer Bot

ปรับสมดุลพอร์ตตามกลยุทธ์ที่ตั้งไว้

ซื้อขายอัตโนมัติเพื่อรักษาสัดส่วนสินทรัพย์

Auto Swapper Bot

สลับเหรียญในพอร์ตแบบอัตโนมัติ ตามเงื่อนไขและสัญญาณตลาด

Multi-Arb Bot

ทำ Arbitrage หลายช่องทางพร้อมกัน

เพิ่มประสิทธิภาพและกำไรจากหลายแหล่ง

Portfolio Adjust Bot

ปรับพอร์ตตามการวิเคราะห์เชิงลึก

ตอบสนองความเปลี่ยนแปลงของตลาดแบบไดนามิก

Volume Simulator Bot

จำลองการเทรดเพื่อทดสอบปริมาณและผลกระทบในตลาด

ช่วยวางแผนและปรับกลยุทธ์

Buy Wall Bot

สร้างกำแพงซื้อ (Buy Wall) เพื่อหนุนราคาหรือสร้างแรงซื้อ

Sell Wall Bot

สร้างกำแพงขาย (Sell Wall) เพื่อควบคุมราคาและลดความผันผวน

Trend Rider Bot

ติดตามเทรนด์และปรับกลยุทธ์ตามแนวโน้มตลาด

bot-control-dashboard/
│
├── public/                     # ไฟล์สาธารณะ เช่น index.html, favicon, static assets
│   ├── index.html              # หน้าเว็บหลัก UI
│   ├── favicon.ico
│   └── assets/                # รูปภาพ, ไอคอน, CSS, JS แบบคงที่
│
├── src/                       # โค้ดหลักของโปรเจกต์
│   ├── bots/                  # โฟลเดอร์บอทแยกตามชื่อบอท
│   │   ├── marketMakerBot.js
│   │   ├── arbitrageBot.js
│   │   ├── impactBot.js
│   │   ├── rebalancerBot.js
│   │   ├── autoSwapperBot.js
│   │   ├── multiArbBot.js
│   │   ├── portfolioAdjustBot.js
│   │   ├── volumeSimulatorBot.js
│   │   ├── buyWallBot.js
│   │   ├── sellWallBot.js
│   │   └── trendRiderBot.js
│   │
│   ├── components/            # React/Vue/หรือ UI components (ถ้าใช้ framework)
│   │   ├── Dashboard.js       # หน้าแดชบอร์ดหลัก
│   │   ├── WalletConnect.js   # โมดูลเชื่อมต่อ MetaMask / Wallet
│   │   ├── BotStatus.js       # แสดงสถานะบอทแบบเรียลไทม์
│   │   └── SettingsPanel.js   # ตั้งค่าบอท, tick, token, frequency
│   │
│   ├── eventBus.js            # โมดูล Event Bus สำหรับสื่อสารบอทในระบบ
│   ├── walletManager.js       # จัดการกระเป๋าแยกของบอทแต่ละตัว
│   ├── api.js                 # เรียกใช้ API หรือเชื่อม QuickSwap/SushiSwap
│   ├── config.js              # ตั้งค่าพื้นฐาน เช่น network, contract addresses
│   └── index.js               # จุดเริ่มต้นของแอป (entry point)
│
├── wallets/                   # ไฟล์เก็บข้อมูล wallet แยกแต่ละบอท (เช่น private keys, address) - ควรเก็บปลอดภัย
│   ├── marketMakerWallet.json
│   ├── arbitrageWallet.json
│   └── ...                   # wallets ของบอทแต่ละตัว
│
├── server/                    # โค้ด backend (ถ้ามี)
│   ├── server.js              # รันเว็บเซิร์ฟเวอร์ (เช่น Node.js/Express)
│   └── socket.js              # websocket สำหรับ real-time event
│
├── tests/                     # โฟลเดอร์ทดสอบระบบ (unit tests, integration tests)
│   ├── bots.test.js
│   └── walletManager.test.js
│
├── .env                       # ตัวแปรแวดล้อม เช่น API keys, Private keys (ไม่ควร commit)
├── package.json               # รายละเอียดโปรเจกต์และ dependencies (ถ้าใช้ Node.js)
├── README.md                  # เอกสารโปรเจกต์
└── webpack.config.js (หรือไฟล์ config bundler อื่นๆ)
