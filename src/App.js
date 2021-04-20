import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import noteService from "./services/phonebook.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const capitalize = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((x) => x.charAt(0).toUpperCase() + x.substring(1))
      .join(" ");
  };

  //console.log("capitalize test: ", capitalize("brandon warner"));

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const exists = persons.some((person) => person.name === newName);
    if (!exists) {
      noteService.create(personObject).then((response) => {
        console.log("server post = ", response);
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    } else {
      window.alert(`${newName} is already in the phonebook`);
    }
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);

    let oldPersons = persons.map((person) => {
      return {
        name: person.name.toLowerCase(),
        number: person.number,
        id: person.id,
      };
    });

    if (event !== "") {
      let newPersons = [];
      setNewSearch(event.target.value.toLowerCase());

      newPersons = oldPersons.filter((person) => {
        if (person.name.includes(newSearch)) {
          person.name = capitalize(person.name);
          return { name: person.name, number: person.number, id: person.id };
        }
        return "";
      });

      setPersons(newPersons);
    } else {
      setPersons(persons);
    }
  };

  const removeThisPerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      noteService
        .remove(id)
        .then((response) => console.log(response.data))
        .catch((error) => {
          console.log("error:", error);
        });
      noteService.getAll().then((response) => setPersons(response.data));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <h2>Add New Contact</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((person) => (
            <Persons
              key={person.id}
              person={person}
              removePerson={() => removeThisPerson(person.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
