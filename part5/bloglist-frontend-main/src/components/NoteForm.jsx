const NoteForm = ({ handleCreate, newBlog, setNewBlog }) => {
  return (
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
        onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
      />
      <br />
      <button type="submit">create</button>
    </form>
  );
};

export default NoteForm;
