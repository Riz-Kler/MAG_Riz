const API_BASE = "http://localhost:4000/api";

async function run() {
  const payloads = [
    { passenger_name: "Load User 1", flight_id: "MAN1001", seat: "Window" },
    { passenger_name: "Load User 2", flight_id: "MAN1001", seat: "Window" },
    { passenger_name: "Load User 3", flight_id: "MAN1001", seat: "Window" },
  ];

  await Promise.all(
    payloads.map(async (p) => {
      try {
        const res = await fetch(`${API_BASE}/reservations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
        });

        const text = await res.text();
        console.log(p.passenger_name, res.status, text);
      } catch (err) {
        console.error("Error for", p.passenger_name, err);
      }
    }),
  );
}

run().catch(console.error);
