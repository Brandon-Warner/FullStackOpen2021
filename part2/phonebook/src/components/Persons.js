import React from "react";

const Persons = ({ person, removePerson }) => {
  return (
    <li key={`${person.id}`}>
      {person.name} {person.number}{" "}
      <button onClick={removePerson}>delete</button>
    </li>
  );
};

export default Persons;
