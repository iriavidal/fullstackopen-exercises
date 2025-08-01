const { test, after, beforeEach, describe } = require("node:test");

const bcrypt = require("bcrypt");

const User = require("../models/user");

const assert = require("node:assert");

const mongoose = require("mongoose");

const supertest = require("supertest");

const app = require("../app");

const api = supertest(app);

const helper = require("./test_helper");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);

    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  describe("User creation validations", () => {
    test("creation fails if username is too short", async () => {
      const newUser = {
        username: "ab",
        name: "Short User",
        password: "validpassword",
      };

      const result = await api.post("/api/users").send(newUser).expect(400);

      assert(result.body.error.includes("must be at least 3 characters"));
    });

    test("creation fails if password is too short", async () => {
      const newUser = {
        username: "validuser",
        name: "Short Password",
        password: "pw",
      };

      const result = await api.post("/api/users").send(newUser).expect(400);

      assert(result.body.error.includes("must be at least 3 characters"));
    });

    test("creation fails if username is missing", async () => {
      const newUser = {
        name: "No Username",
        password: "validpassword",
      };

      const result = await api.post("/api/users").send(newUser).expect(400);

      assert(result.body.error.includes("username and password are required"));
    });

    test("creation fails if password is missing", async () => {
      const newUser = {
        username: "nouser",
        name: "No Password",
      };

      const result = await api.post("/api/users").send(newUser).expect(400);

      assert(result.body.error.includes("username and password are required"));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
