import { useEffect, useRef, useState } from 'react'

export function ContadorRenders() {
  const [contador, setContador] = useState(0)
  const [texto, setTexto] = useState('')
  const [ejecuciones, setEjecuciones] = useState(0)
  const ejecucionesRef = useRef(0)

  // Sin arreglo de dependencias: corre después de CADA render.
  useEffect(() => {
    ejecucionesRef.current += 1
    document.title = `Renders: ${ejecucionesRef.current}`
  })

  // Para mostrar el número en pantalla solo cuando cambia el contador (con dependencia),
  // no provocamos un bucle de renders.
  useEffect(() => {
    setEjecuciones(ejecucionesRef.current)
  }, [contador, texto])

  return (
    <section>
      <h2>Contador de renders</h2>
      <p>Contador: {contador}</p>
      <button type="button" onClick={() => setContador((c) => c + 1)}>Sumar</button>

      <label className="campo">
        Escribe algo (no tiene relación con el contador)
        <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      </label>

      <p>El efecto sin dependencias se ha ejecutado {ejecuciones} veces (mira el título de la pestaña).</p>

      <h3>Preguntas para responder</h3>
      <ol>
        <li>¿Por qué el efecto corre al escribir en el input si no tiene relación con el contador?</li>
        <li>¿Por qué en desarrollo el número puede subir de a dos? (StrictMode)</li>
        <li>¿Qué cambiarías para que solo corra al sumar?</li>
      </ol>
      <details>
        <summary>Respuestas</summary>
        <ol>
          <li>Sin arreglo de dependencias, React ejecuta el efecto después de cada render; escribir cambia un estado, y eso provoca un render.</li>
          <li>StrictMode monta, desmonta y vuelve a montar cada componente en desarrollo para detectar efectos impuros.</li>
          <li>Agregar <code>[contador]</code> como arreglo de dependencias.</li>
        </ol>
      </details>
    </section>
  )
}
