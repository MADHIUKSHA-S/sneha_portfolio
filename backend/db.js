const { Pool } = require("pg");

// Create connection pool from DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("render.com")
    ? { rejectUnauthorized: false }
    : false,
});

// Auto-create messages table on startup
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Database connected & messages table ready");
  } catch (err) {
    console.error("⚠️  Database connection failed:", err.message);
    console.log("   The server will still run — form submissions will fail until DB is configured.");
  }
}

module.exports = { pool, initDB };
