import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "936487634" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    if (!newName.trim()) return alert("Name is required");
    if (!newPhone.trim()) return alert("Phone is required");

    const index = persons.findIndex((el) => el.name === newName);
    if (index !== -1) return alert(`${newName} is already added to phonebook`);

    setPersons([...persons, { name: newName, phone: newPhone }]);
    setNewName("");
    setNewPhone("");
  };

  const handlePersonChange = (e) => {
    //console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    //console.log(e.target.value);
    setNewPhone(e.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input type="text" value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number:{" "}
          <input type="tel" value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>
            {person.name} ({person.phone})
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
