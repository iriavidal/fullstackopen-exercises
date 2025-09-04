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

  // Utiliza useSelector para obtener todas las notas del estado de Redux
  // state representa todo el estado de Redux, que en este caso es un array de notas
  const notes = useSelector((state) => state);

  return (
    // Lista no ordenada que contendrá todas las notas
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

/* Este archivo define dos componentes de React para mostrar y gestionar una lista de notas:

    1. Componente Note: Un componente presentacional que muestra una nota individual. Al hacer clic en una nota, ejecuta la función handleClick que se pasa como prop.

    2. Componente Notes: Un componente contenedor que se conecta al store de Redux usando los hooks useDispatch y useSelector. Obtiene todas las notas del estado y renderiza una lista de componentes Note. Cada nota tiene un manejador de clic que despacha la acción toggleImportanceOf para cambiar el estado de importancia de la nota correspondiente.

El archivo demuestra la separación de preocupaciones entre componentes presentacionales (Note) y componentes contenedores (Notes), y muestra cómo interactuar con Redux usando hooks modernos en lugar del método tradicional connect.


 */
