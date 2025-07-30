// Requiere el archivo 'logger' para utilizar sus funciones de registro de mensajes
const logger = require("./logger");

// Define un middleware llamado 'requestLogger' que se ejecuta en cada solicitud entrante
// Registra el método HTTP, la ruta de la solicitud y el cuerpo de la solicitud
const requestLogger = (request, response, next) => {
  // Imprime el método HTTP (GET, POST, etc.)
  logger.info("Method:", request.method);
  // Imprime la ruta solicitada
  logger.info("Path:  ", request.path);
  // Imprime el cuerpo de la solicitud (lo que se envía al servidor)
  logger.info("Body:  ", request.body);
  // Imprime una línea separadora para mayor claridad en los logs
  logger.info("---");
  // Llama al siguiente middleware o manejador de la solicitud
  next();
};

// Define un middleware para manejar rutas desconocidas (cuando el cliente solicita una ruta que no existe)
const unknownEndpoint = (request, response) => {
  // Responde con un error 404 (no encontrado) y un mensaje en formato JSON
  response.status(404).send({ error: "unknown endpoint" });
};

// Define un middleware para manejar errores
const errorHandler = (error, request, response, next) => {
  // Registra el mensaje de error utilizando la función 'error' del logger
  logger.error(error.message);

  // Si el error es un 'CastError', es probable que se haya enviado un ID malformado
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  // Si el error es un 'ValidationError', responde con un error 400 y el mensaje de validación
  else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  // Si el error es un error de MongoDB por clave duplicada (por ejemplo, username único repetido)
  else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    // Devuelve un error 400 con un mensaje personalizado para claves duplicadas
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  }

  // Si el error no es de los tipos anteriores, lo pasa al siguiente manejador de errores
  next(error);
};

// Exporta los tres middlewares para que puedan ser utilizados en otras partes de la aplicación
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};

/* EXPLICACIÓN DEL ARCHIVO:
- Responsabilidad: middleware personalizado.
- Qué hace: 
  - requestLogger: logea cada petición
  - unknownEndpoint: responde con 404 si no encuentra la ruta
  - errorHandler: maneja errores comunes de forma centralizada
*/
