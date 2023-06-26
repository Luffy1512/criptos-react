import styled from '@emotion/styled'
import React from 'react'

const ResultadoDiv = styled.div`
    color: #fff;
    margin-top: 2rem;
`
const Texto = styled.p`
    font-size: 1.2rem;
    span {
        font-weight: 700;
    }
`
const Precio = styled.p`
    font-size: 2.2rem;
    span {
        font-weight: 700;
    }
`
const Imagen = styled.img`
    width: 10rem;
    margin: 0 auto;
`

const Resultado = ({resultado}) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

  return (
    <ResultadoDiv>
        <Imagen 
            src={`https://cryptocompare.com/${IMAGEURL}`}
            alt='Imagen Criptomoneda'
        />
        <Precio>El Precio es de: <span>{PRICE}</span></Precio>
        <Texto>El Precio más alto del día: <span>{HIGHDAY}</span></Texto>
        <Texto>El Precio más bajo del día: <span>{LOWDAY}</span></Texto>
        <Texto>Variación últimas 24 horas: <span>%{CHANGEPCT24HOUR}</span></Texto>
        <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
    </ResultadoDiv>
  )
}

export default Resultado