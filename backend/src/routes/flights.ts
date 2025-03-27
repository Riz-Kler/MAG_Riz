import express from "express";
import axios from "axios";
const router = express.Router();
console.log("✅ flights.ts loaded");
console.log("✅ /api/flights router is active");

router.get("/live", async (_req, res) => {
  console.log("🛬 /api/flights/live was hit");
  try {
    const response = await axios.get(
      "https://opensky-network.org/api/states/all"
    );
    res.json({
      timestamp: response.data.time,
      total: response.data.states.length,
      flights: response.data.states.slice(0, 10) // show top 10
    });
  } catch (err) {
    console.error("OpenSky API error:", err);
    res.status(500).json({ error: "Failed to fetch live flight data" });
  }
});

export default router;
