const { test, after, beforeEach, expect } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Primer blog de prueba",
    author: "Autora 1",
    url: "http://blog1.com",
    likes: 5,
  },
  {
    title: "Segundo blog de prueba",
    author: "Autor 2",
    url: "http://blog2.com",
    likes: 10,
  },
];

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const newUser = {
    username: "testuser",
    name: "Test User",
    password: "password123",
  };

  await request(app).post("/api/users").send(newUser);

  const loginResponse = await request(app).post("/api/login").send({
    username: "testuser",
    password: "password123",
  });

  token = loginResponse.body.token;

  for (let blog of initialBlogs) {
    await request(app)
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog);
  }
});

test("los blogs son devueltos como JSON y su cantidad es correcta", async () => {
  const response = await request(app)
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("the unique identifier property of blog posts is named id", async () => {
  const response = await request(app)
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  const blogs = response.body;

  for (const blog of blogs) {
    assert.ok(blog.id, "Expected blog to have property 'id'");
    assert.strictEqual(
      blog._id,
      undefined,
      "Expected blog not to have property '_id'"
    );
  }
});

test("a valid blog can be added with a valid token", async () => {
  const newBlog = {
    title: "Tercer blog de prueba",
    author: "Autor 3",
    url: "http://blog3.com",
    likes: 33,
  };

  await request(app)
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await request(app)
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  const titles = response.body.map((b) => b.title);
  assert(titles.includes("Tercer blog de prueba"));
});

test("adding a blog fails with 401 if token is not provided", async () => {
  const newBlog = {
    title: "Blog no autorizado",
    author: "Intruso",
    url: "http://notoken.com",
    likes: 10,
  };

  await request(app).post("/api/blogs").send(newBlog).expect(401);
});

test("sets likes to 0 when not provided in POST request", async () => {
  const newBlog = {
    title: "Blog sin likes",
    author: "Autorx",
    url: "http://blog0.com",
  };

  const response = await request(app)
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("responds with 400 when title or url is missing", async () => {
  const invalidBlogs = [
    { author: "Autorx", url: "http://blog0.com" },
    { title: "Blog sin likes", author: "Autorx" },
  ];

  for (const blog of invalidBlogs) {
    await request(app)
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog)
      .expect(400);
  }
});

test("deletion of a blog succeeds with status code 204 if id is valid", async () => {
  const blogsAtStart = await request(app)
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  const blogToDelete = blogsAtStart.body[0];

  await request(app)
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await request(app)
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1);

  const titles = blogsAtEnd.body.map((r) => r.title);
  assert(!titles.includes(blogToDelete.title));
});

test("updates blog likes successfully", async () => {
  const blogsAtStart = await request(app)
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  const blogToUpdate = blogsAtStart.body[0];

  const updatedData = { likes: blogToUpdate.likes + 1 };

  const response = await request(app)
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updatedData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);
});

after(async () => {
  await mongoose.connection.close();
});
