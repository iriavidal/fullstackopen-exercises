// Carga las variables de entorno desde un archivo .env en process.env
require("dotenv").config();

// Obtiene el valor de la variable de entorno PORT (puerto en el que se ejecutará el servidor)
let PORT = process.env.PORT;

// Obtiene el valor de la variable de entorno MONGODB_URI (cadena de conexión a MongoDB)
let MONGODB_URI = process.env.MONGODB_URI;

// Exporta las variables como un objeto para poder usarlas en otras partes del proyecto
module.exports = {
  MONGODB_URI,
  PORT,
};
