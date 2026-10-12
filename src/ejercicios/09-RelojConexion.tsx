import { useEffect, useState } from 'react'

function Reloj() {
  const [ahora, setAhora] = useState(() => new Date())

  useEffect(() => {
    const intervalo = setInterval(() => setAhora(new Date()), 1000)
    return () => {
      console.log('Reloj: limpiando intervalo')
      clearInterval(intervalo)
    }
  }, [])

  return <p>Hora actual: {ahora.toLocaleTimeString('es-CL')}</p>
}

function EstadoConexion() {
  const [conectado, setConectado] = useState(() => navigator.onLine)

  useEffect(() => {
    const alConectar = () => setConectado(true)
    const alDesconectar = () => setConectado(false)
    window.addEventListener('online', alConectar)
    window.addEventListener('offline', alDesconectar)
    return () => {
      console.log('EstadoConexion: quitando listeners')
      window.removeEventListener('online', alConectar)
      window.removeEventListener('offline', alDesconectar)
    }
  }, [])

  return <p>{conectado ? 'Conectado' : 'Sin conexión'}</p>
}

export function RelojConexion() {
  const [mostrarReloj, setMostrarReloj] = useState(true)

  return (
    <section>
      <h2>Reloj y estado de conexión</h2>
      <button type="button" onClick={() => setMostrarReloj((v) => !v)}>
        {mostrarReloj ? 'Ocultar reloj' : 'Mostrar reloj'}
      </button>
      {mostrarReloj && <Reloj />}
      <EstadoConexion />
      <p>Abre la consola del navegador para ver cuándo se ejecuta cada limpieza.</p>
    </section>
  )
}
