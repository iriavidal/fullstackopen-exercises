import { useState, useEffect } from "react";
import axios from "axios";

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

const Person = ({ person }) => (
  <li>
    {person.name} ({person.number})
  </li>
);

const Persons = ({ persons }) => (
  <ul>
    {persons.map((person, index) => (
      <Person key={index} person={person} />
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (!newName.trim()) return alert("Name is required");
    if (!newPhone.trim()) return alert("Phone is required");

    const index = persons.findIndex((el) => el.name === newName);
    if (index !== -1) return alert(`${newName} is already added to phonebook`);

    setPersons([...persons, { name: newName, number: newPhone }]);
    setNewName("");
    setNewPhone("");
  };

  const handlePersonChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
