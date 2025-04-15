// Define una función 'info' que recibe cualquier cantidad de parámetros (...params)
// y los imprime en la consola usando console.log (para mensajes informativos)
const info = (...params) => {
  console.log(...params);
};

// Define una función 'error' que también recibe cualquier cantidad de parámetros
// y los imprime en la consola usando console.error (para mensajes de error)
const error = (...params) => {
  console.error(...params);
};

// Exporta las funciones 'info' y 'error' para que puedan ser usadas en otros archivos del proyecto
module.exports = {
  info,
  error,
};
