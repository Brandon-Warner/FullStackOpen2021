import React, { useState } from "react";

const Numbers = ({ person }) => {
  //  console.log("Numbers props =", person);
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "503 - 620 - 5558" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const exists = persons.some((person) => person.name === newName);
    if (!exists) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      window.alert(`${newName} is already in the phonebook`);
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          debug: {newName} {newNumber}
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Numbers person={person} key={person.name} />
      ))}
    </div>
  );
};

export default App;
