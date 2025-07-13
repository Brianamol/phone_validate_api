require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`✅ phone_validate_api running on http://localhost:${PORT}`);
});
