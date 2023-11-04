import personService from "../services/personService.js";

function getPersons(_req, res) {
  personService.getPersons().then((persons) => res.json(persons));
}

function getPerson(req, res) {
  const id = req.params.id;

  personService.getPerson(id).then((person) => res.json(person));
}

async function createPerson(req, res) {
  personService
    .createPerson(req.body)
    .then((savedPerson) => res.json(savedPerson));

  return res.json(person);
}

function deletePerson(req, res) {
  const id = req.params.id;

  personService
    .deletePerson(id)
    .then((_returnedStatus) => res.status(204).end());
}

export default {
  getPersons,
  getPerson,
  createPerson,
  deletePerson,
};
