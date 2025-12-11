import express from "express";
import cors from "cors";
import flightsRouter from "./routes/flights_bak";
import reservationsRouter from "./routes/reservations";

const app = express();

app.use(express.json());

// CORS so web (5173) + mobile (5174) can talk to 4000
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

app.use("/api/flights", flightsRouter);
app.use("/api/reservations", reservationsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`MAG_Riz flights API listening on port ${PORT}`);
});

export default app; // for Jest tests
