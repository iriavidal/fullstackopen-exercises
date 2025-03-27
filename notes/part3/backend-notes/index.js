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
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

// 📌 Agregar una nueva nota
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// 📌 Eliminar una nota
/* app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
}); */

// 📌 5. MANEJO DE ERRORES
// Middleware para manejar rutas desconocidas (errores 404)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint); // Aplica el middleware a todas las solicitudes que no coincidan con una ruta

// 📌 6. INICIAR EL SERVIDOR
// Define el puerto en el que el servidor escuchará las peticiones
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
