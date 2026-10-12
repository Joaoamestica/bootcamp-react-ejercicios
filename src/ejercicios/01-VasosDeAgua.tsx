import { useState } from 'react'

const META = 8

export function VasosDeAgua() {
  const [vasos, setVasos] = useState(0)

  // Los vasos que faltan se calculan: no necesitan su propio estado.
  const faltan = META - vasos

  return (
    <section>
      <h2>Vasos de agua</h2>
      <p>Llevas {vasos} de {META} vasos.</p>
      <p>{faltan > 0 ? `Te faltan ${faltan} vasos.` : 'No te falta ninguno.'}</p>
      {vasos === META && <p><strong>¡Meta cumplida!</strong></p>}

      <button type="button" onClick={() => setVasos((v) => v + 1)} disabled={vasos >= META}>
        +1 vaso
      </button>
      <button type="button" onClick={() => setVasos((v) => v - 1)} disabled={vasos <= 0}>
        -1 vaso
      </button>
      <button type="button" onClick={() => setVasos(0)}>Reiniciar</button>
    </section>
  )
}
