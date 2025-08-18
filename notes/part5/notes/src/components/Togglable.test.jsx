/* eslint-disable no-undef */

import { render, screen } from "@testing-library/react"; // Librerías para renderizar componentes y consultar el DOM
import userEvent from "@testing-library/user-event"; // Permite simular interacciones de usuario (clicks, inputs, etc.)
import Togglable from "./Togglable"; // Importamos el componente que vamos a testear

describe("<Togglable />", () => {
  let container; // Aquí guardaremos el nodo raíz del componente renderizado para acceder al DOM

  // beforeEach se ejecuta antes de CADA test dentro de este "describe"
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        {/* Pasamos un hijo al componente, en este caso un <div> */}
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container; // Guardamos la referencia al DOM renderizado en la variable container
  });

  test("renders its children", async () => {
    // Verificamos que el contenido hijo se renderiza (aunque inicialmente esté oculto)
    // findAllByText busca todos los nodos que contengan el texto y espera si aún no están en el DOM
    await screen.findAllByText("togglable content");
  });

  test("at start the children are not displayed", () => {
    // Al inicio, el contenido debe estar oculto (display: none)
    const div = container.querySelector(".togglableContent"); // Buscamos el div con clase 'togglableContent'
    expect(div).toHaveStyle("display: none"); // Afirmamos que tiene display:none
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup(); // Simulador de usuario para hacer clicks
    const button = screen.getByText("show..."); // Buscamos el botón que debería mostrar el contenido
    await user.click(button); // Simulamos un click sobre él

    const div = container.querySelector(".togglableContent"); // Rebuscamos el div oculto
    expect(div).not.toHaveStyle("display: none"); // Ahora afirmamos que ya NO está oculto
  });
});
