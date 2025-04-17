const _ = require("lodash");

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const grouped = _.countBy(blogs, "author");
  const authorWithMost = Object.keys(grouped).reduce((a, b) =>
    grouped[a] > grouped[b] ? a : b
  );

  console.log(grouped);
  console.log(authorWithMost);

  return {
    author: authorWithMost,
    blogs: grouped[authorWithMost],
  };
};

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, "author");

  const authorsLikes = _.map(groupedByAuthor, (blogs, author) => {
    return {
      author,
      likes: _.sumBy(blogs, "likes"),
    };
  });

  console.log(groupedByAuthor);
  console.log(authorsLikes);

  return _.maxBy(authorsLikes, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
