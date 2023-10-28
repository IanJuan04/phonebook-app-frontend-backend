import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use(morgan("dev"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Adrian Juan",
    number: "123-456-7890",
  },
];

function unknownEndpoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

function requestLogger(request, response, next) {
  console.log(`Method: ${request.method}`);
  console.log(`Path: ${request.path}`);
  console.log(`body: ${request.body}`);
  next();
}

function generateId() {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

  return maxId + 1;
}

app.get("/", (request, response) => {
  response.send("Phonebook Contacts");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const person = persons.filter((person) => person.id === id);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({ error: "content missing!" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.status(201).json(person);
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
