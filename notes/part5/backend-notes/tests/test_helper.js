// Importa el modelo de Mongoose para las notas
const Note = require("../models/note");

// Importa el modelo de Mongoose para los usuarios
const User = require("../models/user");

// Define un conjunto inicial de notas para usar en las pruebas
const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

// Genera un ID que no existe en la base de datos (para pruebas de error)
const nonExistingId = async () => {
  // Crea una nota temporal en memoria
  const note = new Note({ content: "willremovethissoon" });
  // Guarda la nota en la DB (para generar ID válido)
  await note.save();
  // Elimina inmediatamente la nota
  await note.deleteOne();

  // Retorna el ID de la nota borrada (válido pero no existente)
  return note._id.toString();
};

// Obtiene todas las notas de la DB en formato JSON plano
const notesInDb = async () => {
  // Busca TODAS las notas en la base de datos
  const notes = await Note.find({});
  // Convierte cada documento Mongoose a objeto JavaScript simple
  return notes.map((note) => note.toJSON());
};

// Función asincrónica que devuelve todos los usuarios de la base de datos en formato JSON
const usersInDb = async () => {
  // Buscamos todos los usuarios en la base de datos
  const users = await User.find({});
  // Convertimos cada usuario a JSON utilizando el método definido en el modelo
  return users.map((u) => u.toJSON());
};

// Exporta las utilidades para usar en los tests
module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
