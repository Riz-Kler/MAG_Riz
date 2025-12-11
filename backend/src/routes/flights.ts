import { Router } from "express";
import { getFlights } from "../services/flights/flightService";

const router = Router();

/**
 * GET /api/flights?direction=arrival|departure
 */
router.get("/", async (req, res) => {
  try {
    const direction = req.query.direction as "arrival" | "departure" | undefined;
    const flights = await getFlights(direction);
    res.json(flights);
  } catch (err) {
    console.error("Error in /api/flights:", err);
    res.status(500).json({ error: "Failed to load flights" });
  }
});

export default router;
