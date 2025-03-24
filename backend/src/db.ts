import { Pool } from "pg";

const pool = new Pool({
  host: "postgres",
  port: 5432,
  user: "airport",
  password: "mag123",
  database: "mag_airport",
});

export default pool;
