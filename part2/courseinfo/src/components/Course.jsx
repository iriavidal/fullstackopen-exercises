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
  //console.log(props.parts);
  const parts = props.parts;

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
    </>
  );
};

const Total = (props) => {
  const parts = props.parts;
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <p>
        <strong>total of {totalExercises} exercises</strong>
      </p>
    </>
  );
};

const Course = (props) => {
  //console.log(props.course);
  const course = props.course;

  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  );
};

export default Course;
