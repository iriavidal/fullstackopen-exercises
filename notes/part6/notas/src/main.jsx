// Importa ReactDOM desde el paquete react-dom/client para renderizar la aplicación React
import ReactDOM from "react-dom/client";

// Importa el componente Provider de react-redux para proveer el store de Redux a la aplicación
import { Provider } from "react-redux";

// Importa configureStore de Redux Toolkit para crear el store de Redux
import { configureStore } from "@reduxjs/toolkit";

// Importa el componente principal de la aplicación
import App from "./App";

// Importa el reducer de notas
import noteReducer from "./reducers/noteReducer";

// Importa el reducer del filtro
import filterReducer from "./reducers/filterReducer";

// Crea el store de Redux utilizando configureStore de Redux Toolkit
// configureStore simplifica la configuración del store y habilita buenas prácticas por defecto
const store = configureStore({
  reducer: {
    // Combina múltiples reducers en un store único
    // El estado del store tendrá una propiedad 'notes' manejada por noteReducer
    notes: noteReducer,
    // y una propiedad 'filter' manejada por filterReducer
    filter: filterReducer,
  },
});

// Muestra el estado inicial del store en la consola para debugging
console.log(store.getState());

// Renderiza la aplicación React en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById("root")).render(
  // Provee el store de Redux a toda la aplicación mediante el componente Provider
  // Esto permite que cualquier componente de la aplicación acceda al store
  <Provider store={store}>
    <App />
  </Provider>
);

/* Este archivo es el punto de entrada principal de la aplicación React con Redux. Su función principal es:

  1. Configurar el store de Redux: Utiliza configureStore de Redux Toolkit para crear el store, combinando múltiples reducers (noteReducer y filterReducer) en un store único.

  2. Proveer el store a la aplicación: Utiliza el componente Provider de react-redux para hacer el store disponible en todos los componentes de la aplicación.

  3. Renderizar la aplicación: Usa ReactDOM.createRoot para renderizar el componente App en el elemento HTML con id 'root'.

Este archivo actúa como puente entre Redux y React, inicializando el estado global de la aplicación y conectándolo con la interfaz de usuario. Redux Toolkit simplifica la configuración del store con valores por defecto útiles como la integración de Redux DevTools y middleware como thunk.

 */
