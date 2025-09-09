// Define el reducer para el filtro con un estado inicial "ALL"
// El reducer toma el estado actual (por defecto "ALL") y una acción
const filterReducer = (state = "ALL", action) => {
  // Registra en consola la acción recibida para debugging
  console.log("ACTION: ", action);

  // Evalúa el tipo de acción para determinar cómo actualizar el estado
  switch (action.type) {
    // Caso para la acción SET_FILTER
    case "SET_FILTER":
      // Devuelve el payload de la acción como nuevo estado del filtro
      return action.payload;
    // Caso por defecto: devuelve el estado actual sin cambios
    default:
      return state;
  }
};

// Action creator para cambiar el filtro
// Recibe un valor de filtro y devuelve una acción con tipo SET_FILTER y el filtro como payload
export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

// Exporta el reducer como exportación por defecto
export default filterReducer;

/* Este archivo implementa un reducer de Redux para gestionar el estado de filtrado en una aplicación. Su función principal es:

  1. Manejar el estado del filtro: Almacena el valor actual del filtro (por defecto "ALL") y lo actualiza cuando recibe acciones de tipo "SET_FILTER".

  2. Proveer un action creator: La función filterChange crea acciones para cambiar el filtro, encapsulando la estructura de la acción.

  3. Seguir el patrón Flux: Sigue la arquitectura de Redux donde las acciones describen cambios y el reducer especifica cómo el estado cambia en respuesta.

El reducer es una función pura que no muta el estado existente, sino que devuelve un nuevo estado para cada cambio. Este archivo típicamente se usaría en combinación con otros reducers usando combineReducers de Redux. */
