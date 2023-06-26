import styled from '@emotion/styled'
import {useState, useEffect} from 'react'

// Vamos a construir un select y poder reutilizarlo para las monedas y cruptomonedas de nuestro proyecto
// si tenemos {} tenemos logica de programacion pero si tenemos () significa que devolvemos algo en pantalla


const Label = styled.label`
    color: #fff;
    font-weight: 700;
    font-size: 1.5rem;
    display: block;
    margin-bottom: 1rem;
`
const Select = styled.select`
    background-color: #fff;
    border-radius: .5rem;
    padding: 1rem .5rem;
    width: 100%;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.2rem;
`

const useSelectMonedas = (label, options) => {

    const [state, setState] = useState('')
  
    const SelectMonedas = () => (
        <>
            <Label htmlFor="">{label}</Label>
            <Select
                value={state}
                onChange={ e => setState(e.target.value)}
            >
                <option value="">--Seleccione--</option>
                {options.map( opcion => (
                    <option 
                        key={opcion.id}
                        value={opcion.id}
                    >
                    {opcion.nombre}
                    </option>
                ) )}
            </Select>
        </>
    )

    return [ state, SelectMonedas ]
}

export default useSelectMonedas