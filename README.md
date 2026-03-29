# Sneha Blessy — Portfolio Website

A full-stack portfolio with a **dark glassmorphism** design, **Node.js/Express** backend, and **PostgreSQL** database for contact form submissions.

## Tech Stack

| Layer    | Tech                         |
|----------|------------------------------|
| Frontend | HTML5, CSS3, JavaScript      |
| Backend  | Node.js, Express.js          |
| Database | PostgreSQL                   |
| Hosting  | Render (Web Service + DB)    |

## Local Development

### 1. Clone & Install

```bash
git clone https://github.com/snehablessy-developer/sneha-portfolio.git
cd sneha-portfolio
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your PostgreSQL connection string
```

### 3. Run

```bash
npm run dev
```

Open **http://localhost:5000** — the backend serves the frontend too.

## Deploy to Render

### Option A: Blueprint (Recommended)

1. Push to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. **New → Blueprint** → connect your repo
4. Render reads `render.yaml` and creates everything automatically

### Option B: Manual

1. **Create PostgreSQL** database on Render → copy the connection string
2. **Create Web Service** → connect your repo:
   - **Build Command:** `npm install`
   - **Start Command:** `node backend/server.js`
   - **Environment Variable:** `DATABASE_URL` = your connection string

## API Endpoints

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| POST   | `/api/contact`  | Submit contact form   |
| GET    | `/api/contact`  | List all messages     |
| GET    | `/api/health`   | Health check          |

## Project Structure

```
sneha_portfolio/
├── frontend/
│   ├── index.html      ← Portfolio page
│   ├── style.css       ← Dark glassmorphism theme
│   └── script.js       ← Animations & form logic
├── backend/
│   ├── server.js       ← Express server
│   ├── db.js           ← PostgreSQL connection
│   └── routes/
│       └── contact.js  ← Contact API
├── package.json
├── render.yaml         ← Render Blueprint
├── .env.example
└── README.md
```

---

Built with ❤️ by **Sneha Blessy**
