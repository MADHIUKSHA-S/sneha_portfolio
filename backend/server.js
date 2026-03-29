require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { initDB } = require("./db");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ── API Routes ──
app.use("/api/contact", contactRoutes);

// ── Health Check ──
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Serve Frontend (production) ──
// In production on Render, the backend serves the frontend files too
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Catch-all: serve index.html for any non-API route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// ── Start Server ──
async function start() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Frontend served from ./frontend`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/contact\n`);
  });
}

start();
