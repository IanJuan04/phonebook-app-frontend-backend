import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import Person from "./models/Person.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;
const url = process.env.MONGODB_URI;
// to see the env, it needs to be installed in the terminal ising npm install dotenv and import it and use .config

mongoose.set("strictQuery", false);
mongoose.connect(url);

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
  const id = request.params.id;
  Person.findById(id).then((person) => response.json(person));
});

// to indicate a unused functio put an "_"
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id).then((_returnStatus) =>
    response.status(204).end()
  );
});

// Create and save objects
// const person = new Person({
//   name: "Adrian Juan",
//   number: "09123456789",
// });

// person.save().then((result) => {
//   console.log("person saved!");
//   mongoose.connection.close();
// });

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({ error: "content missing!" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
