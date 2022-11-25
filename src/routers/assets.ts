import { Router } from "express";
import * as dbAsset from "../db/asset";
import * as dbWallet from "../db/wallet";
import { AssetWallet } from "../models/asset";

const router: Router = Router();

router.post("/", async (req, res) => {
  const { price, amount, assetId, walletId } = req.body;

  try {
    if (!price) {
      return res.status(400).send({ message: "Price is requered" });
    }

    if (!amount) {
      return res.status(400).send({ message: "Amount is requered" });
    }

    if (!assetId) {
      return res.status(400).send({ message: "Asset ID is requered" });
    }

    if (!walletId) {
      return res.status(400).send({ message: "Wallet ID is requered" });
    }

    const wallet = await dbWallet.getWalletById(walletId);
    if (!wallet) {
      return res.status(404).send({ message: "Wallet not found" });
    }

    const asset = await dbAsset.getAssetById(assetId);
    if (!asset) {
      return res.status(404).send({ message: "Asset not found" });
    }

    const assetWallet = new AssetWallet(price, amount, assetId, walletId);

    const assetWalletSaved = await dbAsset.addAsset(assetWallet);
    res.status(201).send(assetWalletSaved);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/", async (req, res) => {
  try {
    const assets = await dbAsset.getAllAssets();
    res.status(200).send(assets);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export { router as assetsRoute };
