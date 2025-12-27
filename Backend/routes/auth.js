import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();

/**
 * POST /auth/signup
 */
router.post("/signup", async (req, res) => {
  try {
    const { prn, name, email, password } = req.body;

    if (!prn || !name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    if (prn.length !== 10) {
      return res.status(400).json({ error: "PRN must be 10 digits" });
    }

    // check existing PRN/email
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE prn = ? OR email = ?",
      [prn, email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (prn, name, email, password_hash)
       VALUES (?, ?, ?, ?)`,
      [prn, name, email, password_hash]
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Log In

router.post("/login", async (req, res) => {
  try {
    const { prn, password } = req.body;

    if (!prn || !password) {
      return res.status(400).json({ error: "PRN and password required" });
    }

    const [rows] = await pool.query(
      "SELECT id, password_hash, role FROM users WHERE prn = ?",
      [prn]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        prn,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
