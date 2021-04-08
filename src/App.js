import React from "react";

const Header = ({ course }) => {
  console.log("Header props =", course);
  return <h1>{course.name}</h1>;
};

const Part = ({ course }) => {
  console.log("Part props =", course);
  return (
    <div>
      {course.name} {course.exercises}
    </div>
  );
};

const Content = ({ course }) => {
  console.log("Content props =", course);
  return (
    <div>
      <Part course={course.parts[0]} />
      <Part course={course.parts[1]} />
      <Part course={course.parts[2]} />
    </div>
  );
};

const Course = ({ course }) => {
  console.log("Course props =", course);
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
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
    ],
  };

  return <Course course={course} />;
};

export default App;
