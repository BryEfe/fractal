import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { UserContext } from "./providers/UserContext";
import fractal from './svg/fractal.svg';
import logout_icon from './svg/logout_icon.svg';
import notification from './svg/notificacion.svg'

import notification2 from './svg/notificacion2.svg'
import { InitiativeContext } from "./providers/InitiativeContext";
import { SettingsContext } from "./providers/SettingsContext";
function Barranav() {

    const { user, logout } = useContext(UserContext);
    const { barUpdates, toggleBarUpdates } = useContext(SettingsContext);

    const [updates, setUpdates] = useState([])
    const { myInitiativeUpdates, myFollowedInitiatives, handleUserUpdates } = useContext(InitiativeContext)

    useEffect(() => {
        if (user && updates.length < 1) {
            handleUserUpdates(user?.uid, user?.displayName)
            setUpdates([...myInitiativeUpdates, ...myFollowedInitiatives])
        }

        if (updates.length > 0) {
            console.log("myFollowedInitiatives:", myFollowedInitiatives)
            console.log("myInitiativeUpdates:", myInitiativeUpdates)
            setUpdates([...myInitiativeUpdates, ...myFollowedInitiatives])
        }
    }, [user, myFollowedInitiatives, handleUserUpdates])



    return (
        <div>
            <nav className="navbar">
                <NavLink to="/"><img className="logo" src={fractal} alt="" /></NavLink>
                <ul>
                    <li><NavLink activeClassName='active' exact={true} to="/">Inicio</NavLink></li>
                    <li><NavLink to="/iniciativas" activeClassName='active'>Iniciativas</NavLink></li>
                    <li>{user?.displayName}</li>
                    <li><img onClick={toggleBarUpdates} src={barUpdates ? notification2 : notification} alt="" /></li>
                    <button onClick={user?.email ? logout : ""}><img src={logout_icon} alt="" /></button>
                </ul>

            </nav> {barUpdates && updates.length > 0 ? <div className={`panel-wrap ${barUpdates ? "checked" : ""}`}>
                <div className="panel">
                    <div onClick={toggleBarUpdates}>x</div>{updates.map((a) => { return <p> {`Nuevo ${a.action} ${a.content}`}</p> })}
                </div></div> : ""
            }


        </div>

    )
}

export default Barranav;