import app from "../../server";
import request from "supertest";
import { randomUUID } from "crypto";

describe("POST /users", () => {
  test("should create a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ nickname: `UserName-${randomUUID()}` });
    expect(res.statusCode).toBe(201);
  });

  test("should respond with a 400 status code when user already exists", async () => {
    const nickname = `UserName-${randomUUID()}`;
    const resCreate1 = await request(app).post("/users").send({ nickname });
    expect(resCreate1.statusCode).toBe(201);

    const resCreate2 = await request(app).post("/users").send({ nickname });
    expect(resCreate2.statusCode).toBe(400);
  });

  test("should respond with a 400 status code when missing nickname field", async () => {
    const res = await request(app).post("/users").send({ nickname: "" });
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(res.statusCode).toBe(400);
  });
});

describe("UPDATE /users/:id", () => {
  test("should update a user", async () => {
    const resCreate = await request(app)
      .post("/users")
      .send({ nickname: `UserName-${randomUUID()}` });
    expect(resCreate.statusCode).toBe(201);

    const newNickname = `UserName-${randomUUID()}`;
    const resUpdate = await request(app)
      .put(`/users/${resCreate.body.id}`)
      .send({ nickname: newNickname });

    expect(resUpdate.statusCode).toBe(201);
  });

  test("should respond with a 400 status code when missing nickname field", async () => {
    setImmediate(async () => {
      const resCreate = await request(app)
        .post("/users")
        .send({ nickname: `UserName-${randomUUID()}` });
      expect(resCreate.statusCode).toBe(201);

      const resUpdate = await request(app)
        .put(`/users/${resCreate.body.id}`)
        .send();
      expect(resUpdate.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(resUpdate.statusCode).toBe(400);
    });
  });
});

describe("GET /users", () => {
  test("should return an array", async () => {
    setImmediate(async () => {
      const res = await request(app).get("/users");
      expect(res.body).toBeInstanceOf(Array);
    });
  });
});

describe("DELETE /users/:id", () => {
  test("should delete a new user", async () => {
    setImmediate(async () => {
      const resCreate = await request(app)
        .post("/users")
        .send({ nickname: `UserName-${randomUUID()}` });
      expect(resCreate.statusCode).toBe(201);

      const resDelete = await request(app).delete(
        `/wallets/${resCreate.body.id}`
      );
      expect(resDelete.statusCode).toBe(201);
    });
  });
});
