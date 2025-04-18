// Importamos el módulo Router de Express y lo guardamos en notesRouter
const notesRouter = require("express").Router();
// Importamos el modelo Note para interactuar con la colección de notas en la base de datos
const Note = require("../models/note");

// Ruta GET para obtener todas las notas
notesRouter.get("/", async (request, response) => {
  // Buscamos todas las notas en la base de datos
  const notes = await Note.find({});
  // Respondemos con las notas encontradas en formato JSON
  response.json(notes);
});

// Ruta GET para obtener una nota específica por su ID
notesRouter.get("/:id", (request, response, next) => {
  // Buscamos la nota por su ID usando el parámetro de la URL
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        // Si se encuentra la nota, se envía como respuesta en formato JSON
        response.json(note);
      } else {
        // Si no se encuentra la nota, se responde con un estado 404 (no encontrado)
        response.status(404).end();
      }
    })
    // Si ocurre un error (por ejemplo, ID mal formado), se pasa al middleware de manejo de errores
    .catch((error) => next(error));
});

// Ruta POST para crear una nueva nota
notesRouter.post("/", (request, response, next) => {
  // Obtenemos el contenido enviado en el cuerpo de la petición
  const body = request.body;

  // Creamos una nueva instancia del modelo Note con el contenido y la importancia
  const note = new Note({
    content: body.content,
    important: body.important || false, // Si no se indica "important", se asume false
  });

  // Guardamos la nueva nota en la base de datos
  note
    .save()
    .then((savedNote) => {
      // Respondemos con la nota guardada
      response.json(savedNote);
    })
    // En caso de error (por ejemplo, validación), lo pasamos al middleware de errores
    .catch((error) => next(error));
});

// Ruta DELETE para eliminar una nota por su ID
notesRouter.delete("/:id", (request, response, next) => {
  // Buscamos y eliminamos la nota correspondiente al ID recibido
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      // Respondemos con estado 204 (sin contenido) si la eliminación fue exitosa
      response.status(204).end();
    })
    // En caso de error, lo pasamos al middleware de errores
    .catch((error) => next(error));
});

// Ruta PUT para actualizar una nota por su ID
notesRouter.put("/:id", (request, response, next) => {
  // Obtenemos el contenido actualizado desde el cuerpo de la petición
  const body = request.body;

  // Creamos un objeto con los nuevos datos que queremos guardar
  const note = {
    content: body.content,
    important: body.important,
  };

  // Buscamos y actualizamos la nota, devolviendo la versión actualizada ({ new: true })
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      // Respondemos con la nota actualizada
      response.json(updatedNote);
    })
    // En caso de error, lo pasamos al middleware de errores
    .catch((error) => next(error));
});

// Exportamos el router para poder usarlo en otros archivos (por ejemplo, en app.js)
module.exports = notesRouter;

/*
EXPLICACIÓN DEL ARCHIVO:
- Responsabilidad: define las rutas específicas para operaciones CRUD sobre notas.
- Conexión: usa el modelo Note para interactuar con la base de datos MongoDB a través de Mongoose.
*/
