import app from "../../server";
import request from "supertest";
import { randomUUID } from "crypto";

describe("POST /wallets", () => {
  test("should create a new wallet", async () => {
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
  });
});

describe("GET /wallets/users/:id", () => {
  test("should return wallets by user id", async () => {
    const resCreateUser = await request(app)
      .post("/users")
      .send({ nickname: `UserName-${randomUUID()}` });
    expect(resCreateUser.statusCode).toBe(201);

    const resWalletByUserId = await request(app).get(
      `/wallets/users/${resCreateUser.body.id}`
    );
    expect(resWalletByUserId.statusCode).toBe(200);
    expect(resWalletByUserId.body).toHaveProperty("total");
  });
});
