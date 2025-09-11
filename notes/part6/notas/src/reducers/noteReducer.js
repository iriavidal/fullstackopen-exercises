/* eslint-disable no-unused-vars */

// Importa createSlice de Redux Toolkit, que simplifica la creación de reducers y acciones
import { createSlice } from "@reduxjs/toolkit";

// Función auxiliar para generar IDs únicos para nuevas notas
const generateId = () => Number((Math.random() * 1000000).toFixed(0));

// Crea un "slice" (porción) del estado de Redux para gestionar las notas
const noteSlice = createSlice({
  name: "notes", // Nombre del slice, utilizado como prefijo en los tipos de acción
  initialState: [], // Estado inicial: un array vacío
  reducers: {
    // Reducer para crear una nueva nota
    createNote(state, action) {
      const newNote = action.payload; // Extrae la nueva nota del payload de la acción
      state.push(newNote); // Agrega la nueva nota al estado (mutación permitida por Immer)
    },
    // Reducer para alternar la importancia de una nota
    toggleImportanceOf(state, action) {
      const id = action.payload; // Extrae el ID de la nota del payload
      const noteToChange = state.find((n) => n.id === id); // Encuentra la nota a modificar
      const changedNote = {
        ...noteToChange, // Copia todas las propiedades de la nota
        important: !noteToChange.important, // Invierte la propiedad important
      };
      // Devuelve un nuevo array con la nota modificada (enfoque inmutable)
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    // Reducer alternativo para agregar una nota (similar a createNote)
    appendNote(state, action) {
      state.push(action.payload); // Agrega la nota al estado (mutación permitida)
    },
    // Reducer para establecer todas las notas (útil para inicializar con datos existentes)
    setNotes(state, action) {
      return action.payload; // Reemplaza todo el estado con el nuevo array de notas
    },
  },
});

// Exporta las acciones (action creators) generadas automáticamente por createSlice
export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;

// Exporta el reducer generado por createSlice
export default noteSlice.reducer;

/* Este archivo utiliza Redux Toolkit para crear un slice del estado dedicado a la gestión de notas. Su función principal es:

  1. Definir un slice de estado: Crea un conjunto de reducers y acciones para gestionar operaciones CRUD sobre notas.

  2. Simplificar la lógica de Redux: Utiliza createSlice de Redux Toolkit, que genera automáticamente action creators y maneja la inmutabilidad del estado mediante la biblioteca Immer (permitiendo código que "muta" el estado de manera segura).

  3. Proveer operaciones para notas: Incluye funciones para:

    - Crear nuevas notas (createNote, appendNote)

    - Modificar la importancia de una nota (toggleImportanceOf)

    - Establecer una lista completa de notas (setNotes) */
