const server = require("./server.js");
const request = require("supertest");
const db = require("../data/dbConfig.js");

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

describe("[POST] /api/auth/register", () => {
  test("[1] responds the correct error message if username is already taken", async () => {
    const input = { username: "Alex", password: "1234" };
    const expected = { message: "username taken" };
    const res1 = await request(server).post("/api/auth/register").send(input);
    const res2 = await request(server).post("/api/auth/register").send(input);
    expect(res2.status).toBe(401);
    expect(res2.body).toMatchObject(expected);
  });
  test("[2] resolves the newly registered user and their hashed password", async () => {
    const input = { username: "Jacob", password: "1234" };
    const res = await request(server).post("/api/auth/register").send(input);
    expect(res.body).toHaveProperty("password");
  });
});

describe("[POST] /api/auth/login", () => {
  const input1 = { username: "Alex", password: "abcd" };
  const input2 = { username: "alexxx", password: "1234" };
  const input3 = { username: "Alex", password: "1234" };
  const expected = { message: "invalid credentials" };
  test("[3] responds the correct error message if username or password are entered incorrectly", async() => {
    const res1 = await request(server).post("/api/auth/login").send(input1);
    const res2 = await request(server).post("/api/auth/login").send(input2);
    expect(res1.body).toMatchObject(expected);
    expect(res2.body).toMatchObject(expected);
  });
  test("[4] resolves the logged in user and their authorization token", async () => {
    const res3 = await request(server).post("/api/auth/login").send(input3);
    expect(res3.body.message).toBe("welcome, Alex");
    expect(res3.body).toHaveProperty("token");
  });
});

describe("[GET] /api/jokes", () => {
  test("[5] responds the correct error message if there's no token or it's invalid", async () => {
    const expected = { message: "token required" };
    const response = await request(server).get("/api/jokes");
    expect(response.body).toMatchObject(expected);
  });
  test("[6] resolves with the data by valid authorization token", async () => {
    const login = await request(server).post("/api/auth/login").send({ username: "Alex", password: "1234" });
    const { token } = login.body
    const response = await request(server).get("/api/jokes").set("Authorization", token);
    expect(response.body).toHaveLength(3);
  });
});