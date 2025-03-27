const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
  response.send("<h1>Phonebook Backend</h1><h2>Iria Vidal</h2>");
});

/* app.get("/info", (request, response) => {
  const now = new Date();

  response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${now}</p>
        `);
}); */

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    console.log("hola");
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      console.log(error);
      response.status(404).end();
    });
});

/* app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
}); */

/* const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const index = persons.findIndex((person) => person.name === body.name);
  if (index !== -1) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
}); */

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
