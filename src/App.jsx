import { useState, useEffect } from 'react'

import styled from '@emotion/styled'
import ImagenCriptomoneda from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'


const Contenedor = styled.div`
  max-width: 80rem;
  margin: 5rem auto 0 auto;
  width: 90%;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 3rem;
  }
`
const ImagenCripto = styled.img`
  width: 80%;
  max-width: 40rem;
  margin: 0 auto;
  display: block;
`
const Heading = styled.h1`
  color: #fff;
  font-weight: 700;
  text-align: center;
  font-size: 3rem;

  ::after {
    content: '';
    background-color: #66A2FE;
    width: 8rem;
    height: .5rem;
    display: block;
    margin: 1rem auto 3rem auto;
  }
`


function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const {moneda, criptomoneda} = monedas

      const consultarAPI = async () => {

        setCargando(true)
        setResultado({})

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
  
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
  
        console.log(resultado.DISPLAY[criptomoneda][moneda]);
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);

        setCargando(false)
      }
  
      consultarAPI()
    }
  }, [monedas])

  return (
    <Contenedor>
      <div>
        <ImagenCripto 
          src={ImagenCriptomoneda}
          alt='Imagen de las Criptos'
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario 
          setMonedas={setMonedas}
        />
        {cargando && <Spinner />}
        {Object.keys(resultado).length > 0 && (
          <Resultado 
            resultado={resultado}
          />
        )}
      </div>
    </Contenedor>
  )
}

export default App
