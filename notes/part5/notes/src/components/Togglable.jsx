/* eslint-disable react/prop-types */
// Desactiva la regla de ESLint que obliga a definir propTypes para los props

import { useState } from "react";
// Importa el hook useState de React para manejar el estado local

// Definición del componente funcional "Togglable"
// Este componente recibe props:
// - buttonLabel: texto del botón que muestra el contenido
// - children: cualquier contenido que se renderiza dentro cuando está visible
const Togglable = (props) => {
  // Estado "visible" indica si el contenido está visible (true) o no (false)
  // Por defecto, empieza como false (contenido oculto)
  const [visible, setVisible] = useState(false);

  // Estilo para ocultar el contenido cuando "visible" es true
  const hideWhenVisible = { display: visible ? "none" : "" };
  // Estilo para mostrar el contenido cuando "visible" es true
  const showWhenVisible = { display: visible ? "" : "none" };

  // Función que invierte el valor de "visible"
  // Si estaba oculto, lo muestra; si estaba visible, lo oculta
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // Renderizado del componente
  return (
    <div>
      {/* Botón que se muestra solo cuando el contenido está oculto */}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      {/* Contenido que se muestra solo cuando está visible */}
      <div style={showWhenVisible}>
        {/* props.children representa el contenido interno que se pasa al componente */}
        {props.children}

        {/* Botón para ocultar el contenido */}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

// Exporta el componente para que pueda usarse en otros archivos
export default Togglable;
