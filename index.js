const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

// app.use(morgan("tiny"));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "111-222-1212",
  },
  {
    id: 2,
    name: "Ben Franklin",
    number: "333-444-3434",
  },
  {
    id: 3,
    name: "Damian Lillard",
    number: "000-000-0000",
  },
  {
    id: 4,
    name: "Marcus Mariota",
    number: "888-888-8888",
  },
];

app.get("/info", (request, response) => {
  const info = `Phonebook has ${persons.length} contacts`;
  const date = new Date();

  const allInfo = `<p> ${info} </p> <br> <p>${date}</p>`;

  response.send(allInfo);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const newId = () => {
  const id = Math.floor(Math.random() * 1000);
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const existingName = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "not enough info to create contact",
    });
  }
  if (existingName) {
    return response.status(400).json({
      error: "name already exists in phonebook",
    });
  }

  const person = {
    id: newId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(persons);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
