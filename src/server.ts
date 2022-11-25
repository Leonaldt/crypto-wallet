import express from "express";
import { usersRoute } from "./routers/users";
import { walletsRoute } from "./routers/wallets";

const app = express();

app.use(express.json());

app.use("/users", usersRoute);
app.use("/wallets", walletsRoute);

export = app;
