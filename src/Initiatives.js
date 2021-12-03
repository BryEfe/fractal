import React, { useContext, useEffect } from 'react';
import { InitiativeContext } from "./providers/InitiativeContext";
import { Link } from "react-router-dom";
import { UserContext } from "./providers/UserContext";
import { useHistory } from "react-router-dom";

function Card() {

    const { initiatives, setLike } = useContext(InitiativeContext)
    const { user } = useContext(UserContext)


    const history = useHistory();

    useEffect(() => {

        if (localStorage.getItem('user') === "null") { history.push("/login") }


    }, [localStorage.getItem('user')])


    var options = { weekday: "long", month: "long", day: "numeric" };

    var optionsTime = { hour12: "false" };

    const like = (array) => {
        return array[0] ? user.uid.localeCompare(array[0]) : false;
    }

    return (

        <div className="initiative">
            <div>
                {initiatives
                    ?
                    <div>{initiatives.length > 0 ? <div className="initiative-container">{initiatives.map(i => {
                        return < Link to={`iniciativas/${i.id}/resumen`
                        } key={i.id}>
                            <div className="container">
                                <div className="title-button">
                                    <h4>{i.name}</h4>
                                    {user ? user.uid !== i.userId ? <button onClick={(e) => { e.preventDefault(); setLike(i.id, user.uid, i.followers) }} className={like(i.followers) === 0 ? "like" : "unlike"}>
                                        {like(i.followers) === 0 ? "Siguiendo" : "Seguir"}
                                    </button> : "" : ""}
                                </div>

                                <div className="container-author-time">

                                    <h5>{"Por " + i.creator}</h5>
                                    <h5>{i.createdAt ? i.createdAt.toDate().toLocaleDateString("es-ES", options) + " " + i.createdAt.toDate().toLocaleTimeString("es-ES", optionsTime) : ""}</h5>

                                </div>
                                <div className="container-img">
                                    {i.img.map((im, index) => { return <img key={index} src={im} alt="" /> })}
                                </div>
                                <div className="container-description"><p>{i.description}</p></div>

                                <hr />

                                <Link to={`iniciativas/${i.id}/resumen`}> Ver Más...</Link>
                            </div>
                        </Link >
                    })}</div> : ""}</div>

                    :
                    <h1>Loading...</h1>
                }
            </div>
        </div >
    )

}

export default Card;