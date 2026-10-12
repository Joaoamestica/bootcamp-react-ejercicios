import { useState } from 'react'
import type { ChangeEvent } from 'react'

interface DatosContacto {
  nombre: string
  telefono: string
  correo: string
}

interface Contacto extends DatosContacto {
  id: string
}

const formularioVacio: DatosContacto = { nombre: '', telefono: '', correo: '' }

export function LibretaContactos() {
  const [formulario, setFormulario] = useState<DatosContacto>(formularioVacio)
  const [contactos, setContactos] = useState<Contacto[]>([])
  const [idEditando, setIdEditando] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState('')

  const visibles = contactos.filter((c) => c.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  function manejarCambio(e: ChangeEvent<HTMLInputElement>) {
    setFormulario((actual) => ({ ...actual, [e.target.name]: e.target.value }))
  }

  function guardar() {
    if (formulario.nombre.trim() === '') return
    if (idEditando === null) {
      setContactos((actuales) => [...actuales, { id: crypto.randomUUID(), ...formulario }])
    } else {
      setContactos((actuales) => actuales.map((c) => (c.id === idEditando ? { ...c, ...formulario } : c)))
    }
    setFormulario(formularioVacio)
    setIdEditando(null)
  }

  function editar(contacto: Contacto) {
    setFormulario({ nombre: contacto.nombre, telefono: contacto.telefono, correo: contacto.correo })
    setIdEditando(contacto.id)
  }

  function eliminar(id: string) {
    setContactos((actuales) => actuales.filter((c) => c.id !== id))
    if (id === idEditando) {
      setFormulario(formularioVacio)
      setIdEditando(null)
    }
  }

  return (
    <section>
      <h2>Libreta de contactos</h2>
      <label className="campo">
        Nombre
        <input name="nombre" value={formulario.nombre} onChange={manejarCambio} />
      </label>
      <label className="campo">
        Teléfono
        <input name="telefono" value={formulario.telefono} onChange={manejarCambio} />
      </label>
      <label className="campo">
        Correo
        <input name="correo" value={formulario.correo} onChange={manejarCambio} />
      </label>
      <button type="button" onClick={guardar}>
        {idEditando === null ? 'Agregar contacto' : 'Guardar cambios'}
      </button>

      <h3>Contactos</h3>
      <label className="campo">
        Buscar por nombre
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      </label>
      {visibles.length === 0 && <p>No hay contactos</p>}
      {visibles.map((c) => (
        <div className="tarjeta" key={c.id}>
          <strong>{c.nombre}</strong> · {c.telefono} · {c.correo}{' '}
          <button type="button" onClick={() => editar(c)}>Editar</button>
          <button type="button" onClick={() => eliminar(c.id)}>Eliminar</button>
        </div>
      ))}
    </section>
  )
}
