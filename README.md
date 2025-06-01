# 🧠 Bot Control Dashboard

แดชบอร์ดสำหรับควบคุมและจัดการบอทเทรดอัตโนมัติ พร้อมระบบเชื่อมต่อวอลเล็ทและตั้งค่าการทำงานของบอทแบบเรียลไทม์

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

├── index.html                  # หน้าหลักแดชบอร์ด
├── bot-logic.js               # สมองของบอท – จัดการกลยุทธ์และการตัดสินใจ
├── bot-ui.js                  # การจัดการ UI และปฏิสัมพันธ์ผู้ใช้
├── bot-wallet-connect.js      # ระบบเชื่อมต่อกระเป๋า (Metamask/Web3)
├── tick-settings.html         # หน้า UI สำหรับตั้งค่า tick
├── tick-settings.js           # โลจิกสำหรับ tick และความถี่ของบอท
└── token-list.json            # รายชื่อเหรียญ/โทเคนที่ระบบรองรับ

โปรเจกต์นี้ยังอยู่ระหว่างการพัฒนา (Early-stage development)

โปรดตรวจสอบความปลอดภัยก่อนเชื่อมต่อวอลเล็ทจริง

ไม่แนะนำให้ใช้กับเงินจริงจนกว่าจะมีระบบตรวจสอบและ sandbox ที่ปลอดภัย
