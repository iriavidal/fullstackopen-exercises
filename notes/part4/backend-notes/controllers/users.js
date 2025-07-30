// Importamos bcrypt para encriptar contraseñas
const bcrypt = require("bcrypt");

// Creamos un nuevo router de Express para manejar rutas relacionadas con usuarios
const usersRouter = require("express").Router();

// Importamos el modelo de usuario para interactuar con la base de datos
const User = require("../models/user");

// Ruta GET para obtener todos los usuarios desde la base de datos
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}) // Busca todos los documentos de la colección "User"
    .populate("notes", {
      // Reemplaza el campo "notes" (array de IDs) en cada usuario...
      content: 1, // ...por los documentos reales de nota, incluyendo solo el campo "content"
      important: 1, // ...y también el campo "important"
    });

  // Devolvemos los usuarios en formato JSON
  response.json(users);
});

// Ruta POST para registrar un nuevo usuario
usersRouter.post("/", async (request, response) => {
  // Extraemos los datos del cuerpo de la petición
  const { username, name, password } = request.body;

  // Definimos el número de rondas de sal para la encriptación
  const saltRounds = 10;

  // Generamos el hash de la contraseña usando bcrypt
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Creamos una nueva instancia de usuario con los datos proporcionados
  const user = new User({
    username,
    name,
    passwordHash, // Guardamos el hash, no la contraseña en texto plano
  });

  // Guardamos el usuario en la base de datos
  const savedUser = await user.save();

  // Devolvemos el usuario guardado con el código 201 (creado)
  response.status(201).json(savedUser);
});

// Exportamos el router para poder usarlo en otros archivos (por ejemplo, app.js)
module.exports = usersRouter;
