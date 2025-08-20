import { useState } from "react";

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-summary">
        {blog.title} {blog.author}{" "}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>

      {showDetails && (
        <div className="blog-details">
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">
            likes {blog.likes}{" "}
            <button onClick={() => handleLike(blog)}>like</button>
          </p>
          <p className="blog-user">{blog.user?.name}</p>

          {user.username === blog.user?.username && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
