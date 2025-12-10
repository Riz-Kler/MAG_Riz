import axios from "axios";

export async function getManchesterFlights() {
  const res = await axios.get("/api/flights/live");
  return res.data; // { arrivals, departures }
}
