import { User } from "../models/users";
import { connect } from "./postgresql";

const createUser = async (user: User) => {
  const pool = await connect();
  const { nickname } = user;
  const results = await pool.query(
    "INSERT INTO users (nickname) VALUES ($1) RETURNING *",
    [nickname]
  );
  return results.rows[0];
};

const getAllUsers = async () => {
  const pool = await connect();
  const results = await pool.query("SELECT * FROM users ORDER BY id DESC");
  return results.rows;
};

const updateUser = async (user: User, id: number) => {
  const pool = await connect();
  const { nickname } = user;
  const results = await pool.query(
    "UPDATE users SET nickname = $1, updated_at = (SELECT now()) WHERE id = $2",
    [nickname, id]
  );
  return results.rows[0];
};

const getUserById = async (id: number) => {
  const pool = await connect();
  const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return results.rows[0];
};

const getUserByNickname = async (nickname: string) => {
  const pool = await connect();
  const results = await pool.query("SELECT * FROM users WHERE nickname = $1", [nickname]);
  return results.rows[0];
};

const deleteUser = async (id: number) => {
  const pool = await connect();
  await pool.query("DELETE FROM wallets WHERE user_id IN (SELECT id FROM users WHERE id = $1)", [id]);
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

export {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByNickname,
  deleteUser,
};
