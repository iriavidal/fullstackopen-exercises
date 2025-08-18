/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

// Este test verifica que, al hacer clic en el botón del componente <Note />, se llama exactamente una vez a la función que cambia la importancia de la nota.

test("renders content", async () => {
  const note = {
    // Creamos una nota de ejemplo que pasaremos como prop
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = vi.fn(); // Creamos una función "mock" de Vitest para espiar/contar llamadas

  render(<Note note={note} toggleImportance={mockHandler} />);
  // Renderizamos el componente <Note /> en un DOM de prueba.
  // Le pasamos:
  //   - note: el objeto con 'content' e 'important'
  //   - toggleImportance: la función mock; el componente la debería llamar al pulsar el botón

  // screen.debug();                           // (Opcional) Muestra en consola el DOM actual para depurar

  const user = userEvent.setup(); // Preparamos un "usuario" para simular interacciones reales (clicks, tecleo, etc.)
  const button = screen.getByText("make not important");
  // Buscamos en el DOM el botón por su texto visible. Con 'important: true',
  // el botón suele mostrar "make not important" (cambiar a no importante).

  await user.click(button); // Simulamos que el usuario hace clic en el botón

  expect(mockHandler.mock.calls).toHaveLength(1);
  // Afirmamos que la función pasada en 'toggleImportance' se llamó exactamente UNA vez.
  // 'mockHandler.mock.calls' es un array con una entrada por cada vez que se invocó el mock.
});
