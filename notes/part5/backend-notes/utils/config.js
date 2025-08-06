// Carga las variables de entorno desde un archivo .env en process.env
require("dotenv").config();

// Obtiene el valor de la variable de entorno PORT (puerto en el que se ejecutará el servidor)
const PORT = process.env.PORT;

// Selecciona la URI de la base de datos según el entorno:
// - Si NODE_ENV es "test", usa TEST_MONGODB_URI (base de datos para pruebas)
// - En cualquier otro caso, usa MONGODB_URI (base de datos principal)
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

// Exporta las variables como un objeto para poder usarlas en otras partes del proyecto
module.exports = {
  MONGODB_URI,
  PORT,
};

/* EXPLICACIÓN DEL ARCHIVO:
- Responsabilidad: manejar las variables de entorno.
- Qué hace: 
  - usa dotenv para cargar .env
  - exporta PORT y MONGODB_URI para que otros archivos las usen
*/
