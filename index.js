require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Enable JSON body parsing

// ✅ GET client account info by client_id
app.get("/api/account/:client_id", async (req, res) => {
  const client_id = req.params.client_id?.trim() ?? null;

  if (!client_id) {
    return res.status(400).json({ error: "Missing client_id" });
  }

  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    const [rows] = await conn.execute(
      "SELECT * FROM booklisting WHERE client_id = ?",
      [client_id]
    );

    await conn.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ DB error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST phone number validation
app.post("/validate", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const isValid = /^\+254\d{9}$/.test(phone); // Example: +254712345678

  if (!isValid) {
    return res.status(400).json({
      valid: false,
      error: "Invalid phone number format. Use +254XXXXXXXXX",
    });
  }

  res.json({ valid: true, message: "Phone number is valid" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ phone_validate_api running on http://localhost:${PORT}`);
});
