# 🖥️ IT Helpdesk Simulator

A full-stack IT helpdesk simulation built with **React** and the **Claude AI API**. 
Simulates a real enterprise IT support environment where virtual employees submit 
tickets and an IT technician resolves them using AI-guided troubleshooting steps.

Built as a portfolio project to demonstrate hands-on IT support experience, 
modern web development skills, and AI integration.

---

## 🚀 Features

- **3 Virtual Employees** — Accountant, Sales Rep, and HR Manager each submit 
  realistic IT tickets based on their role
- **AI-Powered Troubleshooting** — Claude AI generates step-by-step resolution 
  guides per ticket including SQL diagnostic queries for database issues
- **6 Ticket Categories** — Software, Hardware, Network, Email, Database, Access
- **Full Ticket Lifecycle** — Open → In Progress → Resolved with timestamps
- **Technician Notes** — Add resolution notes to each ticket
- **Dark Mode UI** — Clean Zendesk-style dashboard built for professionals
- **Real-time Stats** — Live ticket counts by status

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| Claude AI API | AI troubleshooting step generation |
| JavaScript ES6+ | Core logic |
| CSS-in-JS | Styling |

---

## 📋 Ticket Categories

| Category | Example Issues |
|---|---|
| Software | QuickBooks license errors, app crashes |
| Hardware | Printer issues, monitor not detected |
| Network | VPN drops, shared drive access |
| Email | Outlook sync, calendar issues |
| Database | SQL query errors, stored procedure timeouts |
| Access | Account lockouts, permission denied |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- Anthropic API key ([console.anthropic.com](https://console.anthropic.com))

### Steps

1. **Clone the repository**
```bash
   git clone https://github.com/ArmandoSNHU/IT-helpdesk-sim.git
   cd IT-helpdesk-sim
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
```bash
   cp .env.example .env
```
   Add your Anthropic API key to `.env`:
```
   VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxx
```

4. **Start the development server**
```bash
   npm run dev
```

5. **Open in browser**
```
   http://localhost:5173
```

---

## 🖥️ VM Lab Environment

This project is designed to run alongside a **Hyper-V virtual machine lab** 
simulating a real enterprise IT environment:

| VM | User | Role |
|---|---|---|
| VM-IT-ADMIN | IT Technician | Runs the helpdesk dashboard |
| VM-SANDRA | Sandra Reyes | Accountant — submits finance/DB tickets |
| VM-MARCUS | Marcus Cole | Sales Rep — submits CRM/email tickets |
| VM-PRIYA | Priya Nambiar | HR Manager — submits access/HR tickets |

---

## 📁 Project Structure
```
IT-helpdesk-sim/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Main helpdesk dashboard
│   │   └── TicketDetail.jsx   # Ticket detail + AI troubleshooting
│   ├── data/
│   │   ├── workers.js         # Virtual employee data + constants
│   │   └── ticketModel.js     # Ticket factory function
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
└── README.md
```

---

## 🗺️ Roadmap

- [x] Worker data model
- [x] Ticket generation system
- [x] Dark mode dashboard UI
- [x] Ticket detail view
- [x] AI troubleshooting steps via Claude API
- [ ] Gmail integration for real email tickets
- [ ] Ticket persistence with localStorage
- [ ] Activity log / audit trail
- [ ] Export resolved tickets to PDF

---

## 👨‍💻 Author

**Armando** — IT Professional & Developer  
Laredo, TX  
GitHub: [@ArmandoSNHU](https://github.com/ArmandoSNHU)

---

> Built to demonstrate real-world IT support experience through simulation.
> Every ticket category, troubleshooting flow, and resolution step reflects
> actual enterprise IT scenarios.