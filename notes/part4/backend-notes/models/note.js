// Importamos Mongoose, una biblioteca que facilita la interacción con bases de datos MongoDB
const mongoose = require("mongoose");

// Definimos el esquema de una "nota", que indica cómo se guardará en la base de datos
const noteSchema = new mongoose.Schema({
  content: {
    type: String, // El contenido de la nota debe ser una cadena de texto
    required: true, // Este campo es obligatorio
    minlength: 5, // El contenido debe tener al menos 5 caracteres
  },
  important: Boolean, // Campo opcional que indica si la nota es importante o no
});

// Modificamos cómo se convierte una nota a JSON (por ejemplo, al enviarla al frontend)
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // Reemplazamos _id (que es el identificador de MongoDB) por id en formato string
    returnedObject.id = returnedObject._id.toString();
    // Eliminamos _id para que no se duplique con id
    delete returnedObject._id;
    // Eliminamos __v (campo interno de Mongoose que indica la versión del documento)
    delete returnedObject.__v;
  },
});

// Exportamos el modelo para que pueda usarse en otros archivos
// Este modelo se basa en el esquema definido y se llamará 'Note' en la base de datos
module.exports = mongoose.model("Note", noteSchema);
