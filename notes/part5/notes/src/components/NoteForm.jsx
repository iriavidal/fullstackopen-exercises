/* eslint-disable react/prop-types */ // Desactiva la regla de ESLint que obliga a definir propTypes para los props

// Definición del componente funcional "NoteForm"
// Recibe props desestructuradas:
// - onSubmit: función que se ejecuta al enviar el formulario
// - handleChange: función que se ejecuta cuando cambia el valor del input
// - value: valor actual del input (estado controlado)
const NoteForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      {/* Título del formulario */}
      <h2>Create a new note</h2>

      {/* Formulario: se ejecuta la función onSubmit al enviarlo */}
      <form onSubmit={onSubmit}>
        {/* Campo de texto controlado para escribir la nota
            - value usa el estado que viene en 'value'
            - onChange llama a handleChange para actualizar el estado */}
        <input value={value} onChange={handleChange} />

        {/* Botón para enviar el formulario */}
        <button type="submit">save</button>
      </form>
    </div>
  );
};

// Exporta el componente para que pueda ser usado en otros archivos
export default NoteForm;
