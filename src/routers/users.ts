import { Router } from "express";
import * as dbUser from "../db/users";
import { User } from "../models/users";

const router: Router = Router();

router.post("/", async (req, res) => {
  const { nickname } = req.body;

  try {
    if (!nickname) {
      return res.status(400).send({ message: "Nickname is requered" });
    }

    const nicknameExists = await dbUser.getUserByNickname(req.body.nickname);

    if (nicknameExists) {
      return res.status(400).send({ message: "Nickname already exists" });
    }
    const user = new User(nickname);
    const userSaved = await dbUser.createUser(user);
    res.status(201).send(userSaved);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    let user = await dbUser.getUserById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const nickname = await dbUser.getUserByNickname(req.body.nickname);

    if (nickname && user.nickname !== req.body.nickname) {
      return res.status(400).send({ message: "Nickname already exists" });
    }

    user = req.body;

    if (!user.nickname) {
      return res.status(400).send({ message: "Nickname is requered" });
    }

    const userUpdated = await dbUser.updateUser(user, id);
    res.status(201).send(userUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await dbUser.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await dbUser.getUserById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await dbUser.getUserById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await dbUser.deleteUser(id);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export { router as usersRoute };
