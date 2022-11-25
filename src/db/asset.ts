import { AssetWallet } from "../models/asset";
import { connect } from "./postgresql";

const addAsset = async (assetWallet: AssetWallet) => {
  const pool = await connect();
  const { price, amount, assetId, walletId } = assetWallet;
  const results = await pool.query(
    "INSERT INTO assets_wallets (price, amount, asset_id, wallet_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [price, amount, assetId, walletId]
  );
  return results.rows[0];
};

const getAllAssets = async () => {
  const pool = await connect();
  const results = await pool.query("SELECT * FROM assets ORDER BY id");
  return results.rows;
};

const getAssetById = async (id: number) => {
  const pool = await connect();
  const results = await pool.query("SELECT * FROM assets WHERE id = $1", [id]);
  return results.rows[0];
};

export { addAsset, getAllAssets, getAssetById };
