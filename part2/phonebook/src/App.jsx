import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    filter shown with:{" "}
    <input type="text" value={searchTerm} onChange={handleSearchChange} />
  </div>
);

const PersonForm = ({
  addPerson,
  newName,
  handlePersonChange,
  newPhone,
  handlePhoneChange,
}) => (
  <form onSubmit={addPerson}>
    <h2>add a new</h2>
    <div>
      name:
      <input type="text" value={newName} onChange={handlePersonChange} />
    </div>
    <div>
      number:
      <input type="tel" value={newPhone} onChange={handlePhoneChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Person = ({ person, toggleDelete }) => (
  <li>
    {person.name} ({person.number}) -{" "}
    <button onClick={toggleDelete}>delete</button>
  </li>
);

const Persons = ({ persons, toggle }) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <Person
          key={index}
          person={person}
          toggleDelete={() => toggle(person.id)}
        />
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      console.log(persons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (!newName.trim()) return alert("Name is required");
    if (!newPhone.trim()) return alert("Phone is required");

    const index = persons.findIndex((el) => el.name === newName);
    if (index !== -1) return alert(`${newName} is already added to phonebook`);

    const personObject = {
      name: newName,
      number: newPhone,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewPhone("");
    });
    console.log(persons);
  };

  const handlePersonChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDeleteId = (id) => {
    //console.log(id);
    const person = persons.find((p) => p.id === id);
    if (!window.confirm(`Are you sure you want to delete ${person.name}?`))
      return;

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} toggle={toggleDeleteId} />
    </div>
  );
};

export default App;
