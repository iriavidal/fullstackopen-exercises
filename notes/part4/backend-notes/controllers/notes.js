// Importamos el módulo Router de Express y lo guardamos en notesRouter
const notesRouter = require("express").Router();
// Importamos el modelo Note para interactuar con la colección de notas en la base de datos
const Note = require("../models/note");

// Importamos el modelo de usuario para poder asociarlo con la nota
const User = require("../models/user");

// Ruta GET para obtener todas las notas
notesRouter.get("/", async (request, response) => {
  // Buscamos todas las notas en la base de datos
  const notes = await Note.find({});
  // Respondemos con las notas encontradas en formato JSON
  response.json(notes);
});

// Ruta GET para obtener una nota específica por su ID
notesRouter.get("/:id", async (request, response, next) => {
  // Buscamos la nota por su ID usando el parámetro de la URL
  const note = await Note.findById(request.params.id);

  if (note) {
    // Si se encuentra la nota, se envía como respuesta en formato JSON
    response.json(note);
  } else {
    // Si no se encuentra la nota, se responde con un estado 404 (no encontrado)
    response.status(404).end();
  }
});

// Ruta POST para crear una nueva nota
notesRouter.post("/", async (request, response, next) => {
  // Obtenemos el contenido enviado en el cuerpo de la petición
  const body = request.body;

  // Buscamos al usuario correspondiente en la base de datos usando el ID recibido
  const user = await User.findById(body.userId);

  // Creamos una nueva instancia del modelo Note con el contenido recibido
  const note = new Note({
    content: body.content, // El contenido de la nota
    important: body.important || false, // Si no se indica "important", se asume false
    user: user.id, // Asociamos la nota al usuario correspondiente
  });

  // Guardamos la nueva nota en la base de datos
  const savedNote = await note.save();

  // Actualizamos la propiedad "notes" del usuario para incluir esta nueva nota
  user.notes = user.notes.concat(savedNote._id);
  await user.save(); // Guardamos el usuario actualizado

  // Respondemos con la nota guardada y el código 201 (creado)
  response.status(201).json(savedNote);
});

// Ruta DELETE para eliminar una nota por su ID
notesRouter.delete("/:id", async (request, response, next) => {
  // Buscamos y eliminamos la nota correspondiente al ID recibido
  await Note.findByIdAndDelete(request.params.id);

  // Respondemos con estado 204 (sin contenido) si la eliminación fue exitosa
  response.status(204).end();
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
