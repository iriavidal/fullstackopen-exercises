// Importa ReactDOM desde el paquete react-dom/client para renderizar la aplicación React
import ReactDOM from "react-dom/client";

// Importa funciones de Redux para crear el store y combinar múltiples reducers
import { createStore, combineReducers } from "redux";
// Importa Provider de react-redux para conectar Redux con la aplicación React
import { Provider } from "react-redux";
// Importa el componente principal de la aplicación
import App from "./App";

// Importa el reducer de notas
import noteReducer from "./reducers/noteReducer";

// Importa el reducer del filtro
import filterReducer from "./reducers/filterReducer";

/* import { createNote } from "./reducers/noteReducer";
import { filterChange } from "./reducers/filterReducer"; */

// Combina múltiples reducers en un solo reducer raíz
// Esto permite manejar diferentes partes del estado por separado
const reducer = combineReducers({
  notes: noteReducer, // Maneja el estado de las notas
  filter: filterReducer, // Maneja el estado del filtro
});

// Crea el store de Redux usando el reducer combinado
const store = createStore(reducer);

// Muestra el estado inicial del store en la consola
console.log(store.getState());

// Renderiza la aplicación React en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById("root")).render(
  // Provee el store de Redux a toda la aplicación mediante el componente Provider
  <Provider store={store}>
    <App />
  </Provider>
);

/* ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div />
  </Provider>
); */

/* store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange("IMPORTANT"));
store.dispatch(
  createNote("combineReducers forms one reducer from many simple reducers")
); */

/* Este archivo es el punto de entrada principal de la aplicación React. Su función principal es:

  1. Configurar el store de Redux: Combina múltiples reducers (noteReducer y filterReducer) en un solo reducer raíz usando combineReducers, y crea el store con createStore.

  2. Proveer el store a la aplicación: Utiliza el componente Provider de react-redux para hacer el store disponible en todos los componentes de la aplicación.

  3. Renderizar la aplicación: Usa ReactDOM.createRoot para renderizar el componente App en el elemento HTML con id 'root'.

El archivo actúa como puente entre Redux y React, inicializando el estado global de la aplicación y conectándolo con la interfaz de usuario. Los comentarios muestran ejemplos de cómo se podría usar el store para suscribirse a cambios y despachar acciones, pero están deshabilitados en el código actual. */
