// Importa la aplicación Express configurada desde 'app.js'
const app = require("./app"); // The Express app

// Importa la configuración, incluyendo la variable de entorno PORT
const config = require("./utils/config");

// Importa el logger para mostrar mensajes en consola
const logger = require("./utils/logger");

// Inicia el servidor Express, escuchando en el puerto especificado en la configuración
app.listen(config.PORT, () => {
  // Muestra en consola que el servidor se ha iniciado correctamente y en qué puerto está escuchando
  logger.info(`Server running on port ${config.PORT}`);
});

/* EXPLICACIÓN DEL ARCHIVO:
- Responsabilidad: punto de entrada del servidor.
- Qué hace: importa app desde app.js, y pone a escuchar el servidor en el puerto definido en las variables de entorno.
- Conexión: usa config.js para leer el puerto y logger.js para mostrar logs.
*/
