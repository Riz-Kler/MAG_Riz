import { useEffect, useState } from "react";
import "./App.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

type SeatType = "Window" | "Middle" | "Aisle";
type Theme = "festive" | "classic";

interface Reservation {
  id: number;
  passenger_name: string;
  flight_id: string;
  seat: SeatType;
  created_at: string;
}

const FLIGHTS = [
  "MAN1001",
  "MAN1002",
  "MAN1003",
  "MAN2001",
  "MAN2002",
  "MAN2003",
  "MAN2004",
];

const PASSENGERS = [
  "Riz Kler",
  "Alice Jones",
  "Eve Smith",
  "Tom Harris",
  "Sara Patel",
  "Liam Brown",
  "Olivia Shaw",
  "Noah Clarke",
  "Emma Wilson",
  "Jack Turner",
  "Mia Robinson",
  "Ava Khan",
  "Lucas Carter",
  "Isla Murphy",
  "Ethan Lewis",
  "Leo Ahmed",
  "Zara Ali",
  "Hannah Green",
  "Owen Hughes",
  "Sophie Ward",
];

const SEATS: SeatType[] = ["Window", "Middle", "Aisle"];

function App() {
  // THEME (new – purely visual)
  const [theme, setTheme] = useState<Theme>("festive");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // CHECK-IN STATE (unchanged)
  const [flightId, setFlightId] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [seat, setSeat] = useState<SeatType>("Window");

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
    <div style={styles.appShell}>
      {/* snow + glow sits behind content, controlled by data-theme in CSS */}

      <div style={styles.appHeader}>
        <div style={styles.brandBadge}>✈ MAG RIZ • T3</div>

        <div style={styles.headerTextBlock}>
          <h1 style={styles.title}>
            Mobile Check-In{" "}
            {theme === "festive" ? <span aria-hidden>🎄</span> : null}
          </h1>
          <p style={styles.subtitle}>
            Festive demo — select your flight, passenger and seat.
          </p>
        </div>

        <button
          type="button"
          style={styles.themeToggle}
          onClick={() =>
            setTheme((prev) => (prev === "festive" ? "classic" : "festive"))
          }
        >
          <span
            style={{
              opacity: theme === "festive" ? 1 : 0.35,
              transform: "translateY(1px)",
            }}
          >
            🎄
          </span>
          <span
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {theme === "festive" ? "Festive" : "Classic"}
          </span>
        </button>
      </div>

      <main style={styles.main}>
        {/* Check-in card */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Check-In</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Flight dropdown */}
            <label style={styles.label}>Flight</label>
            <select
              style={styles.input}
              value={flightId}
              onChange={(e) => {
                setFlightId(e.target.value);
                setSeat(""); // reset seat on flight change
              }}
            >
              <option value="">Select a flight</option>
              {FLIGHTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {/* Passenger dropdown */}
            <label style={styles.label}>Passenger</label>
            <select
              style={styles.input}
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              disabled={availablePassengers.length === 0}
            >
              <option value="">
                {availablePassengers.length === 0
                  ? "All demo passengers checked in"
                  : "Select a passenger"}
              </option>
              {availablePassengers.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Seat dropdown – existing logic, unchanged */}
            <label style={styles.label}>Seat</label>
            <select
              style={styles.input}
              value={seat}
              onChange={(e) => setSeat(e.target.value as SeatType)}
              disabled={!flightId || availableSeatsForFlight.length === 0}
            >
              {!flightId ? (
                <option value="">Select a seat</option>
              ) : availableSeatsForFlight.length === 0 ? (
                <option value="">No seats available</option>
              ) : (
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

            <button style={styles.primaryButton} disabled={loading}>
              {loading ? "Checking in..." : "Check In"}
            </button>
          </form>

          {message && (
            <div style={styles.successBox}>
              <h3 style={styles.feedbackTitle}>Success</h3>
              <p style={styles.feedbackText}>{message}</p>
            </div>
          )}

          {error && (
            <div style={styles.errorBox}>
              <h3 style={styles.feedbackTitle}>Error</h3>
              <p style={styles.feedbackText}>{error}</p>
            </div>
          )}
        </section>

        {/* Reservation list card */}
        <section style={styles.card}>
          <div style={styles.cardHeaderRow}>
            <h2 style={styles.cardTitle}>Current Check-Ins</h2>
            {allTestPassengersCheckedIn && (
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={handleReset}
                disabled={loading}
              >
                Reset demo
              </button>
            )}
          </div>

          {reservations.length === 0 ? (
            <p style={styles.emptyState}>
              No check-ins yet. Start by selecting a flight and passenger.
            </p>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Flight</th>
                    <th>Passenger</th>
                    <th>Seat</th>
                    <th>Checked In</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id}>
                      <td>{r.flight_id}</td>
                      <td>{r.passenger_name}</td>
                      <td>{r.seat}</td>
                      <td>{new Date(r.created_at).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  appShell: {
    minHeight: "100vh",
    margin: 0,
    padding: "16px",
    background:
      "radial-gradient(circle at top, #1d4ed8 0, #020617 45%, #000 100%)",
    color: "#f9fafb",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    display: "flex",
    flexDirection: "column",
    maxWidth: 520,
    width: "100%",
    borderRadius: 32,
    boxShadow: "0 32px 60px rgba(0,0,0,0.85)",
    border: "1px solid rgba(148,163,184,0.4)",
  },
  appHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  brandBadge: {
    padding: "10px 14px",
    borderRadius: "999px",
    background: "rgba(15,23,42,0.9)",
    border: "1px solid rgba(148,163,184,0.6)",
    fontSize: "13px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  headerTextBlock: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontSize: "22px",
    margin: 0,
    fontWeight: 600,
  },
  subtitle: {
    margin: 0,
    marginTop: "2px",
    fontSize: "13px",
    color: "#cbd5f5",
  },
  themeToggle: {
    marginLeft: "auto",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.8)",
    background: "rgba(15,23,42,0.95)",
    color: "#f9fafb",
    padding: "4px 10px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "8px",
  },
  card: {
    background: "rgba(15,23,42,0.96)",
    borderRadius: "18px",
    padding: "16px 16px 18px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.75)",
    border: "1px solid rgba(148,163,184,0.35)",
    backdropFilter: "blur(12px)",
  },
  cardTitle: {
    margin: 0,
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: 600,
  },
  cardHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "4px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#e5e7eb",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(55,65,81,0.9)",
    fontSize: "14px",
    backgroundColor: "rgba(15,23,42,0.95)",
    color: "#f9fafb",
    outline: "none",
    width: "100%",
  },
  primaryButton: {
    padding: "11px 14px",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #22c55e 0%, #f97316 40%, #ef4444 100%)",
    color: "#f9fafb",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "6px",
    boxShadow: "0 12px 25px rgba(248,113,113,0.35)",
  },
  secondaryButton: {
    padding: "7px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.8)",
    background: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    fontSize: "13px",
    cursor: "pointer",
  },
  successBox: {
    background: "rgba(22,163,74,0.15)",
    border: "1px solid rgba(34,197,94,0.6)",
    padding: "10px 12px",
    borderRadius: "12px",
    marginTop: "10px",
  },
  errorBox: {
    background: "rgba(127,29,29,0.25)",
    border: "1px solid rgba(248,113,113,0.7)",
    padding: "10px 12px",
    borderRadius: "12px",
    marginTop: "10px",
  },
  feedbackTitle: {
    margin: 0,
    marginBottom: "4px",
    fontSize: "13px",
    fontWeight: 600,
  },
  feedbackText: {
    margin: 0,
    fontSize: "13px",
  },
  tableWrapper: {
    overflowX: "auto",
    marginTop: "6px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  emptyState: {
    fontSize: "13px",
    color: "#9ca3af",
    marginTop: "6px",
  },
};

export default App;
