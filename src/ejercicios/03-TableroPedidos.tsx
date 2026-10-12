import { useState } from 'react'

type EstadoPedido = 'pendiente' | 'preparando' | 'listo'
type Filtro = EstadoPedido | 'todos'

interface Pedido {
  id: number
  cliente: string
  estado: EstadoPedido
}

const siguiente: Record<Exclude<EstadoPedido, 'listo'>, EstadoPedido> = {
  pendiente: 'preparando',
  preparando: 'listo',
}

const filtros: Filtro[] = ['todos', 'pendiente', 'preparando', 'listo']

const pedidosIniciales: Pedido[] = [
  { id: 1, cliente: 'Ana', estado: 'pendiente' },
  { id: 2, cliente: 'Benjamín', estado: 'preparando' },
  { id: 3, cliente: 'Camila', estado: 'listo' },
  { id: 4, cliente: 'Diego', estado: 'pendiente' },
]

export function TableroPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales)
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [seleccionadoId, setSeleccionadoId] = useState<number | null>(null)

  const visibles = pedidos.filter((p) => filtro === 'todos' || p.estado === filtro)
  // Se guarda el id (no el objeto) para que el detalle no quede desactualizado al avanzar el estado.
  const seleccionado: Pedido | null = pedidos.find((p) => p.id === seleccionadoId) ?? null

  function avanzar(id: number) {
    setPedidos((actuales) =>
      actuales.map((p) => (p.id === id && p.estado !== 'listo' ? { ...p, estado: siguiente[p.estado] } : p)),
    )
  }

  return (
    <section>
      <h2>Tablero de pedidos</h2>
      <label className="campo">
        Filtrar por estado
        <select value={filtro} onChange={(e) => setFiltro(e.target.value as Filtro)}>
          {filtros.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </label>

      {visibles.length === 0 && <p>No hay pedidos con ese estado.</p>}
      {visibles.map((p) => (
        <div className="tarjeta" key={p.id}>
          <strong>#{p.id} {p.cliente}</strong> · {p.estado}{' '}
          <button type="button" onClick={() => setSeleccionadoId(p.id)}>Ver detalle</button>
          {p.estado !== 'listo' && (
            <button type="button" onClick={() => avanzar(p.id)}>
              Pasar a {siguiente[p.estado]}
            </button>
          )}
        </div>
      ))}

      <h3>Detalle</h3>
      {seleccionado === null ? (
        <p>Selecciona un pedido</p>
      ) : (
        <p>Pedido #{seleccionado.id} de {seleccionado.cliente}: {seleccionado.estado}</p>
      )}
    </section>
  )
}
