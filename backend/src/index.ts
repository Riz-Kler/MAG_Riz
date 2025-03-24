import express from "express";
import flightRoutes from "./routes/flights";
import passengerRoutes from "./routes/passengers";

const app = express();
app.use(express.json());

app.use("/api/flights", flightRoutes);
app.use("/api/passengers", passengerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log("✅ TypeScript is working!");
