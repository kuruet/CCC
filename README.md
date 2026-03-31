# 🎨 Caricature Workshop Platform (CCC)

A **production-grade full-stack platform** built to showcase **caricature artists**, highlight their **services**, and manage **paid workshop registrations** with secure payments, atomic seat allocation, and automated workflows.

---

## 🌐 Product Overview

This platform is more than just a registration system — it acts as a **complete digital presence for caricature artists**.

It was built for a **2-day workshop event (March 14–15)** to:

- 🎭 Showcase artists and their unique styles  
- 🛠️ Present services (events, live caricature, commissions)  
- 🎟️ Manage workshop registrations  
- 💳 Handle secure real-time payments  
- ⚡ Allocate seats without race conditions  
- 📧 Automate confirmations and communication  

---

## 🧩 Platform Sections

### 🎭 Artists Showcase
- Displays caricature artists  
- Highlights:
  - Style  
  - Experience  
  - Portfolio  

### 🛠️ Services Section
- Clearly structured offerings:
  - Event caricature 🎉  
  - Live sketching ✍️  
  - Custom commissions 🖼️  
- Helps convert visitors into customers  

### 🎟️ Workshop Section
- Core module of the platform  
- Features:
  - Slot-based booking (SLOT_1, SLOT_2)  
  - Limited seat handling  
  - Real-time availability  

---

## 🚀 Core Features

### 🎟️ Smart Registration System
- User inputs:
  - Name  
  - Email  
  - Phone  
- Slot-based booking  
- Real-time seat tracking  

### 💳 Secure Payment Integration
- Razorpay integration  
- Backend-driven order creation  
- Webhook-based verification (**frontend is not trusted**)  

Handles:
- ✅ Success  
- ❌ Failure  
- 🔁 Retry flows  

### ⚡ Atomic Seat Allocation
- MongoDB atomic operations used  
- Prevents:
  - Overbooking  
  - Race conditions  
  - Last-seat conflicts  

### 🔁 State Machine Driven Backend

#### Registration Flow 


#### Payment Flow



- Ensures valid transitions only  
- Maintains system consistency  

### 📡 Webhook-First Architecture
- Payment confirmation ONLY via webhook  
- Idempotent design  
- Safe retries  
- Backend = source of truth  

### 📧 Email Automation
- Sends confirmation emails after booking  
- Retry-safe implementation  

### 🛠️ Admin Dashboard
- Monitor:
  - Registrations  
  - Payments  
  - Seat usage  
- Full system visibility  

### 🔐 Production Safety
- Idempotent operations  
- Strict validation  
- No manual DB updates  
- Race-condition safe  

---

## 🏗️ Tech Stack

### 🎨 Frontend
- React.js  
- Tailwind CSS  

### ⚙️ Backend
- Node.js  
- Express.js  

### 🗄️ Database
- MongoDB Atlas  
- Mongoose ODM  

### 💳 Payments
- Razorpay  

### 📧 Email Service
- Resend  

### 🚄 Deployment
- Railway  

---

## 🔄 System Workflow

### 🧠 User Flow
1. User explores artists & services  
2. Selects workshop slot  
3. Enters details  
4. Initiates payment  

### ⚡ Backend Flow
1. Webhook triggered  
2. Payment verified  
3. Registration → PAID  
4. Seat allocated atomically  
5. Final state:
   - ✅ CONFIRMED  
   - ❌ CANCELLED (if full)  
6. Email sent  



📸 Screenshots


🏠 Landing Page

<img width="1913" height="981" alt="image" src="https://github.com/user-attachments/assets/6be46576-cd9e-4cb5-9f4c-926bf6d08ff0" />

🎭 Artists Section

<img width="1902" height="974" alt="image" src="https://github.com/user-attachments/assets/9d56f08c-b82c-4870-a678-5042184ff456" />


🛠️ Services Section

<img width="1897" height="990" alt="image" src="https://github.com/user-attachments/assets/fa8557f3-5eb4-452c-93f9-eaf0db79aa02" />

🎟️ Workshop Booking
<img width="1904" height="996" alt="image" src="https://github.com/user-attachments/assets/b4575f82-a3cf-4d20-a74a-00407b1175e2" />


🛠️ Deployments Logs

<img width="1600" height="805" alt="image" src="https://github.com/user-attachments/assets/805545ca-470f-4c91-977c-ba065a0abed0" />



1️⃣ Clone Repository
git clone https://github.com/kuruet/CCC.git
cd CCC
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

MONGO_URI=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RESEND_API_KEY=
PORT=8080

Run server:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🚨 Production Engineering Highlights
💰 Real payment handling
🔁 Idempotent webhook system
⚡ Atomic DB operations
🧠 State-machine driven logic
🛡️ Race-condition safe
🧪 Edge Cases Handled
Concurrent last-seat booking
Duplicate webhooks
Payment retries
Seat full after payment
Network interruptions
Email failures
🎯 Key Learnings
Idempotent system design
Webhook-based architectures
Race condition handling
Payment system design
Backend state management
👨‍💻 Author

Built with ❤️ by Kuruet

⭐ Support

If you like this project:

⭐ Star this repo
🍴 Fork it
💬 Share feedback
