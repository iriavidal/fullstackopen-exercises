import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      alert("Wrong credentials", exception);
      /* setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000); */
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setNewBlog({ title: "", author: "", url: "" });
    } catch (exception) {
      alert("Error creating blog", exception);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <h3>{user.name} logged in</h3>
          <form onSubmit={handleCreate}>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              value={newBlog.title}
              name="Title"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, title: target.value })
              }
            />
            <br />
            <label htmlFor="author">Author: </label>
            <input
              type="text"
              value={newBlog.author}
              name="Author"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, author: target.value })
              }
            />
            <br />
            <label htmlFor="url">URL: </label>
            <input
              type="text"
              value={newBlog.url}
              name="URL"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, url: target.value })
              }
            />
            <br />
            <button type="submit">create</button>
          </form>
          <hr />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <hr />
          <button onClick={handleLogout}>log-out</button>
        </div>
      )}
    </div>
  );
};

export default App;
