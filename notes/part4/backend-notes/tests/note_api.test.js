// Importa la función 'test' para definir pruebas, y 'after' para ejecutar algo después de todas las pruebas
const { test, after } = require("node:test");

// Importa la librería Mongoose para conectarse y trabajar con MongoDB
const mongoose = require("mongoose");

// Importa la librería supertest para hacer peticiones HTTP al servidor en los tests
const supertest = require("supertest");

// Importa la aplicación Express (la API que queremos probar)
const app = require("../app");

// Crea una instancia de supertest usando nuestra app, para poder hacer peticiones como si fuéramos un cliente
const api = supertest(app);

// Define una prueba que verifica que el endpoint /api/notes devuelve datos en formato JSON
test("notes are returned as json", async () => {
  await api
    .get("/api/notes") // Realiza una petición GET al endpoint /api/notes
    .expect(200) // Espera que la respuesta tenga un código de estado 200 (OK)
    .expect("Content-Type", /application\/json/); // Espera que el contenido sea del tipo JSON
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, 2);
});

/* test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  assert.strictEqual(contents.includes("HTML is easy"), true);
}); */
test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  // es el argumento truthy
  assert(contents.includes("HTML is easy"));
});

// Después de que todas las pruebas hayan terminado, cierra la conexión a la base de datos MongoDB
after(async () => {
  await mongoose.connection.close();
});
