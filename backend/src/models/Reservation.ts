export type SeatType = "Window" | "Middle" | "Aisle";

export interface Reservation {
  id: number;
  passenger_name: string;
  flight_id: string;
  seat: SeatType;
  created_at: string; // ISO string from DB
}
