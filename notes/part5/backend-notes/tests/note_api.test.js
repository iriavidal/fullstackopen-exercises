// Importa las funciones necesarias de node:test para definir tests
const { test, after, beforeEach, describe } = require("node:test");

// Importa el módulo assert para hacer comprobaciones en los tests
const assert = require("node:assert");

// Importa mongoose para manejar la conexión con la base de datos
const mongoose = require("mongoose");

// Importa supertest, que permite hacer peticiones HTTP en los tests
const supertest = require("supertest");

// Importa la aplicación Express que se va a testear
const app = require("../app");

// Crea una instancia de supertest ligada a la app
const api = supertest(app);

// Importa funciones y datos de ayuda para los tests
const helper = require("./test_helper");

// Importa el modelo Note para interactuar con la colección de notas en la base de datos
const Note = require("../models/note");

// Agrupa tests relacionados con el estado inicial de la base de datos
describe("when there is initially some notes saved", () => {
  // Antes de cada test, borra todas las notas y añade unas de prueba
  beforeEach(async () => {
    await Note.deleteMany({});
    await Note.insertMany(helper.initialNotes);
  });

  // Test: verifica que la respuesta del endpoint sea JSON
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200) // espera un código 200 OK
      .expect("Content-Type", /application\/json/); // espera formato JSON
  });

  // Test: verifica que se devuelven todas las notas esperadas
  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");
    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });

  // Test: verifica que una nota específica está entre las devueltas
  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");
    const contents = response.body.map((r) => r.content);
    assert(contents.includes("Browser can execute only JavaScript"));
  });

  // Agrupa tests relacionados con la visualización de una nota específica
  describe("viewing a specific note", () => {
    // Test: la petición con un ID válido debe devolver la nota correspondiente
    test("succeeds with a valid id", async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    // Test: si el ID no existe, debe responder con 404
    test("fails with statuscode 404 if note does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();
      await api.get(`/api/notes/${validNonexistingId}`).expect(404);
    });

    // Test: si el ID es inválido, debe responder con 400
    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445"; // ID mal formado
      await api.get(`/api/notes/${invalidId}`).expect(400);
    });
  });

  // Agrupa tests relacionados con la creación de nuevas notas
  describe("addition of a new note", () => {
    // Test: crear una nota con datos válidos debe funcionar
    test("succeeds with valid data", async () => {
      const newNote = {
        content: "async/await simplifies making async calls",
        important: true,
      };

      await api
        .post("/api/notes")
        .send(newNote)
        .expect(201) // espera un código 201 Created
        .expect("Content-Type", /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

      const contents = notesAtEnd.map((n) => n.content);
      assert(contents.includes("async/await simplifies making async calls"));
    });

    // Test: si el contenido es inválido, debe devolver 400 y no guardar la nota
    test("fails with status code 400 if data invalid", async () => {
      const newNote = {
        important: true,
      };

      await api.post("/api/notes").send(newNote).expect(400);

      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
    });
  });

  // Agrupa tests relacionados con la eliminación de notas
  describe("deletion of a note", () => {
    // Test: eliminar una nota válida debe devolver 204 y quitarla de la base de datos
    test("succeeds with status code 204 if id is valid", async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);

      const contents = notesAtEnd.map((r) => r.content);
      assert(!contents.includes(noteToDelete.content));
    });
  });
});

// Al finalizar todos los tests, cierra la conexión a la base de datos
after(async () => {
  await mongoose.connection.close();
});
