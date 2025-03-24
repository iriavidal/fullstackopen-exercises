import { useState, useEffect } from "react"; // Importa los hooks useState y useEffect de React
import Note from "./components/Note"; // Importa el componente Note
import noteService from "./services/notes"; // Importa el servicio para manejar notas
import Notification from "./components/Notification"; // Importa el componente de notificaciones

// Componente Footer: muestra un pie de página estilizado
const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  // Estado para almacenar la lista de notas
  const [notes, setNotes] = useState([]); // Se inicia con un array vacío porque se van a guardar varias cosas, si se guardara solo una sería null
  // Estado para almacenar el contenido de una nueva nota
  const [newNote, setNewNote] = useState("");
  // Estado para alternar entre mostrar todas las notas o solo las importantes
  const [showAll, setShowAll] = useState(true);
  // Estado para mostrar mensajes de error o notificación
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  // useEffect se ejecuta cuando el componente se monta para cargar las notas desde el backend
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes); // Almacena las notas en el estado
    });
  }, []); // El array vacío indica que solo se ejecuta una vez al montar el componente

  // Función para agregar una nueva nota
  const addNote = (event) => {
    event.preventDefault(); // Evita la recarga de la página
    const noteObject = {
      content: newNote, // Usa el valor actual del input
      important: Math.random() > 0.5, // Asigna importancia aleatoria
      id: String(notes.length + 1), // Genera un ID basado en la longitud del array
    };

    // Envía la nueva nota al backend y actualiza el estado
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote)); // Agrega la nueva nota a la lista
      setNewNote(""); // Limpia el campo de entrada
    });
  };

  // Maneja los cambios en el input de nueva nota
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // Filtra las notas según la opción seleccionada
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  // Función para alternar la importancia de una nota
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id); // Busca la nota por ID
    const changedNote = { ...note, important: !note.important }; // Crea una copia con la propiedad "important" cambiada

    // Envía la actualización al backend
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        // Reemplaza la nota actualizada en la lista
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        // Manejo de errores si la nota ya no existe en el servidor
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null); // Borra el mensaje de error después de 5 segundos
        }, 5000);

        // Elimina la nota del estado si ya no existe en el backend
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      {/* Muestra el componente de notificación con el mensaje de error */}
      <Notification message={errorMessage} />
      <div>
        {/* Botón para alternar entre mostrar todas las notas o solo las importantes */}
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {/* Renderiza la lista de notas filtradas */}
        {notesToShow.map((note) => (
          <Note
            key={note.id} // Clave única para cada nota
            note={note} // Pasa la nota como prop al componente Note
            toggleImportance={() => toggleImportanceOf(note.id)} // Pasa la función para cambiar importancia
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        {/* Campo de entrada y botón para agregar una nueva nota */}
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      {/* Muestra el pie de página */}
      <Footer></Footer>
    </div>
  );
};

export default App; // Exporta el componente principal
