import React, { useState } from "react";

const Numbers = ({ person }) => {
  //  console.log("Numbers props =", person);
  return <p> {person.name}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
    };
    const exists = persons.some((person) => person.name === newName);
    if (!exists) {
      setPersons(persons.concat(personObject));
      setNewName("");
    } else {
      window.alert(`${newName} is already in the phonebook`);
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>debug: {newName}</div>
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
