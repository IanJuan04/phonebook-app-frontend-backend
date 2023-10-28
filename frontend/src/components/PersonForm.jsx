import { useState } from "react";
import personService from "../services/persons";

function PersonForm({ persons, setPersons, setResults, setNotification }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPerson).then((retrurnedPerson) => {
      setPersons(persons.concat(retrurnedPerson));
      setResults(persons.concat(retrurnedPerson));
      setNotification(`Added ${retrurnedPerson.name}`);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewNumber = (e) => setNewNumber(e.target.value);

  return (
    <form
      className="bg-slate-100 p-8 flex items-center gap-4"
      onSubmit={addPerson}
    >
      <div>
        name: <input value={newName} onChange={handleNewName} required />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} required />
      </div>
      <button className="bg-blue-500 p-2 rounded-md" type="submit">
        add
      </button>
    </form>
  );
}

export default PersonForm;
