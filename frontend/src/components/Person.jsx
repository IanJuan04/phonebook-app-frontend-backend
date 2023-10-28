import personService from "../services/persons";
import "./Person.css";

function Person({ person, persons, setPersons, setResults }) {
  const { id, name, number } = person;

  const handleDelete = (id) => {
    personService.deletePerson(id).then((response) => {
      if (response.status === 200) {
        const updatedPersons = persons.filter((person) => person.id !== id);

        setPersons(updatedPersons);
        setResults(updatedPersons);
      } else {
        console.log("no such contact");
      }
    });
  };

  return (
    <li className="p-4 bg-slate-200 m-4 2-64">
      <button onClick={() => handleDelete(id)}>x</button> {name} {number}
    </li>
  );
}

export default Person;
