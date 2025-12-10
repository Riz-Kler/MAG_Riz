import { Router } from "express";
import {
  getReservations,
  createReservation,
  resetReservations,
} from "../services/checkin/reservationService";

const router = Router();

/**
 * GET /api/reservations
 * Returns all reservations
 */
router.get("/", async (_req, res, next) => {
  try {
    const reservations = await getReservations();
    res.json(reservations);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/reservations
 * Body: { passenger_name, flight_id, seat }
 */
router.post("/", async (req, res, next) => {
  try {
    const { passenger_name, flight_id, seat } = req.body;

    if (!passenger_name || !flight_id || !seat) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const reservation = await createReservation({
        passenger_name,
        flight_id,
        seat,
      });

      res.status(201).json(reservation);
    } catch (err: any) {
      // Unique constraint violations
      if (err.code === "23505") {
        // Postgres unique_violation
        if (err.constraint === "uq_res_flight_seat") {
          return res.status(409).json({
            message: `Seat ${seat} on flight ${flight_id} is already taken`,
          });
        }
        if (err.constraint === "uq_res_passenger") {
          return res.status(409).json({
            message: `${passenger_name} has already checked in to a flight`,
          });
        }
      }

      throw err;
    }
  } catch (err) {
    next(err);
  }
});

router.post("/reset", async (_req, res) => {
  try {
    await resetReservations();
    res.json({ message: "Reservations reset" });
  } catch (err: any) {
    console.error("Error resetting reservations", err);
    res.status(500).json({ message: "Failed to reset reservations" });
  }
});

export default router;
