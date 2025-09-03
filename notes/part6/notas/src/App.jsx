// Importa la función `createStore` de la librería Redux, que se utiliza para crear el almacén (store) de Redux.
import { createStore } from "redux";

// Importa el reducer `noteReducer` desde su archivo. Este reducer manejará las acciones relacionadas con las notas.
import { noteReducer } from "./reducers/noteReducer";

// Crea el almacén (store) de Redux utilizando el reducer `noteReducer`.
// El store contendrá el estado de la aplicación y permitirá despachar acciones.
const store = createStore(noteReducer);

// Despacha una acción de tipo "NEW_NOTE" para agregar una nueva nota al store.
// La acción tiene un payload (carga útil) que contiene el contenido, importancia e ID de la nota.
store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

// Despacha otra acción "NEW_NOTE" para agregar una segunda nota.
store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

// Define el componente funcional `App`.
const App = () => {
  return (
    <div>
      {/* Renderiza una lista no ordenada (<ul>). */}
      <ul>
        {/* 
          Obtiene el estado actual del store usando `store.getState()`, que devuelve el array de notas.
          Itera sobre cada nota en el estado usando `map`.
          Cada nota se renderiza como un elemento de lista (<li>).
        */}
        {store.getState().map((note) => (
          <li key={note.id}>
            {" "}
            {/* Renderiza el contenido de la nota. */}
            {note.content}{" "}
            {/* 
              Si la nota es importante, renderiza la palabra "important" en negrita; 
              de lo contrario, no renderiza nada.
            */}
            <strong>{note.important ? "important" : ""}</strong>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporta el componente `App` como exportación por defecto para que pueda ser usado en otros archivos.
export default App;

/* Este archivo define el componente principal App que utiliza Redux para gestionar el estado de las notas. Crea un almacén de Redux con un reducer específico, despacha acciones para agregar dos notas al estado, y luego renderiza una lista de esas notas. El componente obtiene el estado directamente del almacén usando store.getState(), lo que muestra cómo se puede acceder al estado de Redux en un componente React. Sin embargo, en aplicaciones más realistas, se usarían hooks como useSelector para conectarse al store de manera más eficiente. */
