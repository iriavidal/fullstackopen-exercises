// Importa los hooks useDispatch y useSelector de react-redux
// useDispatch: permite despachar acciones al store de Redux
// useSelector: permite acceder al estado del store de Redux
import { useDispatch, useSelector } from "react-redux";

// Importa el action creator toggleImportanceOf desde el archivo del reducer de notas
import { toggleImportanceOf } from "../reducers/noteReducer";

// Define un componente funcional Note que representa una sola nota
// Recibe dos props: note (objeto con la información de la nota) y handleClick (función para manejar el clic)
const Note = ({ note, handleClick }) => {
  return (
    // Elemento de lista que ejecuta handleClick cuando se hace clic en él
    <li onClick={handleClick}>
      {/* Muestra el contenido de la nota */}
      {note.content}
      {/* Muestra "important" en negrita si la nota es importante, de lo contrario no muestra nada */}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

// Define el componente principal Notes que muestra la lista de notas
const Notes = () => {
  // Inicializa useDispatch para obtener la función dispatch
  const dispatch = useDispatch();

  // Utiliza useSelector para obtener y filtrar las notas del estado de Redux
  // El estado de Redux tiene dos partes: filter y notes
  const notes = useSelector(({ filter, notes }) => {
    // Si el filtro es "ALL", devuelve todas las notas
    if (filter === "ALL") {
      return notes;
    }
    // Si el filtro es "IMPORTANT", devuelve solo las notas importantes
    // De lo contrario, devuelve solo las notas no importantes
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  return (
    // Lista no ordenada que contendrá todas las notas filtradas
    <ul>
      {/* Mapea cada nota a un componente Note individual */}
      {notes.map((note) => (
        <Note
          key={note.id} // Clave única para React (necesaria para listas)
          note={note} // Pasa el objeto de la nota como prop
          // Pasa una función que despacha la acción toggleImportanceOf con el ID de la nota
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

// Exporta el componente Notes como exportación por defecto
export default Notes;

/* Este archivo define dos componentes de React para mostrar y gestionar una lista de notas con funcionalidad de filtrado:

  1. Componente Note: Un componente presentacional que muestra una nota individual. Al hacer clic en una nota, ejecuta la función handleClick que cambia su estado de importancia.

  2. Componente Notes: Un componente contenedor que se conecta al store de Redux usando los hooks useDispatch y useSelector.

    - Obtiene y filtra las notas basándose en el valor del filtro ("ALL", "IMPORTANT", o no importantes)

    - Renderiza una lista de componentes Note

    - Cada nota tiene un manejador de clic que despacha la acción toggleImportanceOf para cambiar su estado de importancia

El archivo demuestra cómo implementar filtrado de datos en una aplicación Redux, donde el estado del filtro se almacena en el store y se utiliza para determinar qué notas mostrar. */
