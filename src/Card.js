import React, { useContext } from 'react'
import { IniciativeContext } from "./providers/IniciativeContext";

function Card() {

    const { iniciative } = useContext(IniciativeContext)

    return (
        <div class="container">
            <h3>{iniciative.name}</h3>
            <p>{iniciative.description}</p>
        </div>
    )
}

export default Card;