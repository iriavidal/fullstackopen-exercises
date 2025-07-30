// Importa el módulo mongoose, que permite interactuar con MongoDB
const mongoose = require("mongoose");

// Define un nuevo esquema de Mongoose para el modelo User
const userSchema = new mongoose.Schema({
  // El nombre de usuario será una cadena de texto
  username: {
    type: String,
    required: true,
    unique: true, // esto asegura la unicidad de username
  },
  // El nombre completo del usuario también será una cadena
  name: String,
  // El hash de la contraseña (nunca se guarda la contraseña en texto plano)
  passwordHash: String,
  // Relación con las notas asociadas a este usuario
  notes: [
    {
      // Cada nota es una referencia a un documento del modelo Note
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

// Modifica el comportamiento por defecto al convertir el documento a JSON
userSchema.set("toJSON", {
  // La función transform permite personalizar qué datos se devuelven
  transform: (document, returnedObject) => {
    // Convierte el _id (tipo ObjectId) a string y lo asigna a id
    returnedObject.id = returnedObject._id.toString();
    // Elimina el campo _id del objeto devuelto
    delete returnedObject._id;
    // Elimina el campo __v (versión interna de Mongoose)
    delete returnedObject.__v;
    // Elimina el passwordHash por razones de seguridad: no debe enviarse al cliente
    delete returnedObject.passwordHash;
  },
});

// Crea el modelo User a partir del esquema definido
const User = mongoose.model("User", userSchema);

// Exporta el modelo para que pueda ser usado en otros archivos
module.exports = User;
