/* eslint-disable no-unused-vars */
// Desactiva la regla de ESLint que advierte sobre variables importadas o declaradas pero no usadas.

import { useState, useEffect } from "react";
// Importa los hooks de React: useState para manejar estados y useEffect para ejecutar efectos secundarios.

import Note from "./components/Note";
// Importa el componente Note, que probablemente renderiza una nota individual.

import Notification from "./components/Notification";
// Importa el componente que muestra mensajes de error o de información.

import noteService from "./services/notes";
// Importa el servicio que maneja las llamadas HTTP relacionadas con las notas.

import loginService from "./services/login";
// Importa el servicio que maneja las llamadas HTTP relacionadas con el login.

import LoginForm from "./components/LoginForm";
// Importa el formulario de login.

import Togglable from "./components/Togglable";
// Importa el componente que puede mostrar/ocultar su contenido.

import NoteForm from "./components/NoteForm";
// Importa el formulario para crear una nueva nota.

const App = () => {
  // Declara el componente principal de la aplicación.

  const [notes, setNotes] = useState([]);
  // Estado para almacenar todas las notas.

  const [newNote, setNewNote] = useState("");
  // Estado para el valor del input de nueva nota.

  const [showAll, setShowAll] = useState(true);
  // Estado para determinar si se muestran todas las notas o solo las importantes.

  const [errorMessage, setErrorMessage] = useState(null);
  // Estado para mensajes de error o información.

  const [username, setUsername] = useState("");
  // Estado para el valor del input de nombre de usuario.

  const [password, setPassword] = useState("");
  // Estado para el valor del input de contraseña.

  const [user, setUser] = useState(null);
  // Estado para el usuario logueado.

  const [loginVisible, setLoginVisible] = useState(false);
  // Estado para controlar si el formulario de login se muestra o no.

  useEffect(() => {
    // Efecto que se ejecuta al montar el componente, para recuperar datos del usuario desde localStorage.
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    // Efecto que se ejecuta al montar el componente para cargar todas las notas desde el servidor.
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    // Función para añadir una nueva nota.
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5, // Asigna importancia aleatoria.
    };

    noteService.create(noteObject).then((returnedNote) => {
      // Envía la nota al servidor y actualiza el estado con la respuesta.
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    // Función para alternar la importancia de una nota específica.
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleNoteChange = (event) => {
    // Actualiza el estado con el contenido del input de nueva nota.
    setNewNote(event.target.value);
  };

  const handleLogin = async (event) => {
    // Maneja el login del usuario.
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      // Guarda el usuario logueado en localStorage.
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  // Determina si se muestran todas las notas o solo las importantes.

  const loginForm = () => {
    // Función que devuelve el formulario de login con mostrar/ocultar controlado.
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {/* Si no hay usuario logueado, muestra el formulario de login. */}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note">
            <NoteForm
              onSubmit={addNote}
              value={newNote}
              handleChange={handleNoteChange}
            />
          </Togglable>
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
// Exporta el componente principal para poder usarlo en otros archivos.
