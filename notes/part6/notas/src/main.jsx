// Importa la biblioteca React, necesaria para escribir componentes de React
import React from "react";

// Importa ReactDOM específicamente para renderizar la aplicación en el cliente (navegador)
import ReactDOM from "react-dom/client";

// Importa la función createStore de Redux, que se utiliza para crear el almacén de estado global
import { createStore } from "redux";

// Importa el componente Provider de react-redux, que permite que los componentes de React accedan al store de Redux
import { Provider } from "react-redux";

// Importa el componente principal de la aplicación
import App from "./App";

// Importa el reducer que manejará el estado de las notas
import noteReducer from "./reducers/noteReducer";

// Crea el store de Redux utilizando el noteReducer como función reductora
// El store contendrá todo el estado de la aplicación y manejará las actualizaciones
const store = createStore(noteReducer);

// Obtiene el elemento root del DOM (donde se montará la aplicación) y crea un root de React
// Luego renderiza la aplicación dentro del Provider que provee el store a todos los componentes
ReactDOM.createRoot(document.getElementById("root")).render(
  // El componente Provider hace que el store de Redux esté disponible para cualquier componente hijo
  // que esté conectado a Redux (usando hooks como useSelector o useDispatch)
  <Provider store={store}>
    {/* El componente App ahora tiene acceso al store de Redux */}
    <App />
  </Provider>
);

/* Este archivo es el punto de entrada principal de una aplicación React que utiliza Redux para la gestión del estado. Su función principal es:

  1. Configurar el store de Redux utilizando el reducer importado (noteReducer)

  2. Proveer el store a toda la aplicación mediante el componente <Provider>

  3. Renderizar la aplicación React en el elemento DOM con id "root"

En esencia, este archivo actúa como el puente entre React y Redux, haciendo que el estado global de Redux esté disponible para todos los componentes de la aplicación, permitiendo así una gestión centralizada y predecible del estado. */
