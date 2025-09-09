const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

// Define el reducer para manejar el estado de las notas
// El estado inicial es un array vacío y recibe dos parámetros: state y action
const noteReducer = (state = initialState, action) => {
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

/* Este archivo implementa un reducer de Redux para gestionar el estado de las notas y sus correspondientes action creators. El reducer maneja dos tipos de acciones:

  1. NEW_NOTE: Agrega una nueva nota al estado

  2. TOGGLE_IMPORTANCE: Cambia el estado de importancia de una nota específica

Los action creators (createNote y toggleImportanceOf) son funciones que crean las acciones de forma consistente, encapsulando la lógica de construcción de las acciones. El archivo sigue los principios de Redux de inmutabilidad y funciones puras, asegurando que el estado nunca se modifique directamente sino que se creen nuevas versiones del estado para cada cambio. */
