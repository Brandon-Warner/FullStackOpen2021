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
      <Total courses={courses[0]} />
      <Header courses={courses[1]} />
      <Content courses={courses[1]} />
      <Total courses={courses[1]} />
    </div>
  );
};

export default Course;
