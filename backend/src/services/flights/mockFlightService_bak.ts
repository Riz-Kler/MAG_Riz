import flightsData from "../../data/mockFlights.json";
import { Flight } from "../../models/Flight";

const flights: Flight[] = flightsData as Flight[];

export async function getArrivals(): Promise<Flight[]> {
  return flights.filter(f => f.direction === "arrival");
}

export async function getDepartures(): Promise<Flight[]> {
  return flights.filter(f => f.direction === "departure");
}

// This is a “view model” specialised for check-in.
export interface CheckInViewItem {
  id: string;
  airline: string;
  callsign: string;
  destination: string;
  scheduledTime: string;
  checkInDesk: string;
  status: string;
}

export async function getCheckInView(): Promise<CheckInViewItem[]> {
  return flights
    .filter(f => f.direction === "departure")
    .map(f => ({
      id: f.id,
      airline: f.airline,
      callsign: f.callsign,
      destination: f.destination,
      scheduledTime: f.scheduledTime,
      checkInDesk: f.checkInDesk ?? "TBC",
      status: f.status
    }));
}
