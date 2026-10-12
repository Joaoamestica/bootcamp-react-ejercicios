import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { z } from 'zod'

const esquemaContacto = z.object({
  asunto: z
    .string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(50, 'El asunto puede tener hasta 50 caracteres'),
  correo: z.email('Escribe un correo válido'),
  mensaje: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(300, 'El mensaje puede tener hasta 300 caracteres'),
  prioridad: z.enum(['baja', 'media', 'alta'], 'Selecciona una prioridad'),
})

type Contacto = z.infer<typeof esquemaContacto>
type Campo = keyof Contacto

const formularioInicial = { asunto: '', correo: '', mensaje: '', prioridad: '' }

export function FormularioContacto() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState<Partial<Record<Campo, string[]>>>({})
  const [enviado, setEnviado] = useState<Contacto | null>(null)

  function manejarCambio(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormulario((actual) => ({ ...actual, [e.target.name]: e.target.value }))
  }

  function enviar() {
    const validacion = esquemaContacto.safeParse(formulario)
    if (!validacion.success) {
      setErrores(z.flattenError(validacion.error).fieldErrors)
      setEnviado(null)
      return
    }
    setErrores({})
    setEnviado(validacion.data)
    setFormulario(formularioInicial)
  }

  function mostrarErrores(campo: Campo) {
    return errores[campo]?.map((mensaje) => (
      <p className="error" key={mensaje} role="alert">{mensaje}</p>
    ))
  }

  return (
    <section>
      <h2>Formulario de contacto</h2>
      <label className="campo">
        Asunto
        <input name="asunto" value={formulario.asunto} onChange={manejarCambio} />
        {mostrarErrores('asunto')}
      </label>
      <label className="campo">
        Correo
        <input name="correo" value={formulario.correo} onChange={manejarCambio} />
        {mostrarErrores('correo')}
      </label>
      <label className="campo">
        Mensaje ({formulario.mensaje.length} / 300)
        <textarea name="mensaje" value={formulario.mensaje} onChange={manejarCambio} />
        {mostrarErrores('mensaje')}
      </label>
      <label className="campo">
        Prioridad
        <select name="prioridad" value={formulario.prioridad} onChange={manejarCambio}>
          <option value="">Selecciona...</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        {mostrarErrores('prioridad')}
      </label>
      <button type="button" onClick={enviar}>Enviar</button>

      {enviado && (
        <div className="tarjeta" role="status">
          <h3>Mensaje enviado</h3>
          <p>Asunto: {enviado.asunto}</p>
          <p>Correo: {enviado.correo}</p>
          <p>Prioridad: {enviado.prioridad}</p>
          <p>Mensaje: {enviado.mensaje}</p>
        </div>
      )}
    </section>
  )
}
