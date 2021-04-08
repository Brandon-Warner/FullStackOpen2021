import React from "react";

const Header = ({ course }) => {
  console.log("Header props =", course);
  return <h1>{course.name}</h1>;
};

// const Part = ({ course }) => {
//   console.log("Part props =", course);
//   return (
//     <div>
//       {course.name} {course.exercises}
//     </div>
//   );
// };

const Content = ({ course }) => {
  console.log("Content props =", course);
  return (
    <div>
      {course.parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}
    </div>
  );
};

const Total = ({ course, total }) => {
  console.log("Total props =", course);
  return <div>total of {total} exercises</div>;
};

const Course = ({ course, total }) => {
  console.log("Course props =", course);
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} total={total} />
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
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  const total = course.parts.reduce((s, p) => {
    console.log("total, current", s, p);
    return s + p.exercises;
  }, 0);

  return <Course course={course} total ={total}/>;
};

export default App;
