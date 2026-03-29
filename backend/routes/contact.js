const express = require("express");
const router = express.Router();
const { pool } = require("../db");

// POST /api/contact — Save a new message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email." });
    }

    // Insert into DB
    await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name.trim(), email.trim(), message.trim()]
    );

    res.status(201).json({ success: true, message: "Message received!" });
  } catch (err) {
    console.error("Contact form error:", err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// GET /api/contact — Retrieve all messages (for admin/future use)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch messages error:", err.message);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

module.exports = router;
