const Header = (props) => {
  console.log(`Header: ${props.course}`);

  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  console.log(`${props.part}: ${props.exercises}`);

  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} exercises={props.exercises[0]}></Part>
      <Part part={props.parts[1]} exercises={props.exercises[1]}></Part>
      <Part part={props.parts[2]} exercises={props.exercises[2]}></Part>
    </>
  );
};

const Total = (props) => {
  console.log(props.total);

  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <>
      <Header course={course}></Header>

      <Content
        parts={[part1.name, part2.name, part3.name]}
        exercises={[part1.exercises, part2.exercises, part3.exercises]}
      ></Content>

      <Total
        total={part1.exercises + part2.exercises + part3.exercises}
      ></Total>
    </>
  );
};

export default App;
