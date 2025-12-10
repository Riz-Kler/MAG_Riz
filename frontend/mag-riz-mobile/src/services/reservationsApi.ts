const API_BASE = "http://localhost:4000/api";

export async function getReservations() {
    const res = await fetch(`${API_BASE}/reservations`);
    if (!res.ok) {
        throw new Error("Failed to load reservations");
    }
    return await res.json();
}
