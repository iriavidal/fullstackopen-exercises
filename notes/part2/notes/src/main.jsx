import ReactDOM from "react-dom/client";
// Importa el módulo de ReactDOM para manipular el DOM en una aplicación React.

import App from "./App";
// Importa el componente principal de la aplicación desde el archivo "App.js".

import "./index.css";
// Importa los estilos CSS globales de la aplicación desde "index.css".

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
// Selecciona el elemento con el id "root" en el HTML y lo convierte en un "root" de React.
// Luego, renderiza el componente <App /> dentro de este elemento.
