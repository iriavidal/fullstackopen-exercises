const Hello = (props) => {
  console.log(props);

  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
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
