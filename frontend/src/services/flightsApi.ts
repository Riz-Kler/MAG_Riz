import axios from "axios";

const api = axios.create({
  baseURL: "/api", // assuming backend is proxied or same origin
});

export async function fetchArrivals() {
  const res = await api.get("/flights/arrivals");
  return res.data;
}

export async function fetchDepartures() {
  const res = await api.get("/flights/departures");
  return res.data;
}

export async function fetchCheckInView() {
  const res = await api.get("/flights/checkin");
  return res.data;
}
