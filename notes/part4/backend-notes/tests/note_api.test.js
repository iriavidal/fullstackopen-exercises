// Importa la función 'test' para definir pruebas, y 'after' para ejecutar algo después de todas las pruebas
const { test, after, beforeEach } = require("node:test");
const Note = require("../models/note");
const assert = require("node:assert");

// Importa la librería Mongoose para conectarse y trabajar con MongoDB
const mongoose = require("mongoose");

// Importa la librería supertest para hacer peticiones HTTP al servidor en los tests
const supertest = require("supertest");

// Importa la aplicación Express (la API que queremos probar)
const app = require("../app");

// Crea una instancia de supertest usando nuestra app, para poder hacer peticiones como si fuéramos un cliente
const api = supertest(app);

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

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

/* La base de datos se borra al principio, y luego guardamos las dos notas almacenadas en el array initialNotes en la base de datos. Al hacer esto, nos aseguramos de que la base de datos esté en el mismo estado antes de ejecutar cada prueba. */

// Define una prueba que verifica que el endpoint /api/notes devuelve datos en formato JSON
test.only("notes are returned as json", async () => {
  await api
    .get("/api/notes") // Realiza una petición GET al endpoint /api/notes
    .expect(200) // Espera que la respuesta tenga un código de estado 200 (OK)
    .expect("Content-Type", /application\/json/); // Espera que el contenido sea del tipo JSON
});

test.only("there are two notes", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, initialNotes.length);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  assert(contents.includes("HTML is easy"));
});

// Después de que todas las pruebas hayan terminado, cierra la conexión a la base de datos MongoDB
after(async () => {
  await mongoose.connection.close();
});
