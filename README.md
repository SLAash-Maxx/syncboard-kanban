# SyncBoard - Real-Time Collaborative Kanban Board

SyncBoard is a full-stack real-time collaborative task management and Kanban board web application. It features a React (Vite) client interface and a modular Node.js/Express RESTful backend architecture.

---

## ⚠️ Important Note: Authentication Status

> **Login Functionality Currently Disabled:**
> - **Sign Up (Register):** Implemented and functional for creating test user accounts.
> - **Login:** Currently **not functional** because persistent database storage is not yet connected. Registered users are stored in temporary runtime memory and session verification requires the database layer, which is actively under development.

---

## 📌 Features & Overview

- **Frontend Interface:** Responsive Kanban layout with columns, task modal, filtering, and authentication screens (`LoginPage`, `RegisterPage`).
- **Backend Architecture:** Express.js REST API with controllers, route definitions, error handling, and JWT middleware structure.
- **State & Context:** Client-side routing with `AuthContext` and protected routes[cite: 1].

---

## 🛠️ Tech Stack

### Client (syncboard-client)
- **Framework:** React (Vite)[cite: 1]
- **Routing & State:** React Context API (`AuthContext`), Protected Routes[cite: 1]
- **Styling:** Custom CSS[cite: 1]
- **API Services:** Modular API client (`authApi.js`, `taskApi.js`)[cite: 1]

### Server (syncboard-server)
- **Runtime & Framework:** Node.js, Express.js[cite: 1]
- **Authentication:** JSON Web Tokens (JWT), Custom Middleware[cite: 1]
- **Structure:** MVC (Controllers, Models, Routes, Middleware, Config, Utils)[cite: 1]
- **Dev Tools:** Nodemon[cite: 1]

---

## 📁 Repository Structure

```text
syncboard-kanban/
├── syncboard-client/           # React + Vite Frontend
│   ├── src/
│   │   ├── api/                # API service handlers
│   │   ├── assets/             # Icons & media
│   │   ├── components/         # Kanban Columns, Modals, Cards, Header
│   │   ├── context/            # AuthContext
│   │   ├── pages/              # Login and Register pages
│   │   ├── App.jsx             # Main layout & router
│   │   └── main.jsx            # Entry point
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── syncboard-server/           # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # Configuration & environments
│   │   ├── controllers/        # Auth & Task business logic
│   │   ├── middleware/         # JWT verification & Error handlers
│   │   ├── models/             # User and Task models
│   │   ├── routes/             # Express route endpoints
│   │   ├── utils/              # Async handlers and JWT helpers
│   │   └── app.js              # Express app pipeline
│   ├── server.js               # Entry point
│   ├── .env.example
│   └── package.json
│
├── API_CONTRACT.md             # API specifications
└── README.md
