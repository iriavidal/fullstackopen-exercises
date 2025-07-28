// Importa la función 'test' para definir pruebas, y 'after' para ejecutar algo después de todas las pruebas
const { test, after, beforeEach } = require("node:test");
const Note = require("../models/note");
const assert = require("node:assert");

// Importa la librería Mongoose para conectarse y trabajar con MongoDB
const mongoose = require("mongoose");

// Importa funciones de utilidad para pruebas
const helper = require("./test_helper");

// Importa la librería supertest para hacer peticiones HTTP al servidor en los tests
const supertest = require("supertest");

// Importa la aplicación Express (la API que queremos probar)
const app = require("../app");

// Crea una instancia de supertest usando nuestra app, para poder hacer peticiones como si fuéramos un cliente
const api = supertest(app);

/* const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
]; */

// Define una función asíncrona que se ejecutará ANTES de cada prueba (test)
beforeEach(async () => {
  await Note.deleteMany({}); // 1. Elimina TODOS los documentos de la colección 'Note' en MongoDB

  // 2. Itera sobre cada nota en el array 'helper.initialNotes'
  for (let note of helper.initialNotes) {
    let noteObject = new Note(note); // 3. Crea una nueva instancia del modelo Mongoose 'Note'
    await noteObject.save(); // 4. Guarda la instancia en la base de datos (operación asíncrona)
  }
  /* Al hacer esto, nos aseguramos de que la base de datos esté en el mismo estado antes de ejecutar cada prueba. */
});

// Define una prueba que verifica que el endpoint /api/notes devuelve datos en formato JSON
test("notes are returned as json", async () => {
  console.log("entered test");
  await api
    .get("/api/notes") // Realiza una petición GET al endpoint /api/notes
    .expect(200) // Espera que la respuesta tenga un código de estado 200 (OK)
    .expect("Content-Type", /application\/json/); // Espera que el contenido sea del tipo JSON
});

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, helper.initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);

  assert(contents.includes("Browser can execute only JavaScript"));
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, helper.initialNotes.length);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  assert(contents.includes("HTML is easy"));
});

test("a valid note can be added ", async () => {
  // 1. Crea objeto para nueva nota válida
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };

  // 2. Envía una petición POST al endpoint /api/notes
  await api
    .post("/api/notes") // 2.1 Especifica el método HTTP y ruta
    .send(newNote) // 2.2 Adjunta el objeto newNote como cuerpo de la petición
    .expect(201) // 2.3 Verifica que el status code sea 201 (Created)
    .expect("Content-Type", /application\/json/); // 2.4 Verifica que la respuesta sea JSON

  // 3. Obtiene TODAS las notas actuales desde DB
  const notesAtEnd = await helper.notesInDb();

  // 4. Verifica longitud: notas iniciales + 1 nueva
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

  // 5. Extrae solo los contenidos de las notas
  const contents = notesAtEnd.map((n) => n.content);

  // 6. Verifica que el contenido de la nueva nota existe en la lista
  assert(contents.includes("async/await simplifies making async calls"));
});

test("note without content is not added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
});

test.only("a specific note can be viewed", async () => {
  const notesAtStart = await helper.notesInDb();

  const noteToView = notesAtStart[0];
  console.log("Estoy en a specific note can be viewed", notesAtStart[0]);
  console.log("Estoy en a specific note can be viewed", noteToView);
  console.log(
    "Estoy en a specific note can be viewed",
    `/api/notes/${noteToView.id}`
  );

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(resultNote.body, noteToView);
});

test("a note can be deleted", async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  const contents = notesAtEnd.map((r) => r.content);
  assert(!contents.includes(noteToDelete.content));

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
});

// Después de que todas las pruebas hayan terminado, cierra la conexión a la base de datos MongoDB
after(async () => {
  await mongoose.connection.close();
});
