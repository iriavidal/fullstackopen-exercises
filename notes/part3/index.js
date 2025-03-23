const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>"); // Establece automáticamente la cabecera "Content-Type text/html"
});

app.get("/api/notes", (request, response) => {
  response.json(notes); // Establece automáticamente la cabecera "Content-Type application/json"
});

// Obtener una sola nota a partir de su id
app.get("/api/notes/:id", (request, response) => {
  /* const id = request.params.id;
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });
  console.log(note);
  response.json(note); */

  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
    /* Dado que no se adjuntan datos a la respuesta, utilizamos el método status para establecer el estado y el método end para responder a la solicitud sin enviar ningún dato. */
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
