import type { ReactElement } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router'
import { VasosDeAgua } from './ejercicios/01-VasosDeAgua'
import { ListaTareas } from './ejercicios/02-ListaTareas'
import { TableroPedidos } from './ejercicios/03-TableroPedidos'
import { EncuestaSatisfaccion } from './ejercicios/04-EncuestaSatisfaccion'
import { LibretaContactos } from './ejercicios/05-LibretaContactos'
import { FormularioContacto } from './ejercicios/06-FormularioContacto'
import { RegistroUsuario } from './ejercicios/07-RegistroUsuario'
import { ContadorRenders } from './ejercicios/08-ContadorRenders'
import { RelojConexion } from './ejercicios/09-RelojConexion'
import { BuscadorTemporizador } from './ejercicios/10-BuscadorTemporizador'

interface Ejercicio {
  ruta: string
  titulo: string
  elemento: ReactElement
}

const ejercicios: Ejercicio[] = [
  { ruta: 'vasos-de-agua', titulo: 'useState: vasos de agua', elemento: <VasosDeAgua /> },
  { ruta: 'lista-tareas', titulo: 'useState tipado: tareas', elemento: <ListaTareas /> },
  { ruta: 'tablero-pedidos', titulo: 'useState tipado: pedidos', elemento: <TableroPedidos /> },
  { ruta: 'encuesta', titulo: 'Formulario: encuesta', elemento: <EncuestaSatisfaccion /> },
  { ruta: 'contactos', titulo: 'Formulario: contactos', elemento: <LibretaContactos /> },
  { ruta: 'contacto-zod', titulo: 'Zod: contacto', elemento: <FormularioContacto /> },
  { ruta: 'registro-zod', titulo: 'Zod: registro', elemento: <RegistroUsuario /> },
  { ruta: 'renders', titulo: 'useEffect sin dependencias', elemento: <ContadorRenders /> },
  { ruta: 'reloj', titulo: 'useEffect con []', elemento: <RelojConexion /> },
  { ruta: 'buscador', titulo: 'useEffect con dependencias', elemento: <BuscadorTemporizador /> },
]

export function App() {
  return (
    <div className="layout">
      <nav className="menu" aria-label="Ejercicios">
        <h2>Ejercicios</h2>
        <ol>
          {ejercicios.map((e) => (
            <li key={e.ruta}>
              <NavLink to={`/${e.ruta}`} className={({ isActive }) => (isActive ? 'activo' : undefined)}>
                {e.titulo}
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Navigate to={`/${ejercicios[0].ruta}`} replace />} />
          {ejercicios.map((e) => (
            <Route key={e.ruta} path={`/${e.ruta}`} element={e.elemento} />
          ))}
          <Route path="*" element={<p>Ejercicio no encontrado.</p>} />
        </Routes>
      </main>
    </div>
  )
}
