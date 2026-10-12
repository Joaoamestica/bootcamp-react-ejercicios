import { useState } from 'react'
import type { ChangeEvent } from 'react'

interface Encuesta {
  nombre: string
  curso: string
  nota: number
  recomendaria: 'si' | 'no' | ''
  temas: string[]
  comentario: string
}

const encuestaVacia: Encuesta = {
  nombre: '',
  curso: '',
  nota: 4,
  recomendaria: '',
  temas: [],
  comentario: '',
}

const temasDisponibles = ['Componentes', 'Router', 'Estados', 'Zod']

export function EncuestaSatisfaccion() {
  const [encuesta, setEncuesta] = useState<Encuesta>(encuestaVacia)
  const [agradecimiento, setAgradecimiento] = useState('')

  // Una sola función para texto, select, range, textarea y radio.
  function manejarCambio(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setEncuesta((actual) => ({ ...actual, [name]: type === 'range' ? Number(value) : value }))
  }

  function alternarTema(tema: string) {
    setEncuesta((actual) => ({
      ...actual,
      temas: actual.temas.includes(tema) ? actual.temas.filter((t) => t !== tema) : [...actual.temas, tema],
    }))
  }

  function enviar() {
    setAgradecimiento(`Gracias, ${encuesta.nombre || 'anónimo'}`)
    setEncuesta(encuestaVacia)
  }

  return (
    <section>
      <h2>Encuesta de satisfacción</h2>
      <label className="campo">
        Nombre
        <input name="nombre" value={encuesta.nombre} onChange={manejarCambio} />
      </label>
      <label className="campo">
        Curso
        <select name="curso" value={encuesta.curso} onChange={manejarCambio}>
          <option value="">Selecciona...</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="HTML y CSS">HTML y CSS</option>
        </select>
      </label>
      <label className="campo">
        Nota: {encuesta.nota}
        <input type="range" name="nota" min={1} max={7} value={encuesta.nota} onChange={manejarCambio} />
      </label>
      <fieldset className="campo">
        <legend>¿Lo recomendarías?</legend>
        <label>
          <input type="radio" name="recomendaria" value="si" checked={encuesta.recomendaria === 'si'} onChange={manejarCambio} /> Sí
        </label>{' '}
        <label>
          <input type="radio" name="recomendaria" value="no" checked={encuesta.recomendaria === 'no'} onChange={manejarCambio} /> No
        </label>
      </fieldset>
      <fieldset className="campo">
        <legend>Temas que más te gustaron</legend>
        {temasDisponibles.map((tema) => (
          <label key={tema} style={{ marginRight: '1rem' }}>
            <input type="checkbox" checked={encuesta.temas.includes(tema)} onChange={() => alternarTema(tema)} /> {tema}
          </label>
        ))}
      </fieldset>
      <label className="campo">
        Comentario
        <textarea name="comentario" value={encuesta.comentario} onChange={manejarCambio} />
      </label>
      <button type="button" onClick={enviar}>Enviar</button>
      {agradecimiento && <p role="status">{agradecimiento}</p>}

      <h3>Vista previa</h3>
      <div className="tarjeta">
        <p>Nombre: {encuesta.nombre || '—'}</p>
        <p>Curso: {encuesta.curso || '—'}</p>
        <p>Nota: {encuesta.nota}</p>
        <p>Recomendaría: {encuesta.recomendaria || '—'}</p>
        <p>Temas: {encuesta.temas.length > 0 ? encuesta.temas.join(', ') : '—'}</p>
        <p>Comentario: {encuesta.comentario || '—'}</p>
      </div>
    </section>
  )
}
