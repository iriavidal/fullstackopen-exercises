import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
    };

    //console.log(personObject);
    //console.log(persons.findIndex((el) => el.name === personObject.name));

    const index = persons.findIndex((el) => el.name === personObject.name);
    if (index != -1) {
      alert(`${personObject.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
    }
  };

  const handlePersonChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredPersons);

  return (
    <>
      <h1>Phonebook</h1>
      <div>
        filter shown with:{" "}
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
      </div>

      <form onSubmit={addPerson}>
        <h2>add a new</h2>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>
            {person.name} ({person.phone})
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
