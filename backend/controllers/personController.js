import personService from "../services/personService.js";

function getPersons(_req, res) {
  personService.getPersons().then((persons) => res.json(persons));
}

function getPerson(req, res, next) {
  const id = req.params.id;

  personService
    .getPerson(id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }

      return res.json(person);
    })
    .catch((error) => next(error));
}

function createPerson(req, res, next) {
  const body = req.body;
  // if (body.name === undefined) {
  //   return res.status(400).json({ error: "content missing" });
  // }

  personService
    .createPerson(req.body)
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));

  return res.json(person);
}

function deletePerson(req, res) {
  const id = req.params.id;

  personService
    .deletePerson(id)
    .then((_returnedStatus) => res.status(204).end());
}

function editPerson(req, res, next) {
  const id = req.params.id;
  const body = req.body;

  const newPerson = {
    name: body.name,
    number: body.number,
  };

  personService
    .editPerson(id, newPerson)
    .then((updatedPerson) => {
      {
        if (!updatedPerson) {
          return res.status(404).end();
        }

        return res.json(updatedPerson);
      }
    })
    .catch((error) => next(error));
}

export default {
  getPersons,
  getPerson,
  createPerson,
  deletePerson,
  editPerson,
};
