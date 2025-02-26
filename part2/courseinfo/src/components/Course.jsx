const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  console.log(props.parts);
  const parts = props.parts;

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
    </>
  );
};

const Course = (props) => {
  console.log(props.course);
  const course = props.course;

  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
    </>
  );
};

export default Course;
