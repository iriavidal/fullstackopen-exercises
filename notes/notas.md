# Notas

## Índice

- [Por qué algunos elementos se guardan en estados y no en variables](#Por-que-algunos-elementos-se-guardan-en-estados-y-no-en-variables)

- [Acerca de los tipos de solicitudes HTTP](#Acerca-de-los-tipos-de-solicitudes-HTTP)

## Por qué algunos elementos se guardan en estados y no en variables

En React, los datos que afectan a la interfaz de usuario (como las notas en esta aplicación) deben almacenarse en un estado en lugar de en una variable normal.

### 1. React NO detecta cambios en variables normales

Si guardas las notas en una variable normal, React no se dará cuenta cuando cambien, porque React solo vuelve a renderizar un componente cuando un estado o una prop cambia.

Ejemplo:

```
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
User.find({})  // Devuelve todos los usuarios
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

## ¿Qué es un esquema en Mongoose?

Un **esquema** en Mongoose es una estructura que define la forma que tendrán los documentos dentro de una colección de MongoDB. Es como un "molde" o "plantilla" que indica qué propiedades tendrá cada documento, qué tipo de datos pueden almacenar y si deben cumplir ciertas reglas o restricciones. Ejemplo:

```
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
```

## Cómo añadir las variables del archivo .env en Render

![Configuración variables de entorno en Render](./assets/env-render.jpg)

## ¿Qué es Lodash?

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
