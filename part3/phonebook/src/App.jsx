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

const Notification = ({ message, isError }) => {
  if (!message) return null;

  return (
    <div
      style={{
        color: isError ? "red" : "green",
        background: "lightgrey",
        fontSize: "20px",
        border: `2px solid ${isError ? "red" : "green"}`,
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);

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

    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Do you want to replace the old number with the new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newPhone };
        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson
              )
            );
            setError(false);
            setNotification(`Updated ${newName}'s number successfully`);
            setTimeout(() => setNotification(null), 3000);
            setNewName("");
            setNewPhone("");
          })
          .catch((error) => {
            console.log(error.response);

            setError(true);
            setNotification(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => setNotification(null), 3000);
            setNewName("");
            setNewPhone("");
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      return;
    }

    const personObject = { name: newName, number: newPhone };
    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setError(false);
        setNotification(`Added ${newName} to the phonebook`);
        setTimeout(() => setNotification(null), 3000);
        setNewName("");
        setNewPhone("");
      })
      .catch((error) => {
        console.log("Error:", error.response.data.error);

        setError(true);
        setNotification(`${error.response.data.error}`);
        setTimeout(() => setNotification(null), 3000);
      });
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
      <Notification message={notification} isError={error} />
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
