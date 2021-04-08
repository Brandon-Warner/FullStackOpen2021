import React from "react";

const Header = ({ courses }) => {
  console.log("Header props =", courses);
  return <h1>{courses.name}</h1>;
};

const Content = ({ courses }) => {
  console.log("Content props =", courses);
  return (
    <div>
      {courses.parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}
    </div>
  );
};

const Total = ({ courses }) => {
  console.log("Total props =", courses);
  const total = courses.parts.reduce((s, p) => {
    console.log("total, current", s, p);
    return s + p.exercises;
  }, 0);
  return <div>total of {total} exercises</div>;
};

const Course = ({ courses, total }) => {
  console.log("Course props =", courses);
  return (
    <div>
      <Header courses={courses[0]} />
      <Content courses={courses[0]} />
      <Total courses={courses[0]} total={total} />
      <Header courses={courses[1]} />
      <Content courses={courses[1]} />
      <Total courses={courses[1]} total={total} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course courses={courses} />;
};

export default App;
