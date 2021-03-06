import React, { useContext, useEffect } from 'react';
import { InitiativeContext } from "./providers/InitiativeContext";
import { Link } from "react-router-dom";
import { UserContext } from "./providers/UserContext";
import { useHistory } from "react-router-dom";

function Card() {

    const { initiatives, setLikes } = useContext(InitiativeContext)
    const { user } = useContext(UserContext)

    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('user') === "null" || !localStorage.getItem('user')) { history.push("/login") }

    }, [localStorage.getItem('user')])

    var options = { weekday: "long", month: "long", day: "numeric" };

    var optionsTime = { hour12: "false" };

    const like = (array) => {
        let result = array.map(a => a.uid);
        return array.length > 0 ? result.includes(user.uid) : false;
    }

    return (

        <div className="initiative">
            <div className="initiative-sub-one">
                {initiatives
                    ?
                    <div className="initiative-sub-two">{initiatives.length > 0 ? <div className="initiative-container">{initiatives.sort((a, b) => { return b.createdAt - a.createdAt }).map(i => {
                        return < Link to={`iniciativas/${i.id}/resumen`
                        } key={i.id}>
                            <div className="container">
                                <div className="container-top">
                                    
                                    <div className="title-button">
                                        <h4>{i.name}</h4>
                                        {user ? user.uid !== i.userId ? <button onClick={(e) => { e.preventDefault(); setLikes(i.id, { by: user?.displayName, uid: user.uid }, i.followers) }} className={like(i.followers) ? "like" : "unlike"}>
                                            {like(i.followers) ? "Siguiendo" : "Seguir"}
                                        </button> : "" : ""}
                                    </div>

                                    <div className="container-author-time">

                                        <h5>{"Por " + i.creator} | </h5>
                                        <h5>{i.createdAt ? i.createdAt.toDate().toLocaleDateString("es-ES", options) + " " + i.createdAt.toDate().toLocaleTimeString("es-ES", optionsTime) : ""}</h5>

                                    </div>
                                    <div className="container-location">
                                        <h5>{`Localidad ${i.localidad_lugar} | ${i.lugar} | ${i.keywords.join(",")}`}</h5>
                                    </div>
                                </div>
                                <div className="container-bot">
                                    <div className="container-img">
                                        {i.img.map((im, index) => { return <img key={index} src={im} alt="" /> })}
                                    </div>
                                    <div className="container-description"><p>{i.description}</p></div>

                                    <hr />

                                    <Link to={`iniciativas/${i.id}/resumen`}> Ver M??s...</Link>
                                </div>
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