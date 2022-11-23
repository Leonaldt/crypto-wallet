import express from "express";
import * as db from "./db/postgresql";

db.connect();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "OK" });
});

export = app;
