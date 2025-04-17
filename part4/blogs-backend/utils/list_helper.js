const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  console.log(totalLikes);
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favoriteBlog = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max
  );
  console.log(favoriteBlog);

  return favoriteBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
