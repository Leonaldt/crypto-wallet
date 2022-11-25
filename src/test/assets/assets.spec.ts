import app from "../../server";
import request from "supertest";
import { assets } from "../mocks";
import { randomUUID } from "crypto";

describe("POST /assets", () => {
  test("should add asset in wallet", async () => {
    const resCreateUser = await request(app)
      .post("/users")
      .send({ nickname: `UserName-${randomUUID()}` });
    expect(resCreateUser.statusCode).toBe(201);

    const resCreateWallet = await request(app)
      .post("/wallets")
      .send({
        name: `WalletName-${randomUUID()}`,
        userId: resCreateUser.body.id,
      });
    expect(resCreateWallet.statusCode).toBe(201);

    const resAddAsset = await request(app).post("/assets").send({
      assetId: 1,
      walletId: resCreateWallet.body.id,
      price: 3.5,
      amount: 1,
    });
    expect(resAddAsset.body).toHaveProperty("created_at");
    expect(resAddAsset.statusCode).toBe(201);
  });
});

describe("GET /assets", () => {
  test("should return an array", async () => {
    const res = await request(app).get("/assets");
    expect(res.body).toEqual(assets);
    expect(res.body).toBeInstanceOf(Array);
  });
});
