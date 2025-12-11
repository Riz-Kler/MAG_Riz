import express from "express";
import flightsRouter from "./routes/flights_bak";

export const app = express();

app.use(express.json());
app.use("/api/flights", flightsRouter);

// When used from tests we just want the app, not a listener.
export default app;
