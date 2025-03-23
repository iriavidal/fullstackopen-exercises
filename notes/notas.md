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
