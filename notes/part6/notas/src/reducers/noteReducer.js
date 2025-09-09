// Define el estado inicial del reducer con un array de dos objetos de nota
const initialState = [
  {
    content: "reducer defines how redux store works", // Contenido de la primera nota
    important: true, // Importancia de la primera nota (true)
    id: 1, // ID único de la primera nota
  },
  {
    content: "state of store can contain any data", // Contenido de la segunda nota
    important: false, // Importancia de la segunda nota (false)
    id: 2, // ID único de la segunda nota
  },
];

// Define el reducer para manejar el estado de las notas
// El estado inicial es el array definido arriba y recibe dos parámetros: state y action
const noteReducer = (state = initialState, action) => {
  // Registra en consola la acción recibida para debugging
  console.log("ACTION: ", action);

  // Evalúa el tipo de acción para determinar cómo actualizar el estado
  switch (action.type) {
    // Caso para crear una nueva nota
    case "NEW_NOTE":
      // Devuelve un nuevo array con todas las notas existentes y la nueva nota
      // Usa el spread operator (...) para mantener la inmutabilidad
      return [...state, action.payload];

    // Caso para alternar la importancia de una nota
    case "TOGGLE_IMPORTANCE": {
      // Extrae el ID de la nota a modificar del payload de la acción
      const id = action.payload.id;

      // Encuentra la nota específica en el estado actual por su ID
      const noteToChange = state.find((n) => n.id === id);

      // Crea una nueva nota con la propiedad important invertida
      // Usa spread operator para copiar todas las propiedades de la nota original
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      // Devuelve un nuevo array de notas donde:
      // - Las notas no modificadas se mantienen igual
      // - La nota modificada se reemplaza por changedNote
      return state.map((note) => (note.id !== id ? note : changedNote));
    }

    // Caso por defecto: devuelve el estado actual sin cambios
    default:
      return state;
  }
};

// Función auxiliar para generar IDs únicos para nuevas notas
const generateId = () => Number((Math.random() * 1000000).toFixed(0));

// Action creator para crear una nueva nota
// Recibe el contenido de la nota y devuelve una acción con tipo NEW_NOTE
export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content, // Contenido de la nota
      important: false, // Por defecto la nota no es importante
      id: generateId(), // Genera un ID único para la nota
    },
  };
};

// Action creator para alternar la importancia de una nota
// Recibe el ID de la nota y devuelve una acción con tipo TOGGLE_IMPORTANCE
export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id }, // Incluye el ID de la nota en el payload
  };
};

// Exporta el reducer como exportación por defecto
export default noteReducer;

/* Este archivo implementa un reducer de Redux para gestionar el estado de las notas en una aplicación. Su función principal es:

  1. Definir el estado inicial: Incluye dos notas de ejemplo con contenido, importancia e ID.

  2. Manejar acciones: Procesa dos tipos de acciones:

    - NEW_NOTE: Agrega una nueva nota al estado

    - TOGGLE_IMPORTANCE: Cambia el estado de importancia de una nota específica

  3. Proveer action creators: Exporta funciones para crear acciones de manera consistente:

    - createNote: Para crear nuevas notas

    - toggleImportanceOf: Para cambiar la importancia de una nota existente

  4. Mantener la inmutabilidad: Siempre devuelve nuevos objetos/arrays en lugar de modificar el estado existente, siguiendo los principios de Redux.

El archivo sigue el patrón Flux de Redux, donde las acciones describen cambios y el reducer especifica cómo el estado cambia en respuesta a esas acciones. */
