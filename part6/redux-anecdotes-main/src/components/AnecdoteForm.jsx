import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

// import { setNotification } from "../reducers/notificationReducer";
import { setTimedNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    /* const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote)); */

    dispatch(createAnecdote(content));

    dispatch(setTimedNotification(`You created "${content}"`));
  };

  /* const handleClick = () => {
    dispatch(setNotification("Nueva notificación de prueba"));
  }; */

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>

      {/* <button onClick={handleClick}>Mostrar notificación</button> */}
    </div>
  );
};

export default AnecdoteForm;
