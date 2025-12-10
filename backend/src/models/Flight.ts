export type FlightDirection = "arrival" | "departure";

export interface Flight {
  id: string;
  direction: FlightDirection;
  airline: string;
  callsign: string;
  origin: string;
  destination: string;
  scheduledTime: string; // ISO or "HH:mm" – frontend just displays
  status: string;        // e.g. "Scheduled", "Landed", "Boarding"
  checkInDesk?: string;  // optional – used for check-in view
}
