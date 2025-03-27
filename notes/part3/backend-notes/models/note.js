const mongoose = require("mongoose"); // Importa la biblioteca Mongoose para interactuar con MongoDB

mongoose.set("strictQuery", false); // Desactiva el modo "strictQuery" en Mongoose, lo que permite realizar consultas sin necesidad de definir previamente las propiedades en el esquema

const url = process.env.MONGODB_URI; // Obtiene la URL de conexión a MongoDB desde las variables de entorno

console.log("connecting to", url);

mongoose
  .connect(url) // Intenta establecer una conexión con MongoDB usando la URL proporcionada

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Define un esquema de Mongoose para las notas, especificando que cada nota tendrá un campo "content" de tipo String y un campo "important" de tipo Boolean
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  // Esta configuración personaliza cómo se transforma un documento de MongoDB cuando se convierte a JSON
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Crea un modelo de Mongoose basado en el esquema definido y lo exporta para ser usado en otros archivos del proyecto
module.exports = mongoose.model("Note", noteSchema);
