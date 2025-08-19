/* eslint-disable no-undef */
// Desactiva la regla de ESLint que marcaría 'test', 'expect' o 'vi' como no definidos.

import { render, screen } from "@testing-library/react"; // renderiza componentes y ofrece queries sobre el DOM de prueba
import NoteForm from "./NoteForm"; // componente a testear
import userEvent from "@testing-library/user-event"; // util para simular acciones reales de usuario (teclear, click, etc.)

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = vi.fn(); // 'vi.fn()' crea una función mock/espía para registrar llamadas y argumentos
  const user = userEvent.setup(); // prepara un "usuario" que simula interacciones con temporización realista

  render(<NoteForm createNote={createNote} />); // renderiza el formulario, inyectando la prop 'createNote' (callback) mockeada

  const input = screen.getByRole("textbox"); // localiza el control de texto (input type="text" o textarea) por su rol accesible
  const sendButton = screen.getByText("save"); // localiza el botón por su texto visible "save"

  await user.type(input, "testing a form..."); // simula que el usuario escribe en el input la cadena indicada
  await user.click(sendButton); // simula el click en el botón para enviar el formulario

  console.log(createNote.mock.calls);

  expect(createNote.mock.calls).toHaveLength(1); // verifica que 'createNote' se haya llamado exactamente 1 vez
  expect(createNote.mock.calls[0][0].content) // accede al primer argumento de la primera llamada
    .toBe("testing a form..."); // y comprueba que su 'content' coincide con lo tecleado
  // Nota: 'mock.calls' es un array: [ [arg1, arg2, ...], [arg1, ...], ... ]
});
