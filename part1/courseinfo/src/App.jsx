const Header = (props) => {
  //console.log(`Header: ${props.course}`);

  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  //console.log(props.part);
  //console.log(`${props.part.name}: ${props.part.exercises}`);

  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  //console.log(props.parts[0]);

  return (
    <>
      <Part part={props.parts[0]}></Part>
      <Part part={props.parts[1]}></Part>
      <Part part={props.parts[2]}></Part>
    </>
  );
};

const Total = (props) => {
  //console.log(props.total);

  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <>
      <Header course={course}></Header>

      <Content parts={parts}></Content>

      <Total
        total={parts[0].exercises + parts[1].exercises + parts[2].exercises}
      ></Total>
    </>
  );
};

export default App;
