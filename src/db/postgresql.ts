import { Pool } from "pg";

export const connect = async () => {
  if (global.connection) return global.connection.connect();

  const pool = new Pool({
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  });

  const client = await pool.connect();
  console.log("PostgreSQL connection pool created!");

  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  client.release();

  global.connection = pool;
  return pool.connect();
};
