import { Pool } from "pg";
import { Reservation, SeatType } from "../../models/Reservation";
import  pool from "../../db"; // adjust if export is named differently

export async function getReservations(
  db: Pool = pool
): Promise<Reservation[]> {
  const result = await db.query<Reservation>(
    `SELECT id, passenger_name, flight_id, seat, created_at
     FROM reservations
     ORDER BY created_at ASC`
  );
  return result.rows;
}

export interface CreateReservationInput {
  passenger_name: string;
  flight_id: string;
  seat: SeatType;
}

export async function createReservation(
  input: CreateReservationInput,
  db: Pool = pool
): Promise<Reservation> {
  const result = await db.query<Reservation>(
    `INSERT INTO reservations (passenger_name, flight_id, seat)
     VALUES ($1, $2, $3)
     RETURNING id, passenger_name, flight_id, seat, created_at`,
    [input.passenger_name, input.flight_id, input.seat]
  )
  return result.rows[0];
}
  // reset button
export async function resetReservations(): Promise<void> {
  await pool.query("TRUNCATE TABLE reservations RESTART IDENTITY;");
};

