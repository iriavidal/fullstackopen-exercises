const Note = ({ note, toggleImportance }) => {
  // Componente funcional que recibe un objeto `note` y una función `toggleImportance` como props.

  const label = note.important ? "make not important" : "make important";
  // Define el texto del botón en función de si la nota es importante o no.

  return (
    <li className="note">
      {/* Muestra el contenido de la nota dentro de un elemento <li> con la clase "note". */}
      {note.content} -<button onClick={toggleImportance}>{label}</button>
      {/* Botón que al hacer clic llama a la función `toggleImportance` para cambiar la importancia de la nota. */}
    </li>
  );
};

export default Note; // Exporta el componente para que pueda ser utilizado en otros archivos.
