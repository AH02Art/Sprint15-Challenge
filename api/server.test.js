const Model = require("../api/secrets.js");
const db = require("../data/dbConfig.js");

test('sanity', () => {
  expect(true).toBe(true)
})

describe("[POST] /api/auth/register", () => {
  test.todo("[1] responds the correct error message if username is already taken");
  test.todo("[2] resolves the newly registered user and their hashed password");
})

describe("[POST] /api/auth/login", () => {
  test.todo("[4] responds the correct error message if username or password are entered incorrectly");
  test.todo("[5] resolves the logged in user and their authorization token");
})

describe("[GET] /api/jokes", () => {
  test.todo("[5] responds the correct error message if there's no token or it's invalid");
  test.todo("[6] resolves with the data by valid authorization token");
})