import PropTypes from "prop-types";

const NoteForm = ({ handleCreate, newBlog, setNewBlog }) => {
  return (
    <form onSubmit={handleCreate}>
      <label htmlFor="title">Title: </label>
      <input
        data-testid="title"
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
        data-testid="author"
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
        data-testid="url"
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

NoteForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  newBlog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  setNewBlog: PropTypes.func.isRequired,
};

export default NoteForm;
