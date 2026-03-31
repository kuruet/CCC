🎨 Caricature Workshop Platform (CCC)

A production-grade full-stack platform built to showcase caricature artists, highlight their services, and manage paid workshop registrations with secure payments, atomic seat allocation, and automated workflows.

🌐 Product Overview

This platform is not just a registration system — it’s a complete digital presence for caricature artists, designed to:

🎭 Showcase artists and their unique styles
🛠️ Highlight services offered (live caricature, events, commissions)
🎟️ Manage workshop registrations (March 14–15 event)
💳 Handle real-time payments securely
⚡ Allocate seats without race conditions
📧 Automate confirmations and communication
🧩 Platform Sections (Frontend Experience)
🎭 Artists Showcase
Dedicated section to present caricature artists
Highlights:
Artistic styles
Experience
Portfolio presence
🛠️ Services Offered
Clearly structured service offerings:
Event caricature 🎉
Live sketching ✍️
Custom commissions 🖼️
Helps convert visitors → customers
🎟️ Workshop Module
Core conversion engine of the platform
Features:
Multi-slot booking (SLOT_1, SLOT_2)
Limited seat management
Real-time availability tracking
🚀 Core Features
🎟️ Smart Workshop Registration
Structured user onboarding:
Name
Email
Phone
Slot-based booking system
Real-time seat tracking
💳 Secure Payment Integration
Integrated with Razorpay
Backend-driven order creation
Webhook-based payment verification (frontend is not trusted)

Handles:

✅ Successful payments
❌ Failures
🔁 Retries
⚡ Atomic Seat Allocation (Race-Condition Safe)
Built using MongoDB atomic operations
Guarantees:
No overbooking
Safe concurrent bookings
Last-seat conflict handling
🔁 State Machine Driven Backend

Strict, controlled transitions ensure consistency:

Registration Lifecycle
CREATED → PAYMENT_INIT → PAID → CONFIRMED
                     ↘ FAILED / CANCELLED
Payment Lifecycle
CREATED → INITIATED → PAID / FAILED / REFUNDED

✔ Prevents invalid states
✔ Ensures predictable system behavior

📡 Webhook-First Architecture
Payment confirmation handled ONLY via Razorpay webhook
Frontend cannot mark payment as successful
Fully idempotent + retry-safe design
📧 Automated Email System
Powered by Resend
Sends confirmation after successful booking
Retry-safe delivery
🛠️ Admin Dashboard
Full system visibility:
Registrations
Payments
Seat usage
Helps in real-time monitoring of live system
🔐 Production-Grade Safety
Idempotent operations
Strict validation
No direct DB manipulation required
Backend = single source of truth
🏗️ Tech Stack
🎨 Frontend
React.js ⚛️
Tailwind CSS 🎨
⚙️ Backend
Node.js
Express.js
🗄️ Database
MongoDB Atlas 🍃
Mongoose ODM
💳 Payments
Razorpay
📧 Email Service
Resend
🚄 Deployment
Railway
📂 Project Structure
CCC/
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic (core system)
│   │   ├── routes/          # API routes
│   │   ├── models/          # Mongoose schemas
│   │   ├── middlewares/     # Auth & validations
│   │   └── utils/           # Helpers
│   │
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Route-level UI
│   │   ├── components/      # Reusable UI
│   │   ├── services/        # API layer
│   │   └── utils/
│   │
│   └── public/
│
└── README.md
🔄 System Workflow
🧠 User Flow
User explores artists & services
Selects workshop slot
Fills registration details
Initiates payment
⚡ Backend Flow (Critical Path)
Razorpay webhook triggered
Payment verified
Registration → PAID
Atomic seat allocation
Final state:
✅ CONFIRMED
❌ CANCELLED (if full)
Confirmation email sent
🗄️ Database Design
Workshop
{
  title,
  price,
  date,
  slots: {
    SLOT_1: { confirmed: Number },
    SLOT_2: { confirmed: Number }
  }
}
Registration
{
  userId,
  workshopId,
  slot,
  name,
  email,
  phone,
  paymentId,
  status,
  confirmationSent,
  lastStateTransitionAt
}
Payment
{
  razorpay_order_id,
  razorpay_payment_id,
  amount,
  currency,
  status,
  slot,
  email,
  phone,
  workshopId,
  userId
}
📸 Screenshots

Add visuals here to improve understanding 👇

🏠 Landing Page

[ Add Screenshot Here ]

🎭 Artists Section

[ Add Screenshot Here ]

🛠️ Services Section

[ Add Screenshot Here ]

🎟️ Workshop Booking

[ Add Screenshot Here ]

💳 Payment Flow

[ Add Screenshot Here ]

🛠️ Admin Dashboard

[ Add Screenshot Here ]

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/kuruet/CCC.git
cd CCC
2️⃣ Backend Setup
cd backend
npm install

Create .env:

MONGO_URI=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RESEND_API_KEY=
PORT=8080

Run:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🚨 Production Engineering Highlights

This system is built with real-world constraints in mind:

💰 Handles real payments
🔁 Idempotent webhook processing
⚡ Atomic DB operations
🧠 State-machine driven backend
🛡️ Race-condition safe
🧪 Edge Cases Covered
Concurrent last-seat booking
Duplicate webhook delivery
Payment retry flows
Seat full after payment
Network interruptions
Email failures
🎯 Key Learnings
Designing idempotent systems
Building webhook-first architectures
Preventing race conditions
Managing state machines in backend systems
Handling real-world payment flows
👨‍💻 Author

Built with ❤️ by Kuruet

⭐ Support

If this project helped or inspired you:

⭐ Star the repo
🍴 Fork it
💬 Share feedback
