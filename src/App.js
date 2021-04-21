import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Message from "./components/Message";
import noteService from "./services/phonebook.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const capitalize = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((x) => x.charAt(0).toUpperCase() + x.substring(1))
      .join(" ");
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const existsNumber = persons.some((person) => person.number === newNumber);
    const existsName = persons.some((person) => person.name === newName);
    if (!existsName) {
      noteService.create(personObject).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        setNewMessage(`${personObject.name} was added to phonebook`);
        setTimeout(() => {
          setNewMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    } else if (existsName && !existsNumber) {
      if (
        window.confirm(
          `This contact is already added to phonebook, replace old number with new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };

        noteService
          .update(person.id, changedPerson)
          .then((updatedNumber) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : updatedNumber
              )
            );
          })
          .catch((error) => {
            console.log(error);
            setNewMessage(
              `${person.name}'s contact information has already been removed`
            );
            setTimeout(() => {
              setNewMessage(null);
            }, 5000);
          });
      }
    } else if (existsName) {
      window.alert(`${newName} is already in the phonebook`);
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
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
        .then((removedPerson) => console.log(removedPerson))
        .catch((error) => {
          console.log("error:", error);
        });
      noteService.getAll().then((updatedPersons) => setPersons(updatedPersons));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={newMessage} />
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
