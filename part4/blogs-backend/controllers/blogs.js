const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// Aquí va solo '/', ya que en app.js haces app.use('/api/blogs', blogsRouter)
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
