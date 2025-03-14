import axios from "axios"; // Importa la librería axios para realizar solicitudes HTTP.

const baseUrl = "http://localhost:3001/notes"; // Define la URL base del backend donde se almacenan las notas.

// Función para obtener todas las notas desde el backend.
const getAll = () => {
  const request = axios.get(baseUrl);
  // Realiza una solicitud GET a la URL base para obtener las notas almacenadas.

  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  };
  // Crea un objeto de nota ficticia que no está guardado en el servidor.
  // Se usa solo como demostración.

  return request.then((response) => response.data.concat(nonExisting));
  // Cuando la solicitud se resuelve, concatena la nota ficticia a los datos recibidos.
};

// Función para crear una nueva nota en el servidor.
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  // Realiza una solicitud POST enviando un nuevo objeto de nota al backend.

  return request.then((response) => response.data);
  // Retorna la respuesta con la nota creada.
};

// Función para actualizar una nota en el servidor con un nuevo contenido.
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  // Realiza una solicitud PUT a la URL específica de la nota, enviando el objeto actualizado.

  return request.then((response) => response.data);
  // Retorna la respuesta con la nota actualizada.
};

export default { getAll, create, update };
// Exporta las funciones para que puedan ser utilizadas en otros archivos.
