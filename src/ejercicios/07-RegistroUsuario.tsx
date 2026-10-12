import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { z } from 'zod'

const esquemaRegistro = z
  .object({
    usuario: z
      .string()
      .min(4, 'El usuario debe tener al menos 4 caracteres')
      .regex(/^\w+$/, 'Solo letras, números y guion bajo'),
    edad: z.coerce
      .number('La edad debe ser un número')
      .int('La edad debe ser un número entero')
      .min(18, 'Debes ser mayor de 18 años')
      .max(99, 'La edad máxima es 99'),
    contrasena: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/\d/, 'La contraseña debe incluir al menos un número'),
    confirmacion: z.string(),
  })
  .refine((datos) => datos.contrasena === datos.confirmacion, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmacion'],
  })

type Registro = z.infer<typeof esquemaRegistro>
type Campo = keyof Registro

const formularioInicial = { usuario: '', edad: '', contrasena: '', confirmacion: '' }

export function RegistroUsuario() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState<Partial<Record<Campo, string[]>>>({})
  const [registrados, setRegistrados] = useState<Registro[]>([])
  const [verContrasena, setVerContrasena] = useState(false)

  function manejarCambio(e: ChangeEvent<HTMLInputElement>) {
    setFormulario((actual) => ({ ...actual, [e.target.name]: e.target.value }))
  }

  function registrar() {
    const validacion = esquemaRegistro.safeParse(formulario)
    if (!validacion.success) {
      setErrores(z.flattenError(validacion.error).fieldErrors)
      return
    }
    setErrores({})
    setRegistrados((actuales) => [...actuales, validacion.data])
    setFormulario(formularioInicial)
  }

  function mostrarErrores(campo: Campo) {
    return errores[campo]?.map((mensaje) => (
      <p className="error" key={mensaje} role="alert">{mensaje}</p>
    ))
  }

  const tipoContrasena = verContrasena ? 'text' : 'password'

  return (
    <section>
      <h2>Registro de usuario</h2>
      <label className="campo">
        Usuario
        <input name="usuario" value={formulario.usuario} onChange={manejarCambio} />
        {mostrarErrores('usuario')}
      </label>
      <label className="campo">
        Edad
        <input name="edad" value={formulario.edad} onChange={manejarCambio} />
        {mostrarErrores('edad')}
      </label>
      <label className="campo">
        Contraseña
        <input type={tipoContrasena} name="contrasena" value={formulario.contrasena} onChange={manejarCambio} />
        {mostrarErrores('contrasena')}
      </label>
      <label className="campo">
        Confirmar contraseña
        <input type={tipoContrasena} name="confirmacion" value={formulario.confirmacion} onChange={manejarCambio} />
        {mostrarErrores('confirmacion')}
      </label>
      <button type="button" onClick={() => setVerContrasena((v) => !v)}>
        {verContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      </button>
      <button type="button" onClick={registrar}>Registrarme</button>

      <h3>Usuarios registrados ({registrados.length})</h3>
      <ul>
        {registrados.map((r) => (
          <li key={r.usuario}>
            {r.usuario} · {r.edad} años (edad como {typeof r.edad})
          </li>
        ))}
      </ul>
    </section>
  )
}
