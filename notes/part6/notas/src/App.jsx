// Importa el componente Notes desde el directorio components
// Este componente probablemente muestra la lista de notas
import Notes from "./components/Notes";

// Importa el componente NewNote desde el directorio components
// Este componente probablemente contiene un formulario para crear nuevas notas
import NewNote from "./components/NewNote";

// Importa el componente VisibilityFilter desde el directorio components
// Este componente probablemente contiene controles para filtrar las notas
import VisibilityFilter from "./components/VisibilityFilter";

import noteService from "./services/notes";
import { initializeNotes, setNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// Define el componente principal de la aplicación como una función de flecha
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, []);

  // Retorna la estructura JSX del componente
  return (
    // Contenedor principal div
    <div>
      {/* Componente para crear nuevas notas - normalmente se muestra primero */}
      <NewNote />

      {/* Componente para filtrar la visualización de notas */}
      <VisibilityFilter />

      {/* Componente que muestra la lista de notas */}
      <Notes />
    </div>
  );
};

// Exporta el componente App como exportación por defecto
// Esto permite que sea importado en otros archivos (como index.js)
export default App;

/* Este archivo define el componente principal App de una aplicación de gestión de notas. Su función principal es:

  1. Importar y organizar componentes: Reúne tres componentes principales:

    - NewNote: Para crear nuevas notas

    - VisibilityFilter: Para filtrar la visualización de notas

    - Notes: Para mostrar la lista de notas

  2. Estructurar la interfaz de usuario: Organiza los componentes en un layout simple donde:

    - El formulario de nueva nota aparece primero

    - Los controles de filtro aparecen en medio

    - La lista de notas aparece al final

  3. Actuar como contenedor principal: Sirve como el componente raíz que coordina los diferentes módulos de la aplicación, proporcionando una estructura limpia y organizada para la interfaz de usuario.

Este componente sigue el principio de composición de React, donde componentes más pequeños y especializados se combinan para crear una aplicación completa. */
