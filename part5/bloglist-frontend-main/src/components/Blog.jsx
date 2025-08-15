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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>

      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{" "}
            <button onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>{blog.user?.name}</p>

          {user.username === blog.user?.username && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
