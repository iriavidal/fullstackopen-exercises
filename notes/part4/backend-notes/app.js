// Importa la configuración desde un archivo externo (por ejemplo, variables de entorno)
const config = require("./utils/config");

// Importa Express, el framework web que usaremos para crear el servidor
const express = require("express");

// Importa el módulo 'express-async-errors' para manejar errores en funciones asíncronas automáticamente
require("express-async-errors");

// Crea una instancia de la aplicación Express
const app = express();

// Importa el middleware CORS para permitir peticiones desde otros orígenes (como el frontend)
const cors = require("cors");

// Importa el router que gestiona las rutas relacionadas con "notes"
const notesRouter = require("./controllers/notes");

// Importa middlewares personalizados (para manejar errores y logs)
const middleware = require("./utils/middleware");

// Importa el logger, que se usa para imprimir información en consola
const logger = require("./utils/logger");

// Importa Mongoose, que se usa para conectarse y trabajar con MongoDB
const mongoose = require("mongoose");

// Desactiva una advertencia de Mongoose sobre el uso de filtros no estrictos
mongoose.set("strictQuery", false);

// Imprime en consola a qué URI se intentará conectar la base de datos
logger.info("connecting to", config.MONGODB_URI);

// Conecta a la base de datos MongoDB usando la URI que viene de las variables de entorno
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    // Si la conexión es exitosa, lo indica en consola
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    // Si ocurre un error al conectar, lo muestra en consola
    logger.error("error connection to MongoDB:", error.message);
  });

// Habilita CORS para que la API pueda ser accedida desde otros orígenes (como React frontend)
app.use(cors());

// Sirve archivos estáticos desde la carpeta "dist" (normalmente el frontend compilado)
app.use(express.static("dist"));

// Habilita la recepción de JSON en el cuerpo de las peticiones
app.use(express.json());

// Usa un middleware que registra todas las peticiones que llegan al servidor (útil para debug)
app.use(middleware.requestLogger);

// Todas las rutas que empiecen con "/api/notes" serán manejadas por el router importado
app.use("/api/notes", notesRouter);

// Middleware para manejar peticiones a endpoints desconocidos (404)
app.use(middleware.unknownEndpoint);

// Middleware para manejar errores que ocurran durante las peticiones
app.use(middleware.errorHandler);

// Exporta la app configurada para que pueda ser utilizada en el archivo que lanza el servidor (por ejemplo, index.js)
module.exports = app;

/* EXPLICACIÓN DEL ARCHIVO:
- Responsabilidad: configura y crea la aplicación express.
- Qué hace: 
  - se conecta a mongodb
  - usa middleware como logger, error handler, etc.
  - define rutas (/api/notes)
- Conexión: 
  - usa config.js para la uri de mongodb
  - usa middleware.js para logging y errores
  - usa notesRouter para manejar las rutas
*/
