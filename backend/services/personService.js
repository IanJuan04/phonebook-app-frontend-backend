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

export default {
  createPerson,
  getPersons,
  getPerson,
  deletePerson,
};
