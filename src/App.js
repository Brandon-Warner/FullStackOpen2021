import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
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
      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
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
    // console.log(event.target.value);
    setNewSearch(event.target.value);
    // console.log("search =", newSearch);
    let oldPersons = persons.map((person) => {
      return { name: person.name.toLowerCase(), number: person.number };
    });
    // console.log("oldPersons =", oldPersons);
    if (event !== "") {
      let newPersons = [];
      setNewSearch(event.target.value.toLowerCase());

      newPersons = oldPersons.filter((person) => {
        if (person.name.includes(newSearch)) {
          // console.log("newName=", person.name);
          person.name = capitalize(person.name);
          return { name: person.name, number: person.number };
        }
        return "";
      });
      // console.log("newPersons =", newPersons);
      setPersons(newPersons);
    } else {
      setPersons(persons);
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
      <Persons persons={persons} />
    </div>
  );
};

export default App;
