// Define una función reductora (reducer) para manejar el estado de las notas.
// Un reducer toma el estado actual y una acción, y devuelve el nuevo estado.
// El estado inicial es un array vacío ([])
const noteReducer = (state = [], action) => {
  // Utiliza una declaración switch para manejar diferentes tipos de acciones
  switch (action.type) {
    // Caso para cuando la acción es de tipo "NEW_NOTE"
    case "NEW_NOTE":
      // Crea un nuevo array que contiene todos los elementos del estado actual (usando spread operator ...state)
      // y añade el nuevo elemento (action.payload) al final del array
      // Esto mantiene la inmutabilidad al no modificar el array original del estado
      return [...state, action.payload];

    // Caso para cuando la acción es de tipo "TOGGLE_IMPORTANCE"
    case "TOGGLE_IMPORTANCE": {
      // Extrae el id de la nota a modificar desde el payload de la acción
      const id = action.payload.id;

      // Busca la nota específica en el estado actual por su id
      const noteToChange = state.find((n) => n.id === id);

      // Crea una nueva nota con la propiedad important invertida
      // usando spread operator para mantener las demás propiedades
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      // Mapea todas las notas y reemplaza solo la nota modificada
      // Crea un nuevo array con la nota actualizada
      return state.map((note) => (note.id !== id ? note : changedNote));
    }

    // Caso por defecto: devuelve el estado actual sin cambios
    default:
      return state;
  }
};

// Exporta el reducer como exportación por defecto
export default noteReducer;

/* Este archivo implementa un reducer de Redux para gestionar el estado de las notas. Maneja dos tipos de acciones:

  - "NEW_NOTE": Agrega una nueva nota al estado usando concatenación inmutables

  - "TOGGLE_IMPORTANCE": Cambia el estado de importancia de una nota específica usando técnicas inmutables (spread operator y map)

El reducer sigue los principios de Redux de ser una función pura que no muta el estado original, sino que devuelve nuevos estados inmutables. Es un componente fundamental en la arquitectura Redux para gestionar actualizaciones predecibles del estado. */
