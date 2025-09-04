// Importa dos funciones (createNote y toggleImportanceOf) desde el archivo noteReducer
// Estas funciones son "action creators" que crean las acciones para el reducer
import { createNote, toggleImportanceOf } from "./reducers/noteReducer";

// Importa dos hooks de React-Redux:
// - useSelector: para acceder al estado de Redux desde el componente
// - useDispatch: para despachar acciones al store de Redux
import { useSelector, useDispatch } from "react-redux";

// Define el componente funcional App
const App = () => {
  // Inicializa useDispatch para poder enviar acciones al store
  const dispatch = useDispatch();

  // Utiliza useSelector para obtener el estado de las notas desde el store
  // state representa todo el estado de Redux, y en este caso se espera que sea un array de notas
  const notes = useSelector((state) => state);

  // Función para agregar una nueva nota
  const addNote = (event) => {
    // Previene el comportamiento por defecto del formulario (recarga de página)
    event.preventDefault();

    // Obtiene el valor del campo de entrada con name="note"
    const content = event.target.note.value;

    // Limpia el campo de entrada después de obtener el valor
    event.target.note.value = "";

    // Despacha la acción de crear nota usando el action creator createNote
    dispatch(createNote(content));
  };

  // Función para alternar la importancia de una nota
  const toggleImportance = (id) => {
    // Despacha la acción de alternar importancia usando el action creator toggleImportanceOf
    dispatch(toggleImportanceOf(id));
  };

  // Retorna el JSX que representa la interfaz de usuario
  return (
    <div>
      {/* Formulario para agregar nuevas notas */}
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>

      {/* Lista de notas */}
      <ul>
        {/* Mapea cada nota a un elemento de lista */}
        {notes.map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {/* Muestra el contenido de la nota */}
            {note.content}
            {/* Muestra "important" en negrita si la nota es importante */}
            <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporta el componente App como exportación por defecto
export default App;

/* Este archivo define el componente principal App de una aplicación que gestiona notas usando Redux. Utiliza hooks de React-Redux (useSelector y useDispatch) para conectarse al store de Redux. La aplicación permite:

  1. Agregar nuevas notas a través de un formulario

  2. Alternar la importancia de las notas haciendo clic en ellas

  3. Mostrar la lista de notas con su contenido y estado de importancia

El componente se conecta al store de Redux para leer el estado de las notas y despachar acciones cuando se agregan nuevas notas o se cambia su importancia. Los "action creators" (createNote y toggleImportanceOf) se utilizan para generar las acciones de manera consistente. */
