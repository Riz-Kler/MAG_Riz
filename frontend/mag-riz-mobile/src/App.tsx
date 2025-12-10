import { useEffect, useState } from "react";
import "./App.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

type SeatType = "Window" | "Middle" | "Aisle";

interface Reservation {
  id: number;
  passenger_name: string;
  flight_id: string;
  seat: SeatType;
  created_at: string;
}

const FLIGHTS = ["MAN1001", "MAN1002", "MAN1003"];
const PASSENGERS = ["Riz Kler", "Alice Jones", "Eve Smith"];
const SEATS: SeatType[] = ["Window", "Middle", "Aisle"];

function App() {
  const [flightId, setFlightId] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [seat, setSeat] = useState<SeatType | "">("");

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function loadReservations() {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/api/reservations`);
      if (!res.ok) throw new Error("Failed to load reservations");
      const data: Reservation[] = await res.json();
      setReservations(data);
    } catch (err: any) {
      setError(err.message || "Failed to load reservations");
    }
  }

  useEffect(() => {
    loadReservations();
  }, []);

  // Passengers who haven't checked in yet (any flight)
  const availablePassengers = PASSENGERS.filter(
    (p) => !reservations.some((r) => r.passenger_name === p),
  );

  // Seats still free for the selected flight
  const availableSeatsForFlight = flightId
    ? SEATS.filter(
        (s) =>
          !reservations.some(
            (r) => r.flight_id === flightId && r.seat === s,
          ),
      )
    : SEATS;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!flightId || !passengerName || !seat) {
        throw new Error("Please select flight, passenger and seat");
      }

     const res = await fetch(`${API_BASE}/api/reservations`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    passenger_name: passengerName,
    flight_id: flightId,
    seat: seat,
  }),
});

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Backend error: ${res.status}`);
      }

      const created: Reservation = await res.json();
      setReservations((prev) => [...prev, created]);
      setMessage(
        `Checked in ${created.passenger_name} on ${created.flight_id} (${created.seat})`,
      );

      // Clear selections for the next user
      setFlightId("");
      setPassengerName("");
      setSeat("Window");
    } catch (err: any) {
      setError(err.message || "Failed to create check-in");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const res = await fetch(`${API_BASE}/api/reservations/reset`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to reset reservations");

      setReservations([]);
      setFlightId("");
      setPassengerName("");
      setSeat("Window");
      setMessage("Test data reset — you can check in again.");
    } catch (err: any) {
      setError(err.message || "Failed to reset reservations");
    } finally {
      setLoading(false);
    }
  }

  const allTestPassengersCheckedIn =
    reservations.length >= PASSENGERS.length;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>MAG Riz — Mobile Check-In</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Flight dropdown */}
        <label style={styles.label}>Flight ID</label>
        <select
          style={styles.input}
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
        >
          <option value="">Select a flight</option>
          {FLIGHTS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        {/* Passenger dropdown */}
        <label style={styles.label}>Passenger Name</label>
        <select
          style={styles.input}
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
          disabled={availablePassengers.length === 0}
        >
          <option value="">Select a passenger</option>
          {availablePassengers.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* Seat dropdown */}
        <label style={styles.label}>Seat Preference</label>
        <select
  style={styles.input}
  value={seat}
  onChange={(e) => setSeat(e.target.value as SeatType)}
  disabled={!flightId || availableSeatsForFlight.length === 0}
>
  {!flightId ? (
    // No flight selected yet
    <option value="">Select a seat</option>
  ) : availableSeatsForFlight.length === 0 ? (
    // Flight selected but no seats left
    <option value="">No seats available</option>
  ) : (
    // Flight selected and seats available
    <>
      <option value="">Select a seat</option>
      {availableSeatsForFlight.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </>
  )}
</select>


        <button style={styles.button} disabled={loading}>
          {loading ? "Checking in..." : "Check In"}
        </button>
      </form>

      {/* Status messages */}
      {message && (
        <div style={styles.successBox}>
          <h3>Success</h3>
          <p>{message}</p>
        </div>
      )}

      {error && (
        <div style={styles.errorBox}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Reservation table */}
      {reservations.length > 0 && (
        <div style={styles.tableWrapper}>
          <h3>Current Check-Ins</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Flight</th>
                <th>Passenger</th>
                <th>Seat</th>
                <th>Checked In At</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.flight_id}</td>
                  <td>{r.passenger_name}</td>
                  <td>{r.seat}</td>
                  <td>{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reset button after all 3 have checked in */}
      {allTestPassengersCheckedIn && (
        <button
          style={{ ...styles.button, marginTop: "16px", background: "#666" }}
          type="button"
          onClick={handleReset}
          disabled={loading}
        >
          Reset Test Check-Ins
        </button>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "20px",
    maxWidth: "480px",
    margin: "0 auto",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontWeight: 600,
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #555",
    fontSize: "16px",
    backgroundColor: "#111",
    color: "#fff",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#0070f3",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
  },
  successBox: {
    background: "#173b2c",
    border: "1px solid #25a56a",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "16px",
  },
  errorBox: {
    background: "#3b1111",
    border: "1px solid #ff9999",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "16px",
  },
  tableWrapper: {
    marginTop: "24px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default App;
