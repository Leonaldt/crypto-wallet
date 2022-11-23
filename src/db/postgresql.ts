import { Pool } from "pg";

export const connect = async () => {
  if (global.connection) return global.connection.connect();

  const pool = new Pool({
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  });

  global.connection = pool;
  return pool.connect();
};
