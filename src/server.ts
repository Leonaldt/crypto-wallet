import express from "express";
import { usersRoute } from "./routers/users";

const app = express();

app.use(express.json());

app.use("/users", usersRoute);

export = app;
