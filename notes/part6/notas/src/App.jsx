// Importa el componente NewNote desde la carpeta components
// NewNote es un formulario para agregar nuevas notas
import NewNote from "./components/NewNote";

// Importa el componente Notes desde la carpeta components
// Notes es una lista que muestra todas las notas existentes
import Notes from "./components/Notes";

// Define el componente principal de la aplicación App
const App = () => {
  return (
    // Contenedor principal de la aplicación
    <div>
      {/* Renderiza el componente NewNote que permite agregar nuevas notas */}
      <NewNote />

      {/* Renderiza el componente Notes que muestra la lista de notas */}
      <Notes />
    </div>
  );
};

// Exporta el componente App como exportación por defecto
export default App;

/* Este archivo define el componente principal App de una aplicación de gestión de notas. Es un componente contenedor simple que:

1. Importa e integra dos componentes hijos:

  - NewNote: Un formulario para crear nuevas notas

  - Notes: Una lista que muestra todas las notas existentes

2. Organiza la interfaz de usuario de manera sencilla, colocando el formulario de nueva nota arriba y la lista de notas debajo.

3. Sirve como punto de entrada principal de la aplicación, conectando los diferentes componentes de la interfaz de usuario.

Este archivo demuestra un patrón común en React donde el componente principal (App) actúa como un contenedor que organiza y renderiza otros componentes especializados, creando la estructura básica de la aplicación. */
