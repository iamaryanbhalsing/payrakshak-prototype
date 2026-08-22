# 🛡️ PayRakshak

(This Site isnt deployed As i'm Working on it ; the web app is at its development stage and not yet optimised. Thank you! - Aryan S. Bhalsing )

<a href="https://ibb.co/zT5j8MRW"><img src="https://i.ibb.co/tThkZGsw/Screenshot-2026-08-22-130009.png" alt="Screenshot-2026-08-22-130009" border="0"></a>
<a href="https://ibb.co/JRfc5LNM"><img src="https://i.ibb.co/ccGyD5P7/image-2026-08-22-130552450.png" alt="image-2026-08-22-130552450" border="0"></a>

**Your Smart Shield Against UPI Scams**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-Prototype-red?style=for-the-badge)](LICENSE)

PayRakshak is an intelligent UPI fraud detection and prevention system designed to protect Indian users — especially senior citizens, students, and small businesses — from common digital payment scams.

It analyzes UPI payment requests, QR codes, VPAs, and suspicious messages in real-time and provides clear, actionable safety guidance.

---

## ✨ Features

- **Real-time Risk Analysis**  
  Instantly evaluates UPI links, QR codes, VPAs, and text messages.

- **Risk Scoring Engine**  
  Assigns a risk score (0–100) and risk level: `SAFE` → `LOW` → `MEDIUM` → `HIGH` → `CRITICAL`.

- **Advanced Threat Detection**
  - Urgency & pressure tactics
  - Phishing domains
  - Inverted Collect requests (scammer asks *you* to pay)
  - VPA spoofing
  - Remote access app indicators
  - Advance fee scams
  - Blacklisted entities

- **Multilingual Alerts**  
  Safety messages available in multiple Indian languages.

- **Senior Citizen Mode**  
  Simplified explanations + family alert recommendations.

- **Cybercrime Reporting Support**  
  Generates structured reports ready for the National Cybercrime Helpline (**1930**).

- **QR Code Support**  
  Scan and analyze UPI QR codes directly.

---

## 🏗️ Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Frontend    | React 18, TypeScript, Vite, Tailwind CSS        |
| Backend     | Node.js, Express, TypeScript                    |
| QR Handling | jsQR, qrcode                                    |
| Icons       | Lucide React                                    |
| Styling     | Tailwind CSS + Plus Jakarta Sans                |

---

## 📂 Project Structure
```
payrakshak-prototype/
├── backend/                 # Express + TypeScript API
│   ├── src/
│   │   ├── engine/          # Core risk analysis engine
│   │   │   ├── nlpAnalyzer.ts
│   │   │   ├── riskCalculator.ts
│   │   │   ├── upiParser.ts
│   │   │   ├── receiverVerifier.ts
│   │   │   └── threatDb.ts
│   │   ├── routes/          # API endpoints
│   │   ├── data/
│   │   └── server.ts
│   └── package.json
│
├── frontend/                # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
│
├── screenshots/
└── README.md

```

---


---

## 🚀 Getting Started

### Prerequisites
- Node.js **18+**
- npm or yarn

### 1. Download the repository

Step 1 : Download & Extract
```
git clone https://github.com/iamaryanbhalsing/payrakshak-prototype.git
Download & Extract the Repo
```

Step 2 : For Frontend (Frontend runs at: http://localhost:3000)
```
cd /d D:\payrakshak-prototype\frontend && set VITE_DISABLE_EVENTSOURCE=true && npx vite --port 3000 --host  // Location of File Should Be according to your system
```

Step 3 : For Backend (Backend runs at: http://localhost:5001)
```
cd D:\payrakshak-prototype\backend
node dist/server.js
```

## 📡 API Endpoints
```
MethodEndpoint,Description
GET,/api/health,Health check
POST,/api/analyze,Analyze UPI / text / QR input
POST,/api/report,Generate cybercrime report
POST,/api/ivr,IVR / voice script generation
POST,/api/benchmark/run,Run internal benchmarks
```

## 🎯 Target Users
```
👴 Senior Citizens
🎓 Students
🏪 Small Business Owners
👥 General Public
```

## 🛡️ How It Works
```
User pastes a UPI link / scans a QR / enters a VPA
PayRakshak analyzes the request using multiple detection layers
Instant risk verdict + clear next steps are shown
Option to generate a ready-to-file cybercrime report (1930)
```

## 🧠 Core Detection Categories
```
Category,Description
Urgency,"High-pressure language (""act now"", ""last chance"")"
Phishing Domain,Suspicious / lookalike domains
Inverted Collect,Scammer requesting money from you
VPA Spoof,Fake or manipulated Virtual Payment Addresses
Remote App,"Mentions of AnyDesk, TeamViewer, etc."
Advance Fee,"""Pay small amount to unlock larger sum"" scams"
Blacklisted,Known malicious entities
```

## 👨‍💻 Author
Aryan Sandeep Bhalsing
GitHub: iamaryanbhalsing

## 📄 License
This project is currently a prototype.
All rights reserved © 2026 Aryan Sandeep Bhalsing.

PayRakshak — Protecting India’s digital payments, one transaction at a time. 🇮🇳
