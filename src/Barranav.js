import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "./providers/UserContext";
import fractal from './svg/fractal.svg';
import logout_icon from './svg/logout_icon.svg';
import notification from './svg/notificacion.svg'
import notification2 from './svg/notificacion2.svg'

import notificacion_pressed from './svg/notificacion_pressed.svg'
import { InitiativeContext } from "./providers/InitiativeContext";
import { SettingsContext } from "./providers/SettingsContext";
import Notification from "./Notification";

function Barranav() {

    const { user, logout } = useContext(UserContext);
    const { barUpdates, toggleBarUpdates } = useContext(SettingsContext);
    const history = useHistory();
    const [updates, setUpdates] = useState([])

    const { update, setUpdate, myInitiativeUpdates, myFollowedInitiatives, handleUserUpdates } = useContext(InitiativeContext)

    useEffect(() => {

        if (user && !myInitiativeUpdates || !myFollowedInitiatives) {
            handleUserUpdates(user?.uid, user?.displayName);
            setUpdate(false);
        } else {
            var a = myInitiativeUpdates ? myInitiativeUpdates : [];
            var b = myFollowedInitiatives ? myFollowedInitiatives : [];
            var newArray = [...a, ...b]
            newArray = newArray.filter(u => u.by_id != user.uid).sort((a, b) => { return b.createdAt - a.createdAt })
            if (newArray.length == updates.length) {
                setUpdate(false)
            }
            setUpdates(newArray)
        }



    }, [user, update])


    return (
        <div >
            <nav className="navbar">
                <NavLink to="/"><img className="logo" src={fractal} alt="" /></NavLink>
                <ul>
                    <li onClick={() => { toggleBarUpdates("cerrar"); }}><NavLink activeClassName='active' exact={true} to="/">Inicio</NavLink></li>
                    <li onClick={() => { toggleBarUpdates("cerrar"); }}><NavLink to="/iniciativas" activeClassName='active'>Iniciativas</NavLink></li>
                    <span>  </span>
                    |
                    <li onClick={() => { toggleBarUpdates("cerrar"); }}><NavLink activeClassName='active' exact to={`/usuario/${user.uid}`}>{user?.displayName}</NavLink></li>
                    <li><img onClick={() => { toggleBarUpdates(); setUpdate(false) }} src={barUpdates ? notificacion_pressed : update ? notification2 : notification} alt="" /></li>
                    <li><button onClick={logout}><img src={logout_icon} alt="" /></button></li>
                </ul>

            </nav> {
                barUpdates ? <div className={`panel-wrap ${barUpdates ? "checked" : ""}`} onClick={() => { toggleBarUpdates("cerrar"); }}>
                    <div className="panel">

                        <div onClick={toggleBarUpdates}></div>
                        {<Notification updates={updates} />}

                    </div></div> : ""
            }
        </div >

    )
}

export default Barranav;