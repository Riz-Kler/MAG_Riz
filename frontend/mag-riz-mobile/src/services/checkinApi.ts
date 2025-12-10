const API_BASE = "http://localhost:4000/api";

export async function getAvailableReservations() {
    const res = await fetch(`${API_BASE}/reservations`);

    if (!res.ok) {
        throw new Error("Failed to fetch reservations");
    }

    return await res.json();
}

export async function createReservation(payload: {
    passenger_name: string;
    flight_id: string;
    seat: string;
}) {
    const res = await fetch(`${API_BASE}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create reservation");
    }

    return await res.json();
}
