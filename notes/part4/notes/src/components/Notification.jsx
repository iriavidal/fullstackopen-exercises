const Notification = ({ message }) => {
  // Componente funcional que recibe `message` como prop.

  if (message === null) {
    return null;
    // Si `message` es null, no muestra nada en la interfaz.
  }

  return <div className="error">{message}</div>;
  // Si `message` tiene un valor, lo muestra dentro de un <div> con la clase "error".
};

export default Notification;
// Exporta el componente para que pueda ser utilizado en otros archivos.
