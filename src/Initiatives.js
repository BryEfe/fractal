import React, { useContext, useEffect, useState, useRef } from 'react'
import { InitiativeContext } from "./providers/InitiativeContext";
import { Link } from "react-router-dom";
import { b } from "./barrios.json"
function Card() {

    const [barrios, setBarrios] = useState(b)
    const [barrio, setBarrio] = useState()
    const checks = useRef()

    const { initiatives, unSubscribeFromFeed, handleFeed } = useContext(InitiativeContext)
    var options = { weekday: "long", month: "long", day: "numeric" };

    var optionsTime = { hour12: "false" };
    useEffect(() => {
        handleFeed()
        return () => { unSubscribeFromFeed() };
    }, [])

    const handleLocation = (event) => {
        const barrioX = barrios.filter(b => { return b.lugar === event });
        setBarrio(barrioX[0]);
        console.log("Información", barrioX[0]);

    }


    return (

        <div className="initiative">
            <div className="initiative-subnavbar">
                <h4>Iniciativa</h4>

                <div className="initiative-subnavbar-filters">

                    <div>Ir a Cali</div>

                    <input ref={checks} list="barrios" placeholder="Localidad" onChange={(event) => {
                        handleLocation(event.target.value)
                    }} />

                    <input ref={checks} list="barrios" placeholder="Barrio" onChange={(event) => {
                        handleLocation(event.target.value)
                    }} />

                    <input ref={checks} list="barrios" placeholder="Tema" onChange={(event) => {
                        handleLocation(event.target.value)
                    }} />


                    <datalist id="barrios">
                        {barrios.map((e, index) => {
                            return <option key={index} value={e.lugar} />
                        })}
                    </datalist>

                </div>
            </div>

            <div className="initiative-container">
                {initiatives
                    ?
                    initiatives.map(i => {
                        return <Link to={`iniciativas/${i.id}`} key={i.id}>
                            <div className="container">
                                <h4>{i.name}</h4>
                                <div className="container-author-time">  <h5>{"Por " + i.creator}</h5>
                                    <h5>{i.createdAt ? i.createdAt.toDate().toLocaleDateString("es-ES", options) + " " + i.createdAt.toDate().toLocaleTimeString("es-ES", optionsTime) : ""}</h5></div>


                                <div className="container-img">  {i.img.map((im, index) => { return <img key={index} src={im} alt="" /> })

                                }</div>

                                <p>{i.description}</p>
                                <hr />

                                <Link to={`iniciativas/${i.id}`}> Ver Más...</Link>
                            </div>
                        </Link>
                    })
                    :
                    <h1>Loading...</h1>
                }
            </div>
        </div>
    )

}

export default Card;