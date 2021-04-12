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
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

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

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  console.log(capitalize("brandon"));

  const handleSearch = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
    console.log("search =", newSearch);
    let oldList = persons.map((person) => {
      return { name: person.name.toLowerCase(), number: person.number };
    });
    console.log("oldList =", oldList);
    if (event !== "") {
      let newList = [];
      setNewSearch(event.target.value.toLowerCase());

      newList = oldList.filter((person) => {
        if (person.name.includes(newSearch)) {
          return { name: person.name, number: person.number };
        }
        return "";
      });
      console.log("newList =", newList);
      setPersons(newList);
    } else {
      setPersons(persons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        search: <input value={newSearch} onChange={handleSearch} />
      </div>
      <h2>Add New Contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
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
