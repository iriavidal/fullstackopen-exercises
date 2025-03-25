const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://iriavidal96:${password}@cluster0.wpnfh.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;
// Añadido noteApp a la url posteriormente

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// Añadir nota
/* const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
}); */

// Obtener todas las notas
/* Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
}); */

// Obtener solo notas impotantes
Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
