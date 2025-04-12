// 📌 1. IMPORTACIONES Y CONFIGURACIÓN INICIAL
require("dotenv").config(); // Carga las variables de entorno desde el archivo .env

const express = require("express"); // Importa el framework Express para manejar el servidor web
const cors = require("cors"); // Importa CORS para permitir solicitudes desde otros dominios
const mongoose = require("mongoose"); // Importa Mongoose para trabajar con MongoDB
const Note = require("./models/note"); // Importa el modelo Note para interactuar con MongoDB

const app = express(); // Crea una instancia de la aplicación Express
app.use(express.json()); // Middleware para parsear JSON en las solicitudes entrantes
app.use(cors()); // Habilita CORS para permitir peticiones desde diferentes orígenes
app.use(express.static("dist")); // Hace que Express busque archivos en la carpeta "dist" y los sirva directamente al navegador

// 📌 2. CONEXIÓN A LA BASE DE DATOS
const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// 📌 3. MIDDLEWARES
// Middleware para registrar información de cada solicitud en la consola
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next(); // Llama a la siguiente función middleware
};

app.use(requestLogger); // Aplica el middleware a todas las solicitudes

// 📌 4. RUTAS

// 📝 Ruta principal
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// 📌 Obtener todas las notas
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// 📌 Obtener una nota por ID
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })

    .catch((error) => next(error));
});

// 📌 Agregar una nueva nota
app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })

    .catch((error) => next(error));
});

// 📌 Eliminar una nota
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// 📌 Modificar una nota
app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" } // Configura la actualización:
    // - 'new: true' devuelve el documento actualizado en lugar del original
    // - 'runValidators: true' aplica las validaciones del esquema de Mongoose
    // - 'context: "query"' asegura que las validaciones funcionen correctamente en la consulta
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// 📌 5. MANEJO DE ERRORES
// Middleware para manejar rutas desconocidas (errores 404)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint); // Aplica el middleware a todas las solicitudes que no coincidan con una ruta

// Middleware para manejar errores
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler); // Éste debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!

// 📌 6. INICIAR EL SERVIDOR
// Define el puerto en el que el servidor escuchará las peticiones
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
