const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  console.log(totalLikes);
  return totalLikes;
};

module.exports = {
  dummy,
  totalLikes,
};
