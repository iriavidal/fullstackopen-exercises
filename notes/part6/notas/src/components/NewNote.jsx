// Importa el hook useDispatch de react-redux para poder despachar acciones
import { useDispatch } from "react-redux";

// Importa el action creator createNote desde el archivo del reducer de notas
import { createNote } from "../reducers/noteReducer";

import noteService from "../services/notes";

// Define un componente funcional llamado NewNote
const NewNote = () => {
  // Inicializa useDispatch para obtener la función dispatch
  const dispatch = useDispatch();

  // Define la función addNote que se ejecutará al enviar el formulario
  const addNote = async (event) => {
    // Previene el comportamiento por defecto del formulario (recarga de página)
    event.preventDefault();

    // Obtiene el valor del campo de entrada con name="note"
    const content = event.target.note.value;

    // Limpia el campo de entrada después de obtener el valor
    event.target.note.value = "";

    //const newNote = await noteService.createNew(content);
    dispatch(createNote(content));
  };

  // Retorna el JSX que representa un formulario
  return (
    <form onSubmit={addNote}>
      {/* Campo de entrada para escribir la nueva nota */}
      <input name="note" />

      {/* Botón para enviar el formulario y agregar la nota */}
      <button type="submit">add</button>
    </form>
  );
};

// Exporta el componente NewNote como exportación por defecto
export default NewNote;

/* Este archivo define un componente de React llamado NewNote que representa un formulario para agregar nuevas notas. El componente utiliza el hook useDispatch de React-Redux para despachar acciones al store de Redux. Cuando se envía el formulario, se ejecuta la función addNote que:

  1. Previene el comportamiento por defecto del formulario

  2. Obtiene el contenido de la nota del campo de entrada

  3. Limpia el campo de entrada

  4. Despacha la acción createNote con el contenido de la nota

Este componente es un ejemplo de un componente "presentacional" que se enfoca en la interfaz de usuario pero se conecta con Redux para manejar el estado de la aplicación. */
