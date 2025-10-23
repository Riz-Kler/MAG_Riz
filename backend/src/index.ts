import express from "express";
import flightRoutes from "./routes/flights";
import passengerRoutes from "./routes/passengers";

const app = express();
app.use(express.json());

// --- Health check ---
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// --- Routes ---
app.use("/api/flights", flightRoutes);
app.use("/api/passengers", passengerRoutes);

// --- Server listen ---
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

console.log("✅ TypeScript is working!");
