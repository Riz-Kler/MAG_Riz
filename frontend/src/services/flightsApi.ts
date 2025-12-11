const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

export interface Flight {
  id: string;
  direction: "arrival" | "departure";
  airline: string;
  callsign: string;
  origin: string;
  destination: string;
  scheduledTime: string; // ISO string
  status: string;
  checkInDesk?: string; // departures only
}

async function fetchJson(url: string): Promise<Flight[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch flights (${res.status})`);
  }
  return res.json();
}

export function fetchArrivals(): Promise<Flight[]> {
  return fetchJson(`${API_BASE}/api/flights?direction=arrival`);
}

export function fetchDepartures(): Promise<Flight[]> {
  return fetchJson(`${API_BASE}/api/flights?direction=departure`);
}
