# Notas

## Índice

- [Cómo crear e iniciar un proyecto en React](#cómo-crear-e-iniciar-un-proyecto-en-react)
- [Por qué algunos elementos se guardan en estados y no en variables](#por-qué-algunos-elementos-se-guardan-en-estados-y-no-en-variables)
- [Acerca de los tipos de solicitudes HTTP](#acerca-de-los-tipos-de-solicitudes-http)
- [Política de mismo origen y CORS](#política-de-mismo-origen-y-cors)
- [dashboard.render.com - Configuración](#dashboardrendercom)
- [mongoose.set("strictQuery", false)](#mongoosesetstrictquery-false)
- [Qué es un esquema en Mongoose](#qué-es-un-esquema-en-mongoose)
- [Qué es Lodash](#qué-es-lodash)
  - [1. Agrupar elementos \_.groupBy](#1-agrupar-elementos-_groupby)
  - [2. Ordenar \_.sortBy](#2-ordenar-_sortby)
  - [3. Buscar máximos o mínimos _.maxBy y _.minBy](#3-buscar-máximosmínimos-_maxby-_minby)
  - [4. Filtrar y mapear](#4-filtrar-y-mapear)
- [Entorno de pruebas](#entorno-de-prueba)
- [Ejecución de pruebas individualmente](#ejecución-de-pruebas-individualmente)

## Cómo crear e iniciar un proyecto en React

> [Parte 1 -> a. Introducción a React](https://fullstackopen.com/es/part1/introduccion_a_react)

```bash
npm create vite@latest nombre-del-proyecto -- --template react

cd nombre-del-proyecto
npm install
npm run dev
```

## Componentes

> [Parte 1 -> a. Introducción a React -> Componente](https://fullstackopen.com/es/part1/introduccion_a_react#componente)

Un componente es una **función o clase JavaScript** que retorna elementos de React (usualmente JSX) para describir una parte de la UI. Su propósito es ser **reutilizable, independiente y encapsular lógica + vista**.

### 🔑 **Características clave vs Angular:**

| React                                         | Angular                                              |
| --------------------------------------------- | ---------------------------------------------------- |
| **Funcional** (con hooks) o **Clase**         | **Clases** decoradas con `@Component`                |
| Props (flujo unidireccional)                  | `@Input()` / `@Output()`                             |
| Estado gestionado con `useState`/`useReducer` | Gestión con propiedades de clase + `ChangeDetection` |
| **Sin inyección de dependencias automática**  | Inyección de dependencias integrada                  |

### 🧩 **Estructura Básica (Función):**

```jsx
// 1. Importar React (y hooks si son necesarios)
import React, { useState } from "react";
// 2. Definir el componente como función
const MiComponente = (props) => {
  // Lógica interna (estado, efectos, etc)
  const [contador, setContador] = useState(0);
  // 3. Retornar JSX (lo que se renderiza)
  return (
    <div>
      <h1>Hola, {props.nombre}</h1>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
};
// 4. Exportar (para usarlo en otros lugares)
export default MiComponente;
```

### ⚙️ **Partes Fundamentales:**

1. **Props (Propiedades)**:

   - Datos que un componente **recibe desde su padre** (inmutables).
   - En React **no hay two-way binding por defecto** (como en Angular). Se usan funciones para comunicar cambios al padre.

   ```js
   const Hello = (props) => {
     console.log(props);
     return (
       <div>
         <p>
           Hello {props.name}, you are {props.age} years old
         </p>
       </div>
     );
   };

   const App = () => {
     const name = "Peter";
     const age = 10;

     return (
       <div>
         <h1>Greetings</h1>
         <Hello name="Maya" age={26 + 10} />
         <Hello name={name} age={age} />
       </div>
     );
   };
   ```

2. **Estado**:

- Datos que el componente **gestiona internamente** (usando `useState` o `useReducer`).
- Cuando cambia, React **vuelve a renderizar** el componente (y sus hijos necesarios).

3. **JSX**:

- Sintaxis similar a HTML que describe la UI.
- **¡No es HTML!** Es azúcar sintáctico para `React.createElement(...)`.

4. **Hooks** (como `useState`, `useEffect`):

- Permiten "enganchar" estado y ciclo de vida en **componentes funcionales** (después de React 16.8).

### ↔️ **Flujo de Datos:**

- **Unidireccional**: Padres → Hijos (vía props).
- **Comunicación entre componentes**:
- **Padre → Hijo**: Props.
- **Hijo → Padre**: Callbacks (pasados como props).
- **Hermanos/Global**: Context API o gestión de estado (Redux, Zustand).

## JSX

> [Parte 1 -> a. Introducción a React -> JSX](https://fullstackopen.com/es/part1/introduccion_a_react#jsx)

**JSX: JavaScript + XML (o HTML)**. Es una **extensión de sintaxis** que permite escribir "HTML" dentro de JavaScript. No es un string ni HTML real, sino una representación de elementos React.

### 🔍 Conceptos Clave:

1. **Naturaleza Fundamental**

```jsx
const elemento = <h1 className="titulo">Hola Mundo</h1>;
```

- **Se compila a**:

  `React.createElement('h1', { className: 'titulo' }, 'Hola Mundo')`

- **Output**: Objeto JavaScript que describe la UI (elemento React)

2. **Diferencias con Plantillas de Angular**
   | Característica | JSX (React) | Plantillas (Angular) |
   | ---------- | -------- | --------------|
   | **Lenguaje** | JavaScript (todo en .js/.jsx) | HTML con sintaxis propia |
   | **Directivas** | No existen (usas JS puro) | *ngIf, *ngFor, etc. |
   | **Scoping** | Todo está en mismo ámbito JS | Contexto propio de plantilla |
   | **Estilos** | `className`, `style={{ }}` | `class`, `[style]` |

### ⚙️ Reglas de Sintaxis Esenciales:

1.  **Embed JavaScript con `{ }`**

    ```jsx
    <h3>Hola, {usuario.nombre.toUpperCase()}</h3>
    ```

2.  **Atributos Diferentes a HTML**
    ```jsx
    <input
      type="text"
      className="mi-clase" // ≠ class (palabra reservada JS)
      htmlFor="input-id" // ≠ for (palabra reservada)
      style={{ color: "red" }} // Objeto JS (camelCase propiedades)
    />
    ```
3.  **Solo Un Elemento Raíz**

    ```jsx
    // ❌ Incorrecto
    return (
      <p>Párrafo 1</p>
      <p>Párrafo 2</p>
    );

    // ✅ Correcto (usar fragmentos <> o div)
    return (
      <>
       <p>Párrafo 1</p>
       <p>Párrafo 2</p>
      </>
    );
    ```

4.  **Listas Necesitan `key`**

    ```jsx
    {
      items.map((item) => <li key={item.id}>{item.nombre}</li>);
    }
    ```

### 🎯 Ejemplo Comparativo Angular → JSX:

```html
<!-- Angular -->
<div *ngIf="user">
  <h2 [class.active]="isActive">{{ user.name }}</h2>
</div>
```

```jsx
// React/JSX
{
  user && (
    <div>
      <h2 className={isActive ? "active" : ""}>{user.name}</h2>
    </div>
  );
}
```

## Por qué algunos elementos se guardan en estados y no en variables

En React, los datos que afectan a la interfaz de usuario (como las notas en esta aplicación) deben almacenarse en un estado en lugar de en una variable normal.

### 1. React NO detecta cambios en variables normales

Si guardas las notas en una variable normal, React no se dará cuenta cuando cambien, porque React solo vuelve a renderizar un componente cuando un estado o una prop cambia.

Ejemplo:

````

let notes = []; // Variable normal

const addNote = () => {
notes.push({ content: "Nueva nota", important: false });
console.log(notes); // Se actualiza el array en la consola
};

```

**Problema**: aunque la variable `notes` cambia, React no se entera y la interfaz no se actualiza.

### 2. El estado fuerza un nuevo renderizado

Cuando usas `useState`, React **sabe que los datos cambiaron** y vuelve a renderizar el componente con la nueva información.
Ejemplo:

```

const [notes, setNotes] = useState([]);

const addNote = () => {
const newNote = { content: "Nueva nota", important: false };
setNotes(notes.concat(newNote)); // React detecta el cambio y re-renderiza
};

```

**Ventaja**: cuando llamas `setNotes`, React actualiza la interfaz automáticamente.

### 3. React recuerda el estado entre renders

Las variables normales se reinician en cada renderizado, mientras que el estado se mantiene.
Ejemplo de variable normal:

```

let notes = []; // Se vacía cada vez que se renderiza el componente

const addNote = () => {
notes.push("Nueva nota");
};

```

Cada vez que el componente se renderiza, la variable `notes` se vuelve a definir como un array vacío. Por eso los datos desaparecen.

Solución:

```

const [notes, setNotes] = useState([]); // Se mantiene entre renders

```

Ahora, aunque el componente se vuelva a renderizar, el estado recuerda las notas.

### 4. El estado es reactivo

El estado también permite que otros efectos (como `useEffect`) respondan a los cambios. Por ejemplo, si las notas cambian, podrías guardar automáticamente en el servidor o hacer animaciones.

```

useEffect(() => {
console.log("El estado de notas cambió:", notes);
}, [notes]); // Se ejecuta cada vez que las notas cambian

```

## Acerca de los tipos de solicitudes HTTP

El estándar HTTP define dos propiedades importantes para las solicitudes: **seguridad** e **idempotencia**.

1. **Seguridad (GET y HEAD)**: Las solicitudes GET y HEAD deben ser seguras, lo que significa que no deben cambiar nada en el servidor, solo obtener datos. En otras palabras, una solicitud GET no debería alterar el estado de la base de datos ni generar efectos secundarios.

2. **Idempotencia (GET, HEAD, PUT, DELETE)**: Las solicitudes GET, HEAD, PUT y DELETE deben ser idempotentes. Esto significa que enviar la misma solicitud varias veces debe dar el mismo resultado, sin importar cuántas veces se repita. Por ejemplo, si se hace una solicitud PUT varias veces con los mismos datos, el resultado será el mismo.

3. **POST**: Es la única solicitud que no es ni segura ni idempotente. Si se envía varias veces, por ejemplo, añadiendo la misma nota, cada solicitud creará una nueva entrada, lo que puede cambiar el estado del servidor.

En resumen, GET y HEAD deben ser seguros (sin efectos secundarios), mientras que GET, HEAD, PUT y DELETE deben ser idempotentes (con el mismo resultado sin importar cuántas veces se realicen). POST es el único que no sigue estas reglas.

## Política de mismo origen y CORS

Para conectar el frontend al backend, cambiamos la URL en el archivo `notes.js` para que las notas se obtengan desde `http://localhost:3001/api/notes`. Sin embargo, la solicitud GET falla debido a la **política de mismo origen (Same-Origin Policy)**, una restricción de seguridad de los navegadores que impide que una web cargue recursos desde un servidor con un origen diferente (protocolo, host o puerto distinto).

Para solucionar esto, usamos CORS (Cross-Origin Resource Sharing), un mecanismo que permite solicitudes entre distintos orígenes. En nuestro backend, instalamos y configuramos el middleware CORS con:

```

const cors = require('cors')
app.use(cors())

```

Esto permite que el frontend en `localhost:5173/` pueda comunicarse con el backend en `localhost:3001`. Ahora el frontend puede obtener las notas correctamente, aunque algunas funcionalidades aún no están implementadas en el backend.

## dashboard.render.com

### Configuración

![Configuración render 1](./assets/render1.jpg)
![Configuración render 2](./assets/render2.jpg)

## mongoose.set("strictQuery", false);

Esta línea de código en Mongoose desactiva el **modo de consulta estricta** (strictQuery).

### ¿Qué es `strictQuery` en Mongoose?

Mongoose permite realizar consultas en la base de datos utilizando objetos con diferentes propiedades. Sin embargo, cuando `strictQuery` está habilitado (`true`), Mongoose solo permite consultar utilizando propiedades que estén definidas en el esquema.

Si se establece en `false`, Mongoose permite realizar consultas con propiedades que no están definidas en el esquema, aunque la base de datos puede no devolver resultados.

#### Ejemplo con `strictQuery: true` (Modo Estricto)

Supongamos que tenemos un esquema en Mongoose para una colección de usuarios:

```

const userSchema = new mongoose.Schema({
name: String,
age: Number
});

const User = mongoose.model("User", userSchema);

```

Si intentamos hacer una consulta con una propiedad no definida en el esquema:

```

User.find({ email: "test@example.com" })
.then(result => console.log(result))
.catch(error => console.error(error));

```

Con strictQuery activado (true), Mongoose ignorará la propiedad email porque no está definida en el esquema, y la consulta se traducirá a:

```

User.find({}) // Devuelve todos los usuarios

```

Lo que significa que la consulta no filtrará nada y devolverá todos los documentos en la colección.

#### Ejemplo con `strictQuery: false` (Modo Flexible)

Si en cambio desactivamos `strictQuery` con:

```

mongoose.set("strictQuery", false);

```

Mongoose **no ignorará** la consulta con `email`, sino que la enviará a MongoDB tal como está:

```

User.find({ email: "test@example.com" })

```

En este caso, MongoDB intentará buscar documentos que tengan la propiedad `email`. Si bien en la mayoría de los casos no devolverá resultados (porque `email` no está en el esquema), en algunos casos puede funcionar si en la base de datos ya existen documentos que tienen esta propiedad de alguna manera.

## Qué es un esquema en Mongoose

Un **esquema** en Mongoose es una estructura que define la forma que tendrán los documentos dentro de una colección de MongoDB. Es como un "molde" o "plantilla" que indica qué propiedades tendrá cada documento, qué tipo de datos pueden almacenar y si deben cumplir ciertas reglas o restricciones. Ejemplo:

```

const noteSchema = new mongoose.Schema({
content: String,
important: Boolean,
});

````

## Cómo añadir las variables del archivo .env en Render

![Configuración variables de entorno en Render](./assets/env-render.jpg)

## Qué es Lodash

**Lodash** es una librería de utilidades para JavaScript que facilita trabajar con arrays, objetos, strings, etc. Ayuda a escribir código más limpio y conciso, especialmente cuando se hacen cosas como:

- Agrupar elementos (`_.groupBy`)
- Ordenar (`_.sortBy`)
- Buscar máximos/mínimos (`_.maxBy`, `_.minBy`)
- Filtrar y mapear
- Clonar y comparar objetos
- Operaciones complejas con arrays de objetos

👉 Se instala con:

```bash
npm install lodash
```

👉 Y se usa así:

```js
const _ = require("lodash");
```

### 1. Agrupar elementos (`_.groupBy`)

```js
const _ = require("lodash");

const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "admin" },
  { name: "David", role: "user" },
];

const grouped = _.groupBy(users, "role");

console.log(grouped);
```

**Explicación:**

- `_.groupBy` agrupa los elementos del array por el valor de una propiedad.

- En este caso, agrupa por role, así que obtendrás:

```js
{
  admin: [
    { name: 'Alice', role: 'admin' },
    { name: 'Charlie', role: 'admin' }
  ],
  user: [
    { name: 'Bob', role: 'user' },
    { name: 'David', role: 'user' }
  ]
}
```

### 2. Ordenar (`_.sortBy`)

```js
const items = [
  { name: "Apple", price: 3 },
  { name: "Banana", price: 1 },
  { name: "Orange", price: 2 },
];

const sorted = _.sortBy(items, "price");

console.log(sorted);
```

**Explicación:**

- `_.sortBy` ordena los objetos del array por la propiedad indicada (price).

- Devuelve un nuevo array ordenado de menor a mayor:

```js
[
  { name: "Banana", price: 1 },
  { name: "Orange", price: 2 },
  { name: "Apple", price: 3 },
];
```

### 3. Buscar máximos/mínimos (_.maxBy, _.minBy)

```js
const products = [
  { name: "Laptop", price: 1200 },
  { name: "Phone", price: 800 },
  { name: "Tablet", price: 600 },
];

const mostExpensive = _.maxBy(products, "price");
const cheapest = _.minBy(products, "price");

console.log(mostExpensive); // Laptop
console.log(cheapest); // Tablet
```

**Explicación:**

- `_.maxBy` devuelve el objeto con el valor máximo en la propiedad especificada.

- `_.minBy` hace lo mismo pero con el valor mínimo.

### 4. Filtrar y mapear

```js
const books = [
  { title: "Book A", year: 1999 },
  { title: "Book B", year: 2010 },
  { title: "Book C", year: 2020 },
];

// Filtrar libros publicados después de 2000
const recentBooks = _.filter(books, (book) => book.year > 2000);

// Obtener solo los títulos
const titles = _.map(recentBooks, "title");

console.log(titles); // ['Book B', 'Book C']
```

**Explicación:**

- `_.filter` devuelve los objetos que cumplen una condición.

- `_.map` transforma cada objeto, extrayendo una propiedad o aplicando una función.

### 5. Clonar y comparar objetos

```js
const original = { name: "Anna", age: 25 };

// Clonar objeto
const clone = _.cloneDeep(original);

// Comparar si tienen el mismo contenido
console.log(_.isEqual(original, clone)); // true

// Comparar referencias
console.log(original === clone); // false (porque son objetos distintos)
```

**Explicación:**

- `_.cloneDeep` crea una copia profunda del objeto.

- `_.isEqual` compara dos objetos para ver si su contenido es idéntico.

### 6. Operaciones complejas con arrays de objetos

```js
const posts = [
  { author: "Alice", likes: 5 },
  { author: "Bob", likes: 10 },
  { author: "Alice", likes: 3 },
  { author: "Bob", likes: 7 },
];

// Total likes por autor
const grouped = _.groupBy(posts, "author");
const likesPerAuthor = _.map(grouped, (posts, author) => {
  return {
    author,
    totalLikes: _.sumBy(posts, "likes"),
  };
});

console.log(likesPerAuthor);
```

**Explicación:**

1. Agrupamos los posts por author con `_.groupBy`.

2. Luego, para cada grupo, usamos `_.sumBy` para sumar los likes.

3. El resultado será un array con los autores y el total de likes de cada uno:

```js
[
  { author: "Alice", totalLikes: 8 },
  { author: "Bob", totalLikes: 17 },
];
```

## Entorno de prueba

### ¿Qué es el entorno de prueba y para qué sirve?

Cuando creamos una aplicación con Node.js, esta puede comportarse de forma diferente según el entorno en el que se esté ejecutando:

. **Producción:** Cuando la app está en un servidor real (por ejemplo, en Fly.io o Render).

- **Desarrollo:** Cuando estás programando en tu ordenador.

- **Pruebas:** Cuando ejecutas tests para comprobar que tu código funciona correctamente.

### ¿Cómo se cambia el entorno?

Node.js permite establecer una variable llamada `NODE_ENV` que indica en qué modo está la app. Podemos usarla para que el código haga cosas diferentes dependiendo del entorno.

Por ejemplo, podemos usar diferentes bases de datos:

- Una para desarrollo.

- Otra para producción.

- Otra distinta para hacer pruebas, sin dañar los datos reales.

### ¿Dónde se pone NODE_ENV?

Lo más habitual es definirlo en los scripts del archivo `package.json`:

```json
"scripts": {
  "start": "NODE_ENV=production node index.js",
  "dev": "NODE_ENV=development nodemon index.js",
  "test": "NODE_ENV=test node --test"
}
```

Esto significa:

- `npm start`: ejecuta la app en modo **producción**.

- `npm run dev`: ejecuta la app en modo **desarrollo** con recarga automática.

- `npm test`: ejecuta los tests en modo **test**.

### ¿Cuál es el problema en Windows?

Los scripts como `"NODE_ENV=production node index.js"` funcionan bien en **Linux y Mac**, pero en **Windows fallan** porque el sistema no entiende esa sintaxis.

### ¿Cuál es la solución?

Instalar un paquete que se llama `cross-env`, que hace que esto funcione igual en todos los sistemas operativos (Windows, Mac y Linux).

1. Para desarrollo:

```bash
npm install --save-dev cross-env
```

2. Si quieres que también funcione al subirlo a producción (por ejemplo en Fly.io), instálalo así:

```bash
npm install cross-env
```

### Actualizar los scripts con cross-env

Cambia tus scripts en `package.json` para usar `cross-env`:

```json
"scripts": {
  "start": "cross-env NODE_ENV=production node index.js",
  "dev": "cross-env NODE_ENV=development nodemon index.js",
  "test": "cross-env NODE_ENV=test node --test"
}
```

Ahora funciona igual en **todos los sistemas**.

### ¿Por qué es útil todo esto?

Porque nos permite tener comportamientos distintos según el entorno. Por ejemplo:

- Cargar **datos reales** en producción.

- Usar una **base de datos** de pruebas al ejecutar `npm test`.

- Usar datos falsos o mostrar logs más detallados en desarrollo.

## Ejecución de pruebas individualmente

Por defecto, el comando:

```bash
npm test
```

ejecuta **todas las pruebas** de la aplicación. Sin embargo, durante el desarrollo es útil ejecutar solo una o algunas pruebas concretas.

### Opción 1: `test.only`

Puedes marcar pruebas individuales para que **solo se ejecuten ésas**:

```js
test.only("notes are returned as json", async () => {
  // ...
});

test.only("there are two notes", async () => {
  // ...
});
```

Para que esto funcione, debes ejecutar el comando con la opción `--test-only`, **asegurándote de pasar dos guiones** (`--`):

```bash
npm run test -- -- --test-only
```

> ⚠️ ¡Cuidado! No olvides quitar `.only` al finalizar, o podrías dejar fuera pruebas importantes sin darte cuenta.

### Opción 2: Ejecutar un archivo de pruebas específico

Puedes correr solo un archivo de pruebas concreto, por ejemplo:

```bash
npm test -- tests/note_api.test.js
```

### Opción 3: Filtrar pruebas por nombre

Si quieres ejecutar pruebas que contengan una palabra o frase específica en su nombre:

```bash
npm run test -- -- --test-name-pattern="notes"
```

También puedes usar partes del nombre, y funciona tanto con los títulos de `test()` como los de `describe()`.
