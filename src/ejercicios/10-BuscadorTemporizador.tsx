import { useEffect, useState } from 'react'

const cursos = [
  'Introducción a React',
  'JavaScript básico',
  'HTML y CSS',
  'TypeScript esencial',
  'React Router',
  'Estados y formularios',
  'Validación con Zod',
  'Servicios web',
  'Testing con Vitest',
  'Accesibilidad web',
  'Git y GitHub',
]

function Buscador() {
  const [busqueda, setBusqueda] = useState('')
  const [terminoAplicado, setTerminoAplicado] = useState('')

  // Debounce: espera 500 ms desde la última tecla. La limpieza cancela el temporizador anterior.
  useEffect(() => {
    const temporizador = setTimeout(() => setTerminoAplicado(busqueda), 500)
    return () => clearTimeout(temporizador)
  }, [busqueda])

  const buscando = busqueda !== terminoAplicado
  const resultados = cursos.filter((c) => c.toLowerCase().includes(terminoAplicado.toLowerCase()))

  return (
    <div>
      <h3>Parte A · Buscador con retraso</h3>
      <label className="campo">
        Buscar curso
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      </label>
      {buscando && <p>Buscando...</p>}
      <ul>
        {resultados.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      {!buscando && resultados.length === 0 && <p>Sin resultados.</p>}
    </div>
  )
}

interface TemporizadorProps {
  segundosIniciales: number
}

function Temporizador({ segundosIniciales }: TemporizadorProps) {
  const [restante, setRestante] = useState(segundosIniciales)
  const [activo, setActivo] = useState(false)

  // Dependencia de prop: si cambia el valor inicial, se reinicia y se pausa.
  useEffect(() => {
    setRestante(segundosIniciales)
    setActivo(false)
  }, [segundosIniciales])

  // Dependencia de estado: la cuenta regresiva corre solo mientras `activo` sea true.
  useEffect(() => {
    if (!activo) return
    const intervalo = setInterval(() => {
      setRestante((r) => {
        if (r <= 1) {
          setActivo(false)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(intervalo)
  }, [activo])

  return (
    <div>
      <p>Tiempo restante: {restante} s</p>
      <button type="button" onClick={() => setActivo((a) => !a)} disabled={restante === 0}>
        {activo ? 'Pausar' : 'Iniciar'}
      </button>
      <button
        type="button"
        onClick={() => {
          setRestante(segundosIniciales)
          setActivo(false)
        }}
      >
        Reiniciar
      </button>
      {restante === 0 && <p><strong>¡Tiempo!</strong></p>}
    </div>
  )
}

export function BuscadorTemporizador() {
  const [segundos, setSegundos] = useState(30)

  return (
    <section>
      <h2>Buscador y temporizador</h2>
      <Buscador />

      <h3>Parte B · Temporizador</h3>
      <p>Duración:</p>
      {[30, 60, 120].map((s) => (
        <button type="button" key={s} onClick={() => setSegundos(s)} disabled={segundos === s}>
          {s} s
        </button>
      ))}
      <Temporizador segundosIniciales={segundos} />
    </section>
  )
}
