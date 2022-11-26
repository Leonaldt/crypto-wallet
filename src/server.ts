import express from "express";
import { usersRoute } from "./routers/users";
import { walletsRoute } from "./routers/wallets";
import { assetsRoute } from "./routers/assets";
import swaggerUi from "swagger-ui-express";
import * as docs from "./swagger";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));

app.get("/terms", (req, res) => {
  return res.json({
    message: "Termos de Serviços",
  });
});

app.use("/users", usersRoute);
app.use("/wallets", walletsRoute);
app.use("/assets", assetsRoute);

export = app;
