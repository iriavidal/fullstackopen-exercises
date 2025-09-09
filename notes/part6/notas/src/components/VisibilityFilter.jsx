/* eslint-disable no-unused-vars */

// Importa el action creator filterChange desde el archivo del reducer de filtros
import { filterChange } from "../reducers/filterReducer";

// Importa el hook useDispatch de react-redux para poder despachar acciones
import { useDispatch } from "react-redux";

// Define el componente funcional VisibilityFilter
// Recibe props como parámetro (aunque no se utilizan en este componente)
const VisibilityFilter = (props) => {
  // Inicializa useDispatch para obtener la función dispatch
  const dispatch = useDispatch();

  return (
    // Contenedor div para los elementos de filtro
    <div>
      {/* Texto "all" para el primer filtro */}
      all
      {/* Input de tipo radio para seleccionar el filtro "ALL" */}
      <input
        type="radio" // Tipo radio button (solo se puede seleccionar uno)
        name="filter" // Mismo nombre para todos los radios (grupo lógico)
        // Cuando cambia la selección, despacha la acción filterChange con "ALL"
        onChange={() => dispatch(filterChange("ALL"))}
      />
      {/* Texto "important" para el segundo filtro */}
      important
      {/* Input de tipo radio para seleccionar el filtro "IMPORTANT" */}
      <input
        type="radio"
        name="filter"
        // Cuando cambia la selección, despacha la acción filterChange con "IMPORTANT"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      {/* Texto "nonimportant" para el tercer filtro */}
      nonimportant
      {/* Input de tipo radio para seleccionar el filtro "NONIMPORTANT" */}
      <input
        type="radio"
        name="filter"
        // Cuando cambia la selección, despacha la acción filterChange con "NONIMPORTANT"
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      />
    </div>
  );
};

// Exporta el componente VisibilityFilter como exportación por defecto
export default VisibilityFilter;

/* Este archivo define un componente de React llamado VisibilityFilter que renderiza un conjunto de botones de radio para controlar la visualización de elementos (probablemente notas) en una aplicación. Su función principal es:

  1. Proporcionar controles de filtrado: Ofrece tres opciones de filtro ("all", "important", "nonimportant") mediante botones de radio.

  2. Gestionar el estado de Redux: Al seleccionar cualquier opción, despacha una acción filterChange al store de Redux con el valor del filtro correspondiente.

  3. Interfaz de usuario simple: Presenta una interfaz minimalista con etiquetas de texto y botones de radio para que el usuario pueda cambiar entre diferentes vistas filtradas.

Este componente se integra con Redux para gestionar el estado del filtro actual, permitiendo que otros componentes (como una lista de notas) reaccionen a los cambios y muestren solo los elementos que coincidan con el filtro seleccionado. */
