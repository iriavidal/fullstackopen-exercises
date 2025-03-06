import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  /* useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);
  console.log("render", notes.length, "notes"); */

  /* const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  };

  useEffect(hook, []);
  console.log("render", notes.length, "notes"); */

  /* By default, effects run after every completed render, but you can choose to fire it only when certain values have changed. */
  /* So by default, the effect is always run after the component has been rendered. In our case, however, we only want to execute the effect along with the first render. */
  /* The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component. */

  useEffect(() => {
    console.log("effect");

    const eventHandler = (response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    };

    const promise = axios.get("http://localhost:3001/notes");
    promise.then(eventHandler);
  }, []);

  /* A reference to an event handler function is assigned to the variable eventHandler. The promise returned by the get method of Axios is stored in the variable promise. The registration of the callback happens by giving the eventHandler variable, referring to the event-handler function, as a parameter to the then method of the promise. It isn't usually necessary to assign functions and promises to variables, and a more compact way of representing things, as seen below, is sufficient. */

  return <></>;
};

export default App;
