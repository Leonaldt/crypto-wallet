import express from "express";
import { usersRoute } from "./routers/users";
import { walletsRoute } from "./routers/wallets";
import { assetsRoute } from "./routers/assets";

const app = express();

app.use(express.json());

app.use("/users", usersRoute);
app.use("/wallets", walletsRoute);
app.use("/assets", assetsRoute);

export = app;
