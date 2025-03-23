// Importamos el módulo de CommonJS "http" de Node.js para poder crear un servidor
const http = require("http");

// Creamos el servidor con "http.createServer()" y definimos una función callback que maneja cada solicitud entrante
const app = http.createServer((request, response) => {
  // Configuramos la cabecera de la respuesta con un código de estado 200 (OK) y especificamos que el contenido será de tipo texto plano
  response.writeHead(200, { "Content-Type": "text/plain" });

  // Enviamos la respuesta con el mensaje "Hello World" y finalizamos la respuesta
  response.end("Hello World");
});

// Definimos el puerto en el que se ejecutará el servidor
const PORT = 3001;

// Hacemos que el servidor escuche en el puerto definido
app.listen(PORT);

// Mostramos un mensaje en la consola indicando que el servidor está en funcionamiento
console.log(`Server running on port ${PORT}`);
