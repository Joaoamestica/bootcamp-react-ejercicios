# 10 ejercicios de práctica · Bootcamp React Frontend

Temas: `useState`, `useState` tipado, formularios con estado, validación con Zod y `useEffect`.

**Reglas generales**
- Un componente por ejercicio, con exportación nombrada, en `src/sesiones/<tema>/practica/`.
- No hace falta CSS: títulos, párrafos, listas y botones normales.
- TypeScript sin `any`.
- Actualiza arreglos y objetos sin mutarlos (spread, `map`, `filter`).

---

## Bloque A · useState

### 1. Vasos de agua
**Objetivo:** practicar un estado numérico y sus límites.

Crea `<VasosDeAgua />`:
- Meta diaria de 8 vasos. Empieza en 0.
- Botones **"+1 vaso"**, **"-1 vaso"** y **"Reiniciar"**.
- Muestra "Llevas X de 8 vasos" y los vasos que faltan.
- El contador no puede bajar de 0. Al subir de 8, "+1 vaso" se deshabilita.
- Al llegar a 8 aparece el mensaje "¡Meta cumplida!".

**Comprueba que:** los límites funcionan, el mensaje aparece y desaparece según el valor, y "faltan" se calcula sin otro estado.

*Pista: lo que se puede calcular a partir de un estado no necesita su propio estado.*

---

## Bloque B · useState tipado

### 2. Lista de tareas tipada
**Objetivo:** tipar arreglos de objetos en el estado.

Define `interface Tarea { id: string; titulo: string; completada: boolean }`.
- `useState<Tarea[]>([])` para las tareas y `useState<string>('')` para el texto nuevo.
- Agregar una tarea (con `crypto.randomUUID()`) y limpiar el input. No se aceptan títulos vacíos.
- Un checkbox marca o desmarca cada tarea.
- Un botón elimina cada tarea.
- Muestra "X de Y completadas".

**Comprueba que:** el tipo `Tarea` está declarado una sola vez y no hay `any` ni `as`.

### 3. Tablero de pedidos con tipos de unión
**Objetivo:** restringir valores posibles con *union types*.

Define `type EstadoPedido = 'pendiente' | 'preparando' | 'listo'`.
- Hay 4 pedidos iniciales con `id`, `cliente` y `estado`.
- Cada pedido tiene un botón que lo avanza al siguiente estado. En `listo` el botón desaparece.
- Un filtro `useState<EstadoPedido | 'todos'>('todos')` muestra solo los pedidos del estado elegido.
- Un `useState<Pedido | null>(null)` guarda el pedido seleccionado y muestra su detalle debajo. Si es `null`, muestra "Selecciona un pedido".

**Comprueba que:** TypeScript marca error si escribes un estado inexistente, y el detalle no rompe cuando no hay selección.

*Pista: un objeto `const siguiente: Record<Exclude<EstadoPedido, 'listo'>, EstadoPedido>` evita varios `if`.*

---

## Bloque C · Formularios gestionados por estado

### 4. Encuesta de satisfacción con vista previa
**Objetivo:** un solo estado de objeto para varios tipos de control.

Estado `encuesta` con: `nombre` (texto), `curso` (select), `nota` (input `range` de 1 a 7), `recomendaria` (radio Sí/No), `temas` (checkboxes múltiples: Componentes, Router, Estados, Zod) y `comentario` (textarea).
- Todos los controles son controlados (`value`/`checked` + `onChange`).
- Usa **una sola** función `manejarCambio` que sirva para texto, select, range y textarea.
- A la derecha o debajo, una **vista previa en vivo** con lo que se va escribiendo.
- El botón "Enviar" muestra "Gracias, {nombre}" y deja el formulario vacío.

**Comprueba que:** al marcar y desmarcar temas, el arreglo `temas` se actualiza bien, y "Enviar" reinicia el estado.

### 5. Libreta de contactos
**Objetivo:** formulario + lista + edición.

- Formulario con nombre, teléfono y correo, que agrega contactos a un arreglo en estado.
- Cada contacto tiene **"Editar"** y **"Eliminar"**.
- "Editar" carga el contacto en el formulario. El botón de enviar pasa a decir "Guardar cambios" y se actualiza ese contacto en vez de crear otro.
- Un buscador filtra la lista por nombre mientras se escribe.
- Mensaje "No hay contactos" cuando la lista (o el resultado de la búsqueda) está vacía.

**Comprueba que:** editar no duplica el contacto, y el filtro no modifica el arreglo original.

*Pista: un estado `idEditando: string | null` te dice en qué modo está el formulario.*

---

## Bloque D · Validación con Zod

### 6. Formulario de contacto con mensajes propios
**Objetivo:** esquema básico, `safeParse` y errores por campo.

Formulario con asunto, correo, mensaje y un select de prioridad (Baja, Media, Alta).
- `asunto`: obligatorio, entre 5 y 50 caracteres.
- `correo`: formato válido.
- `mensaje`: entre 20 y 300 caracteres.
- `prioridad`: debe estar seleccionada.
- Todos los mensajes de error deben estar **escritos por ti** en español, no los de Zod por defecto.
- Valida con `safeParse` al enviar y muestra cada error bajo su campo.
- Si todo es correcto, muestra los datos de `validacion.data` y limpia el formulario.
- Muestra "X / 300" como contador del mensaje.

**Comprueba que:** no se guarda nada si hay errores, y cada campo muestra solo sus propios errores.

### 7. Registro con reglas cruzadas
**Objetivo:** `z.coerce`, `refine` y tipos inferidos.

Formulario de registro con nombre de usuario, edad, contraseña y confirmación de contraseña.
- `usuario`: mínimo 4 caracteres, solo letras, números y guion bajo (`regex`).
- `edad`: llega como texto del input, conviértela con `z.coerce.number()`. Debe ser entero entre 18 y 99.
- `contrasena`: mínimo 8 caracteres, con al menos un número.
- `confirmacion`: debe ser igual a `contrasena`. Usa `.refine` sobre el objeto y asigna el error al campo `confirmacion` con `path`.
- Declara `type Registro = z.infer<typeof esquemaRegistro>` y úsalo para tipar el usuario guardado.
- Un botón **"Mostrar contraseña"** alterna el `type` del input entre `password` y `text`.

**Comprueba que:** el tipo `Registro` no se escribe a mano, `edad` queda como `number` en `data`, y el error de confirmación aparece bajo su campo.

---

## Bloque E · useEffect

### 8. Contador de renders y título de la pestaña *(sin dependencias)*
**Objetivo:** ver cuándo corre un efecto sin arreglo de dependencias.

- Un contador con botón "Sumar" y un input de texto independiente.
- Un `useEffect` **sin arreglo de dependencias** que actualiza `document.title` con "Renders: N", usando un `useRef` como contador de ejecuciones.
- Muestra en pantalla cuántas veces se ha ejecutado el efecto.
- Escribe en el input y comprueba que el efecto también corre.

**Para entregar, responde por escrito:**
1. ¿Por qué el efecto se ejecuta al escribir en el input si no tiene que ver con el contador?
2. ¿Por qué el número puede subir de a dos en desarrollo? (`StrictMode`)
3. ¿Qué cambiarías para que solo corra al sumar?

### 9. Reloj y estado de conexión *(dependencias vacías + limpieza)*
**Objetivo:** efectos que se suscriben una vez y se limpian.

- `<Reloj />` muestra la hora actual y se actualiza cada segundo con `setInterval` dentro de un `useEffect` con `[]`. Debe limpiar el intervalo.
- `<EstadoConexion />` escucha los eventos `online` y `offline` de `window` y muestra "Conectado" o "Sin conexión". Debe quitar los listeners al desmontarse.
- Un botón "Mostrar / ocultar reloj" monta y desmonta `<Reloj />`.
- Agrega un `console.log` en la función de limpieza para ver cuándo se ejecuta.

**Comprueba que:** al ocultar el reloj ya no salen logs del intervalo, y en DevTools (pestaña Network → Offline) el texto de conexión cambia.

### 10. Buscador con retraso y temporizador reiniciable *(dependencias: estados y props)*
**Objetivo:** reaccionar a cambios de estado y de props, y cancelar efectos anteriores.

**Parte A · Buscador con *debounce* (dependencia de estado)**
- Input de búsqueda sobre una lista local de al menos 10 cursos.
- El texto se guarda en `busqueda`. El texto *aplicado* se guarda en `terminoAplicado`.
- Un `useEffect` con `[busqueda]` espera 500 ms antes de copiar `busqueda` a `terminoAplicado` (`setTimeout`). Si el usuario sigue escribiendo, cancela el temporizador anterior en la limpieza.
- Muestra "Buscando..." mientras `busqueda !== terminoAplicado`, y la lista filtrada por `terminoAplicado`.

**Parte B · `<Temporizador segundosIniciales={n} />` (dependencia de prop y estado)**
- Estado `restante` que arranca en `segundosIniciales` y un estado `activo` (boolean).
- Botones "Iniciar/Pausar" y "Reiniciar".
- Un efecto con `[activo]` hace la cuenta regresiva cada segundo mientras `activo` sea `true`, y se detiene en 0.
- Otro efecto con `[segundosIniciales]` reinicia `restante` y pausa cuando cambia la prop.
- Desde el padre, tres botones (30 s, 60 s, 120 s) cambian la prop `segundosIniciales`.

**Comprueba que:** al escribir rápido solo se aplica la búsqueda una vez, y al cambiar la prop el temporizador vuelve al valor nuevo.

---

## Rúbrica sugerida (para todos)

| Criterio | Qué se mira |
|---|---|
| Funciona | Cumple todo lo pedido y cada punto de "Comprueba que" |
| Estado bien diseñado | Sin estados redundantes; lo derivable se calcula |
| Inmutabilidad | Nunca modifica arreglos u objetos de estado directamente |
| Tipos | Sin `any`; tipos inferidos o declarados una sola vez |
| Efectos | Dependencias correctas y limpieza cuando corresponde |
