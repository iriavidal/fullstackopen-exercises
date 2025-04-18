// Importamos el módulo Router de Express para crear rutas separadas
const notesRouter = require("express").Router();

// Importamos el modelo de Note (nota), que define cómo se guarda en la base de datos
const Note = require("../models/note");

// Ruta GET para obtener todas las notas
notesRouter.get("/", (request, response) => {
  // Buscamos todas las notas en la base de datos
  Note.find({}).then((notes) => {
    // Enviamos las notas como respuesta en formato JSON
    response.json(notes);
  });
});

// Ruta GET para obtener una nota específica por su id
notesRouter.get("/:id", (request, response, next) => {
  // Buscamos la nota en la base de datos usando el id que llega por la URL
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        // Si la nota existe, la enviamos como respuesta en formato JSON
        response.json(note);
      } else {
        // Si no se encuentra la nota, devolvemos un estado 404 (no encontrado)
        response.status(404).end();
      }
    })
    // Si hay un error (por ejemplo, id malformado), se pasa al middleware de errores
    .catch((error) => next(error));
});

// Ruta POST para crear una nueva nota
notesRouter.post("/", (request, response, next) => {
  // Obtenemos los datos enviados en el cuerpo de la solicitud
  const body = request.body;

  // Creamos una nueva instancia del modelo Note
  const note = new Note({
    content: body.content, // El contenido de la nota
    important: body.important || false, // Si es importante o no (por defecto false)
  });

  // Guardamos la nota en la base de datos
  note
    .save()
    .then((savedNote) => {
      // Devolvemos la nota guardada como respuesta en formato JSON
      response.json(savedNote);
    })
    // Si hay un error (por ejemplo, campos inválidos), lo pasamos al middleware de errores
    .catch((error) => next(error));
});

// Ruta DELETE para eliminar una nota por su id
notesRouter.delete("/:id", (request, response, next) => {
  // Buscamos y eliminamos la nota por su id
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      // Devolvemos un estado 204 (sin contenido) si la eliminación fue exitosa
      response.status(204).end();
    })
    // Si hay un error (por ejemplo, id malformado), lo pasamos al middleware de errores
    .catch((error) => next(error));
});

// Ruta PUT para actualizar una nota existente
notesRouter.put("/:id", (request, response, next) => {
  // Obtenemos los nuevos datos del cuerpo de la solicitud
  const body = request.body;

  // Creamos un objeto con los datos actualizados
  const note = {
    content: body.content, // Nuevo contenido
    important: body.important, // Nuevo estado de importancia
  };

  // Buscamos la nota por id y la actualizamos con los nuevos datos
  // La opción { new: true } hace que el método devuelva la nota actualizada
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      // Enviamos la nota actualizada como respuesta en formato JSON
      response.json(updatedNote);
    })
    // Si hay un error (por ejemplo, validación), lo pasamos al middleware de errores
    .catch((error) => next(error));
});

// Ejemplo de función asíncrona
const main = async () => {
  const notes = await Note.find({});
  console.log("operation returned the following notes", notes);

  const noteToRemove = notes[0];

  if (noteToRemove) {
    await Note.deleteOne({ _id: noteToRemove._id });
    console.log("The first note is removed");
  } else {
    console.log("No notes to remove");
  }
};

main();

// Exportamos el router para poder usarlo en otros archivos (por ejemplo, en app.js)
module.exports = notesRouter;

/* EXPLICACIÓN DEL ARCHIVO:
- Responsabilidad: define las rutas específicas del blog.
- Conexión: usa el modelo Note para interactuar con la base de datos.
*/
