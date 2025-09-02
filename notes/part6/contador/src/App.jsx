/* eslint-disable no-unused-vars */ // Desactiva la regla de ESLint que prohíbe variables no usadas (aquí el parámetro `e` en los onClick).

import React from "react"; // Importa React para poder usar JSX.
import ReactDOM from "react-dom/client"; // Importa el API moderno de ReactDOM para crear el root con createRoot().

import { createStore } from "redux"; // Importa createStore para crear un store de Redux (API clásica).

const counterReducer = (state = 0, action) => {
  // Define el reducer: recibe el estado actual (por defecto 0) y una acción.
  switch (
    action.type // Evalúa el tipo de la acción para decidir cómo cambiar el estado.
  ) {
    case "INCREMENT": // Si la acción es INCREMENT...
      return state + 1; // ...devuelve el estado incrementado en 1 (inmutable).
    case "DECREMENT": // Si la acción es DECREMENT...
      return state - 1; // ...devuelve el estado decrementado en 1.
    case "ZERO": // Si la acción es ZERO...
      return 0; // ...resetea el contador a 0.
    default: // Para cualquier otro tipo de acción...
      return state; // ...devuelve el estado sin cambios (obligatorio en Redux).
  }
};

const store = createStore(counterReducer); // Crea el store de Redux utilizando el reducer definido arriba.

const App = () => {
  // Define el componente de React principal (funcional).
  return (
    // Devuelve el JSX que se renderizará.
    <div>
      {" "}
      {/* Contenedor principal. */}
      <div>{store.getState()}</div>{" "}
      {/* Muestra el valor actual del estado del store (el contador). */}
      <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
        {" "}
        {/* Al hacer clic, envía la acción INCREMENT al store. */}
        plus
      </button>
      <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
        {" "}
        {/* Al hacer clic, envía la acción DECREMENT. */}
        minus
      </button>
      <button onClick={(e) => store.dispatch({ type: "ZERO" })}>
        {" "}
        {/* Al hacer clic, envía la acción ZERO para resetear. */}
        zero
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(
  // Crea el "root" de React (modo concurrente).
  document.getElementById("root") // Busca en el DOM el elemento con id="root" donde montar la app.
);

const renderApp = () => {
  // Función que renderiza la aplicación.
  root.render(<App />); // Renderiza el componente <App /> en el root.
};

renderApp(); // Render inicial para mostrar la UI por primera vez.
store.subscribe(renderApp); // Se suscribe al store: cada cambio de estado vuelve a renderizar la UI.

export default App; // Exporta el componente por defecto (útil para pruebas o importaciones).
