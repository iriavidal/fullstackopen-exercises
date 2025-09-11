/* eslint-disable no-undef */
// Deshabilita temporalmente la regla de ESLint para variables no definidas
// ya que Jest proporciona funciones globales como 'describe' y 'test'

// Importa el reducer de notas que vamos a probar
import noteReducer from "./noteReducer";

// Importa la librería deep-freeze que se utilizará para congelar el estado
// y asegurar que el reducer no mute el estado existente
import deepFreeze from "deep-freeze";

// Describe un grupo de pruebas para el noteReducer
describe("noteReducer", () => {
  // Primera prueba: verifica que el reducer maneje correctamente la acción NEW_NOTE
  test("returns new state with action NEW_NOTE", () => {
    // Estado inicial vacío
    const state = [];

    // Acción a despachar con un payload que contiene una nueva nota
    const action = {
      type: "notes/createNote",
      payload: "the app state is in redux store",
    };

    // Congela el estado para asegurar que el reducer no lo mute
    deepFreeze(state);

    // Ejecuta el reducer con el estado y la acción
    const newState = noteReducer(state, action);

    // Verifica que el nuevo estado tenga exactamente 1 elemento
    expect(newState).toHaveLength(1);

    // Verifica que el nuevo estado contenga la nota del payload
    expect(newState).toContainEqual(action.payload);
  });

  // Segunda prueba: verifica que el reducer maneje correctamente la acción TOGGLE_IMPORTANCE
  test("returns new state with action TOGGLE_IMPORTANCE", () => {
    // Estado inicial con dos notas
    const state = [
      {
        content: "the app state is in redux store",
        important: true,
        id: 1,
      },
      {
        content: "state changes are made with actions",
        important: false,
        id: 2,
      },
    ];

    // Acción para cambiar la importancia de la nota con id=2
    const action = {
      type: "notes/toggleImportanceOf",
      payload: 2,
    };

    // Congela el estado para asegurar inmutabilidad
    deepFreeze(state);

    // Ejecuta el reducer
    const newState = noteReducer(state, action);

    // Verifica que el nuevo estado mantenga 2 elementos
    expect(newState).toHaveLength(2);

    // Verifica que la primera nota permanezca inalterada
    expect(newState).toContainEqual(state[0]);

    // Verifica que la segunda nota tenga su propiedad important cambiada a true
    expect(newState).toContainEqual({
      content: "state changes are made with actions",
      important: true,
      id: 2,
    });
  });
});

/* Este archivo contiene pruebas unitarias para el noteReducer utilizando Jest y deep-freeze. Las pruebas verifican que:

  1. El reducer correctamente agrega una nueva nota cuando recibe una acción de tipo "NEW_NOTE".

  2. El reducer correctamente cambia el estado de importancia de una nota específica cuando recibe una acción de tipo "TOGGLE_IMPORTANCE".

El uso de deepFreeze asegura que el reducer no mute el estado existente, cumpliendo con el principio de inmutabilidad de Redux. Las pruebas verifican tanto el contenido como la estructura del estado resultante después de cada acción. */
