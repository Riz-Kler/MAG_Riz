import { Router } from "express";
import {
  getArrivals,
  getDepartures,
  getCheckInView
} from "../services/flights/flightService_bak";

const router = Router();

// GET /api/flights/live  -> { arrivals, departures }
router.get("/live", async (_req, res, next) => {
  try {
    const [arrivals, departures] = await Promise.all([
      getArrivals(),
      getDepartures()
    ]);

    res.json({ arrivals, departures });
  } catch (err) {
    next(err);
  }
});

router.get("/arrivals", async (_req, res, next) => {
  try {
    const arrivals = await getArrivals();
    res.json(arrivals);
  } catch (err) {
    next(err);
  }
});

router.get("/departures", async (_req, res, next) => {
  try {
    const departures = await getDepartures();
    res.json(departures);
  } catch (err) {
    next(err);
  }
});

router.get("/checkin", async (_req, res, next) => {
  try {
    const items = await getCheckInView();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

export default router;
