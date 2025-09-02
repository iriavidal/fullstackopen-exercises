import { createStore } from "redux"; // Importa createStore para crear un store de Redux
import "./App.css"; // Importa estilos CSS para el componente App

// Reducer para manejar las notas
const noteReducer = (state = [], action) => {
  // El estado inicial es un array vacío
  if (action.type === "NEW_NOTE") {
    // Si la acción es de tipo NEW_NOTE
    state.push(action.payload); // Se agrega la nueva nota al estado (⚠️ mutación directa del array)
    return state; // Devuelve el nuevo estado con la nota añadida
  }

  return state; // Si no se reconoce la acción, se devuelve el estado sin cambios
};

// Creación del store de Redux con el reducer de notas
const store = createStore(noteReducer);

// Se envía una acción para añadir la primera nota al estado
store.dispatch({
  type: "NEW_NOTE", // Tipo de acción
  payload: {
    // Contenido de la nota
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

// Se envía una acción para añadir la segunda nota al estado
store.dispatch({
  type: "NEW_NOTE", // Tipo de acción
  payload: {
    // Contenido de la nota
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

// Componente principal de la aplicación
const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map(
          (
            note // Se obtiene el estado del store y se mapean las notas
          ) => (
            <li key={note.id}>
              {" "}
              {/* Cada nota se renderiza como un <li> con su id como clave */}
              {note.content} {/* Texto de la nota */}
              <strong>{note.important ? "important" : ""}</strong>{" "}
              {/* Marca si es importante */}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default App; // Exporta el componente para poder usarlo en la app
