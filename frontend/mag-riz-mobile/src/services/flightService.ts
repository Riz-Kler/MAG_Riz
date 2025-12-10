import axios from "axios";

// Read from Vite env, fall back to localhost:4000 if missing
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

// All flights endpoints live under /api/flights
const API = `${API_BASE}/api/flights`;

export async function getArrivals() {
  const res = await axios.get(`${API}/arrivals`);
  return res.data;
}

export async function getDepartures() {
  const res = await axios.get(`${API}/departures`);
  return res.data;
}

// This hits your backend GET /api/flights/checkin
export async function getCheckInView() {
  const res = await axios.get(`${API}/checkin`);
  return res.data;
}
