import React, { useContext, useEffect } from 'react'
import { IniciativeContext } from "./providers/IniciativeContext";

function Card() {

    const { iniciatives } = useContext(IniciativeContext)

    useEffect(() => {
        console.log("Hola", iniciatives)
    }, [iniciatives])

    return (
        <div>
            {iniciatives.length > 0
                ?
                iniciatives.map(i => {
                    return <div className="container" key={i.id}>
                        <h3>{i.name}</h3>
                        <p>{i.description}</p>
                    </div>
                })
                :
                <h1>Loading...</h1>
            }
        </div>
    )

}

export default Card;