import {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'

const InputSubmit = styled.input`
    border: none;
    border-radius: .5rem;
    background-color: #9497FF;
    width: 100%;
    font-size: 1.7rem;
    text-transform: uppercase;
    color: #fff;
    font-weight: 700;
    padding: .8rem;
    margin-top: 3rem;
    transition: background-color .3s ease-in-out;

    :hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`
const Error = styled.p`
    background-color: #fff;
    text-align: center;
    color: #da1212;
    padding: 1rem 0;
    width: 98%;
    font-weight: 900;
    font-size: 1.2rem;
    border-left: .5rem solid #b10808;
    text-transform: uppercase;
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const monedas = [
        {id: 'ARG', nombre: 'Peso Argentino'},
        {id: 'MXN', nombre: 'Peso Mexicano'},
        {id: 'USD', nombre: 'Dolar de Estados Unidos'},
        {id: 'EUR', nombre: 'Euro'},
        {id: 'GBP', nombre: 'Libra Esterlina'}
    ]

    useEffect(() => {
      
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            const arrayCriptos = resultado.Data.map( cripto => {
                // console.log(cripto.CoinInfo.Name)
                // console.log(cripto.CoinInfo.FullName)

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return objeto
            })

            // console.log(arrayCriptos);
            setCriptos(arrayCriptos);
        }
      
        consultarAPI()
    }, [])
    

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
    const [criptomoneda, SelectCriptomonedas] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    function handleSubmit(e) {
        e.preventDefault()
        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000);
            return;
        }
        setMonedas({
            moneda,
            criptomoneda
        })
    }

  return (
    <form
        onSubmit={handleSubmit}
    >
        {error && (
            <Error>Todos los Campos son Obligatorios</Error>
        )}
        <SelectMonedas />
        <SelectCriptomonedas />

        <InputSubmit 
            type='submit'
            value='Cotizar'
        />
    </form>
  )
}

export default Formulario