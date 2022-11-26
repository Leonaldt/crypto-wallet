import { Router } from "express";
import { Wallet } from "../models/wallet";
import * as dbWallet from "../db/wallet";
import * as dbUser from "../db/users";

const router: Router = Router();

router.post("/", async (req, res) => {
  const { name, userId } = req.body;

  try {
    if (!name) {
      return res.status(400).send({ message: "Name is requered" });
    }

    const nameExists = await dbWallet.getWalletsByName(req.body.name);

    if (nameExists) {
      return res.status(400).send({ message: "Name already exists" });
    }

    if (!userId) {
      return res.status(400).send({ message: "User ID is requered" });
    }

    const user = await dbUser.getUserById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const wallet = new Wallet(name, userId);

    const userSaved = await dbWallet.createWallet(wallet);
    res.status(201).send(userSaved);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  try {
    const walletExists = await dbWallet.getWalletById(id);

    if (!walletExists) {
      return res.status(404).send({ message: "Wallet not found" });
    }

    if (!name) {
      return res.status(400).send({ message: "Name is requered" });
    }

    const walletsByName = await dbWallet.getWalletsByName(name);
    if (walletsByName && walletExists.name !== name) {
      return res.status(400).send({ message: "Name already exists" });
    }

    await dbWallet.updateWallet(name, id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/", async (req, res) => {
  try {
    const assets = await dbWallet.getAllWallets();
    res.status(200).send(assets);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const wallet = await dbWallet.getWalletById(id);

    if (!wallet || !wallet.id || !wallet.name) {
      return res.status(404).send({ message: "Wallet not found" });
    }

    res.status(200).send(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await dbUser.getUserById(userId);
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const wallets = await dbWallet.getWalletsByUserId(userId);

    res.status(200).send(wallets);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const wallet = await dbWallet.getWalletById(id);
    
    if (!wallet) {
      return res.status(404).send({ message: "Wallet not found" });
    }

    await dbWallet.deleteWallet(id);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export { router as walletsRoute };
