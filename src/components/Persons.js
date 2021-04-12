import React from "react";

const Numbers = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Numbers person={person} key={person.name} />
      ))}
    </div>
  );
};

export default Persons;
