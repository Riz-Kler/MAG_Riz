import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM passengers");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /passengers failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { name, flight_number, gate, destination } = req.body;

  if (!name || !flight_number || !gate || !destination) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO passengers (name, flight_number, gate, destination) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, flight_number, gate, destination]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /passengers failed:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

export default router;
