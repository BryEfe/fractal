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
                    return <Link to={`iniciativas/${i.id}`} key={i.id}>
                        <div className="container">
                            <img src={i.img[0]} alt="" width="100" />
                            <h3>{i.name}</h3>
                            <p>{i.description}</p>
                            <p>{i.keywords.join(",")}</p>
                        </div>
                    </Link>
                })
                :
                <h1>Loading...</h1>
            }
        </div>
    )

}

export default Card;