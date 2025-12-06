import { useState } from "react";
import "./App.css";

function App() {
  const [flightId, setFlightId] = useState("");
  const [name, setName] = useState("");
  const [seat, setSeat] = useState("Aisle");
  const [loading, setLoading] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiBase = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReservationId(null);

    try {
      const res = await fetch(`${apiBase}/reservations`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flightId,
          passengerName: name,
          seatPreference: seat,
        }),
      });

      if (res.status === 401 || res.status === 302) {
        // ALB OIDC will redirect the browser to login automatically
        window.location.href = res.url;
        return;
      }

      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }

      const data = await res.json();
      setReservationId(data.reservationId);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>MAG Riz — Mobile Check-In</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Flight ID</label>
        <input
          style={styles.input}
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
          placeholder="e.g., MAN1002"
          required
        />

        <label style={styles.label}>Passenger Name</label>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />

        <label style={styles.label}>Seat Preference</label>
        <select
          style={styles.input}
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
        >
          <option>Aisle</option>
          <option>Window</option>
          <option>Middle</option>
        </select>

        <button style={styles.button} disabled={loading}>
          {loading ? "Booking..." : "Create Reservation"}
        </button>
      </form>

      {reservationId && (
        <div style={styles.successBox}>
          <h3>Reservation Created 🎉</h3>
          <p>Your reservation ID:</p>
          <code style={styles.code}>{reservationId}</code>
        </div>
      )}

      {error && (
        <div style={styles.errorBox}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "480px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
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
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#0070f3",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  successBox: {
    background: "#e6ffed",
    border: "1px solid #7ddf9f",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  errorBox: {
    background: "#ffe6e6",
    border: "1px solid #ff9999",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  code: {
    background: "#f5f5f5",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "14px",
  },
};

export default App;
