/* const Hello = (props) => {
  console.log(props);

  //const name = props.name;
  //const age = props.age;
  const { name, age } = props;

  const bornYear = () => new Date().getFullYear() - age;

  return (
    <>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </>
  );
}; */

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <>
      <h1>Greetings</h1>

      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </>
  );
};

export default App;
