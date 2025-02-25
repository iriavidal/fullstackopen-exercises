const App = (props) => {
  const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.content}</li>
          ))}
        </ul>
      </ul>

      {/* <ul>
        {notes.map((note, i) => (
          <li key={i}>{note.content}</li>
        ))}
      </ul> */}
      {/* This is, however, not recommended and can create undesired problems even if it seems to be working just fine. */}
    </div>
  );
};

export default App;
