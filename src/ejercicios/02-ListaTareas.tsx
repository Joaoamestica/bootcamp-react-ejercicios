import { useState } from 'react'

interface Tarea {
  id: string
  titulo: string
  completada: boolean
}

export function ListaTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [texto, setTexto] = useState<string>('')

  const completadas = tareas.filter((t) => t.completada).length

  function agregar() {
    const titulo = texto.trim()
    if (titulo === '') return
    setTareas((actuales) => [...actuales, { id: crypto.randomUUID(), titulo, completada: false }])
    setTexto('')
  }

  function alternar(id: string) {
    setTareas((actuales) =>
      actuales.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    )
  }

  function eliminar(id: string) {
    setTareas((actuales) => actuales.filter((t) => t.id !== id))
  }

  return (
    <section>
      <h2>Lista de tareas</h2>
      <label className="campo">
        Nueva tarea
        <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      </label>
      <button type="button" onClick={agregar}>Agregar</button>

      <p>{completadas} de {tareas.length} completadas</p>
      {tareas.length === 0 && <p>No hay tareas todavía.</p>}
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.completada} onChange={() => alternar(t.id)} />{' '}
              <span style={{ textDecoration: t.completada ? 'line-through' : 'none' }}>{t.titulo}</span>
            </label>{' '}
            <button type="button" onClick={() => eliminar(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
