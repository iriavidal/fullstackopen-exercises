// Define una función 'info' que recibe cualquier cantidad de parámetros (...params)
// y los imprime en la consola usando console.log (para mensajes informativos)
const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

// Define una función 'error' que también recibe cualquier cantidad de parámetros
// y los imprime en la consola usando console.error (para mensajes de error)
const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

// Exporta las funciones 'info' y 'error' para que puedan ser usadas en otros archivos del proyecto
module.exports = {
  info,
  error,
};

/* EXPLICACIÓN DEL ARCHIVO:
- Responsabilidad: centraliza los mensajes de log.
- Qué hace: 
  - define funciones info y error para imprimir mensajes en consola
  - se usa para seguimiento de errores y actividad del servidor
*/
