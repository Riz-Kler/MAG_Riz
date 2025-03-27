import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/live", async (_req, res) => {
  try {
    const response = await fetch("https://opensky-network.org/api/states/all");
    const data = await response.json();

    const manchesterICAO = "EGCC";

    const arrivals = data.states.filter((f: any) => f[14] === manchesterICAO);
    const departures = data.states.filter((f: any) => f[13] === manchesterICAO);

    res.json({
      timestamp: data.time,
      arrivals,
      departures,
      total: data.states.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching flight data");
  }
});

export default router;
