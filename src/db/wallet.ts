import { Wallet } from "../models/wallet";
import { connect } from "./postgresql";

const createWallet = async (wallet: Wallet) => {
  const pool = await connect();
  const { name, userId } = wallet;
  const results = await pool.query(
    "INSERT INTO wallets (name, user_id) VALUES ($1, $2) RETURNING *",
    [name, userId]
  );
  return results.rows[0];
};

const updateWallet = async (name: string, id: number) => {
  const pool = await connect();
  await pool.query("UPDATE wallets SET name = $1 WHERE id = $2", [name, id]);
};

const getAllWallets = async () => {
  const pool = await connect();
  const results = await pool.query("SELECT * FROM wallets ORDER BY id");
  return results.rows;
};

const getWalletById = async (id: number) => {
  const pool = await connect();
  const queryString =
    "SELECT w.id as id, w.name as wallet, CAST(aw.price AS DOUBLE PRECISION), CAST(aw.amount AS DOUBLE PRECISION), a.name, a.symbol, sum(aw.price * aw.amount::DOUBLE PRECISION) as total FROM wallets w " +
    "LEFT JOIN assets_wallets aw ON w.id = aw.wallet_id " +
    "LEFT JOIN assets a ON a.id = aw.asset_id " +
    "WHERE w.id = $1 " +
    "GROUP BY 1, 2, 3, 4, 5, 6 ORDER BY total;";
  const results = await pool.query(queryString, [id]);
  let totalWallet: number = 0;
  let assets = results.rows.map((asset) => {
    totalWallet += asset.total;
    return {
      name: asset.name,
      price: asset.price,
      amount: asset.amount,
      symbol: asset.symbol,
      total: formatNumber(asset.total),
    };
  });

  if (assets[0] && assets[0].name === null) {
    assets = [];
  }

  const walletName = results.rows[0] ? results.rows[0].wallet : null;
  const walletId = results.rows[0] ? results.rows[0].id : null;
  
  return walletId ? {
    id: walletId,
    assets,
    name: walletName,
    total: formatNumber(totalWallet),
  } : null;
};

const getWalletsByUserId = async (userId: number) => {
  const pool = await connect();
  const queryString =
    "SELECT w.name as wallet, w.id as id, CAST(aw.price AS DOUBLE PRECISION), CAST(aw.amount AS DOUBLE PRECISION), a.name, a.symbol, sum(aw.price * aw.amount) as total FROM wallets w " +
    "LEFT JOIN assets_wallets aw ON w.id = aw.wallet_id " +
    "LEFT JOIN assets a ON a.id = aw.asset_id " +
    "WHERE w.user_id = $1 " +
    "GROUP BY 1, 2, 3, 4, 5, 6 ORDER BY total;";
  const results = await pool.query(queryString, [userId]);
  const wallets = groupBy(results.rows);
  const total = wallets.reduce((accumulator, object) => {
    const total = accumulator + object.total;
    return formatNumber(total);
  }, 0);

  return { wallets, total };
};

const getWalletsByName = async (name: string) => {
  const pool = await connect();
  const results = await pool.query("SELECT * FROM wallets WHERE name = $1", [
    name,
  ]);
  return results.rows[0];
};

const deleteWallet = async (id: number) => {
  const pool = await connect();
  await pool.query("DELETE FROM wallets WHERE id = $1", [id]);
};

const groupBy = (array) => {
  let arrayGrouped = [];

  array.forEach((item) => {
    if (!arrayGrouped.some((i) => i.id === item.id)) {
      arrayGrouped.push({
        id: item.id,
        wallet: item.wallet,
        total: 0,
        assets: [],
      });
    }
  });

  array.forEach((item) => {
    const index = arrayGrouped.findIndex((x) => x.id === item.id);
    if (arrayGrouped.some((i) => i.wallet === item.wallet)) {
      if (arrayGrouped[index] && item.name) {
        arrayGrouped[index].assets.push({
          name: item.name,
          symbol: item.symbol,
          price: item.price,
          amount: item.amount,
          total: formatNumber(item.total),
        });

        arrayGrouped[index].total += formatNumber(item.total);
      }
    }
  });

  return arrayGrouped;
};

const formatNumber = (numberStr) => {
  return parseFloat(parseFloat(numberStr).toFixed(2));
};

export {
  createWallet,
  updateWallet,
  getAllWallets,
  getWalletById,
  getWalletsByName,
  getWalletsByUserId,
  deleteWallet,
};
