import { Pool } from "pg";

const pool = new Pool({
  host: "postgres",
  port: 5432,
  user: "mag",
  password: "magpass",
  database: "magdb",
});

export default pool;
