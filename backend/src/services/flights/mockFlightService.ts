import flightsData from "../../data/mockFlights.json";
import { Flight } from "../../models/Flight";

const flights = flightsData as Flight[];

/**
 * Return all flights, optionally filtered by direction.
 * No date filtering – frontend gets the full dataset.
 */
export async function getMockFlights(direction?: "arrival" | "departure") {
  if (!direction) return flights;
  return flights.filter((f) => f.direction === direction);
}
