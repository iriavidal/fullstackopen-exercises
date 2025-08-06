// Importa funciones del módulo de pruebas integrado en Node.js
const { test, after, beforeEach, describe } = require("node:test");

// Importa bcrypt para encriptar contraseñas
const bcrypt = require("bcrypt");

// Importa el modelo de usuario de Mongoose
const User = require("../models/user");

// Importa el módulo assert de Node.js para hacer comprobaciones en las pruebas
const assert = require("node:assert");

// Importa mongoose para interactuar con MongoDB
const mongoose = require("mongoose");

// Importa SuperTest para simular peticiones HTTP a la API
const supertest = require("supertest");

// Importa la aplicación Express
const app = require("../app");

// Crea una instancia de SuperTest con la app
const api = supertest(app);

// Importa funciones de ayuda para las pruebas (como obtener usuarios actuales)
const helper = require("./test_helper");

// Grupo de pruebas: cuando inicialmente hay un usuario en la base de datos
describe("when there is initially one user in db", () => {
  // Antes de cada prueba, limpia la base de datos y agrega un usuario "root"
  beforeEach(async () => {
    // Elimina todos los usuarios
    await User.deleteMany({});

    // Crea un hash de contraseña para el usuario
    const passwordHash = await bcrypt.hash("sekret", 10);
    // Crea un nuevo usuario con username "root"
    const user = new User({ username: "root", passwordHash });

    // Guarda el usuario en la base de datos
    await user.save();
  });

  // Prueba: creación exitosa de un nuevo usuario con un username que no existe
  test("creation succeeds with a fresh username", async () => {
    // Obtiene la lista de usuarios antes de la creación
    const usersAtStart = await helper.usersInDb();

    // Define los datos del nuevo usuario
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    // Envía una petición POST para crear el nuevo usuario
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201) // Espera código de respuesta 201 (creado)
      .expect("Content-Type", /application\/json/); // Espera respuesta en JSON

    // Obtiene la lista de usuarios después de la creación
    const usersAtEnd = await helper.usersInDb();
    // Comprueba que hay un usuario más
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    // Extrae los usernames para verificar que el nuevo fue agregado
    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  // Prueba: fallo al crear usuario si el username ya existe
  test("creation fails with proper statuscode and message if username already taken", async () => {
    // Obtiene la lista de usuarios antes del intento
    const usersAtStart = await helper.usersInDb();

    // Define un usuario con username ya existente ("root")
    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    // Intenta crear el usuario y espera un error 400
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400) // Espera código 400 (Bad Request)
      .expect("Content-Type", /application\/json/);

    // Obtiene los usuarios después del intento
    const usersAtEnd = await helper.usersInDb();

    // Comprueba que el mensaje de error menciona que el username debe ser único
    assert(result.body.error.includes("expected `username` to be unique"));

    // Verifica que el número de usuarios no ha cambiado
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

// Cierra la conexión con la base de datos después de todas las pruebas
after(async () => {
  await mongoose.connection.close();
});
