import { Flight } from "../../models/Flight";

// TODO: implement real OpenSky integration.
// For now this is a placeholder so the selector compiles.

export async function getArrivals(): Promise<Flight[]> {
  throw new Error("OpenSky integration not implemented yet");
}

export async function getDepartures(): Promise<Flight[]> {
  throw new Error("OpenSky integration not implemented yet");
}

export async function getCheckInView() {
  throw new Error("OpenSky integration not implemented yet");
}
