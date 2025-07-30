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

test.only("the unique identifier property of blog posts is named id", async () => {
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

after(async () => {
  await mongoose.connection.close();
});
