import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

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

  const handlePersonChange = (e) => {
    //console.log(e.target.value);
    setNewName(e.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
