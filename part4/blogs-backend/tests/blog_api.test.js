const { test, after, beforeEach, expect } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

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

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("los blogs son devueltos como JSON y su cantidad es correcta", async () => {
  const response = await request(app)
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("the unique identifier property of blog posts is named id", async () => {
  const response = await request(app).get("/api/blogs");

  const blogs = response.body;

  for (const blog of blogs) {
    assert.ok(blog.id, "Expected blog to have property 'id'");
    assert.strictEqual(
      blog._id,
      undefined,
      "Expected blog not to have property '_id'"
    );

    console.log(blog.id);
    console.log(blog._id);
  }
});

test("a valid note can be added", async () => {
  const newBlog = {
    title: "Tercer blog de prueba",
    author: "Autor 3",
    url: "http://blog3.com",
    likes: 33,
  };

  await request(app)
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await request(app).get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  // console.log("response.body.length", response.body.length);
  // console.log("initialBlogs.length + 1", initialBlogs.length + 1);

  const titles = response.body.map((n) => n.title);
  assert(titles.includes("Tercer blog de prueba"));

  // console.log(response.body);
});

test("sets likes to 0 when not provided in POST request", async () => {
  const newBlog = {
    title: "Blog sin likes",
    author: "Autorx",
    url: "http://blog0.com",
  };

  await request(app)
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await request(app).get("/api/blogs");

  // console.log(response.body[2]);
  // console.log(response.body[2].likes);

  const addedBlog = response.body.find(
    (blog) => blog.title === "Blog sin likes"
  );

  assert.ok(addedBlog, "Blog not found in response");
  assert.strictEqual(
    addedBlog.likes,
    0,
    "Expected likes to be set to 0 when not provided"
  );
});

test.only("responds with 400 when title or url is missing", async () => {
  const invalidBlogs = [
    { author: "Autorx", url: "http://blog0.com" },
    { title: "Blog sin likes", author: "Autorx" },
  ];

  for (const blog of invalidBlogs) {
    await request(app).post("/api/blogs").send(blog).expect(400);
  }
});

after(async () => {
  await mongoose.connection.close();
});
