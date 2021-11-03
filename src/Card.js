import React, { useContext, useEffect } from 'react'
import { InitiativeContext } from "./providers/InitiativeContext";
import { Link } from "react-router-dom";

function Card() {

    const { initiatives, unSubscribeFromFeed, handleFeed } = useContext(InitiativeContext)

    useEffect(() => {
        handleFeed()
        return () => { unSubscribeFromFeed() }
    }, [])

    return (
        <div>
            {initiatives
                ?
                initiatives.map(i => {
                    return <div className="container" key={i.id}>
                        <Link to={`iniciativas/${i.id}`}><h3>{i.name}</h3></Link>
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