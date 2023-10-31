import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();
const PORT = 3001;
const url = `mongodb+srv://juanadrianpaul:MikwIc8fSLa7qbYF@cluster0.rjnjn9l.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]:body")
);

app.use(express.static("dist"));

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Adrian Juan",
//     number: "123-456-7890",
//   },
// ];

function unknownEndpoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

function generateId() {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

  return maxId + 1;
}

app.get("/", (request, response) => {
  response.send("Phonebook Contacts");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
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
