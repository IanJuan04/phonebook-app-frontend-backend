import { response } from "express";
import Person from "../models/Person.js";

function getPersons() {
  return Person.find({}).then((persons) => persons);
}

function getPerson(id) {
  return Person.findById(id).then((person) => person);
}

async function createPerson({ name, number }) {
  return Person.create({
    name,
    number,
  }).then((savedPerson) => savedPerson);
}

function deletePerson(id) {
  return Person.findByIdAndDelete(id).then((returnStatus) => returnStatus);
}

function editPerson(id, newPerson) {
  return Person.findByIdAndUpdate(id, newPerson, { new: true }).then(
    (updatedPerson) => updatedPerson
  );
}

export default {
  createPerson,
  getPersons,
  getPerson,
  deletePerson,
};
