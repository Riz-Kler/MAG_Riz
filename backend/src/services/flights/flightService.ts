import { getMockFlights } from "./mockFlightService";
import { Flight } from "../../models/Flight";

/**
 * Public service used by the routes.
 * Right now we only use the mock data source.
 */
export async function getFlights(
  direction?: "arrival" | "departure",
): Promise<Flight[]> {
  return getMockFlights(direction);
}
