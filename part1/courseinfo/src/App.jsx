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
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <>
      <Header course={course}></Header>

      <Content
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      ></Content>

      <Total total={exercises1 + exercises2 + exercises3}></Total>
    </>
  );
};

export default App;
