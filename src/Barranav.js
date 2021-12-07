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

    const { update, setUpdate, myInitiativeUpdates, myFollowedInitiatives, handleUserUpdates, setMyInitiativeUpdates, setMyFollowedInitiatives } = useContext(InitiativeContext)

    useEffect(() => {

        if (user && !myInitiativeUpdates) {

            handleUserUpdates(user?.uid, user?.displayName)
            setUpdate(false);
        } else {
            setMyInitiativeUpdates([]);
            setMyFollowedInitiatives([]);
            var newArray = [...myInitiativeUpdates, ...myFollowedInitiatives]
            newArray = newArray.filter(u => u.by_id != user.uid).sort((a, b) => { return b.createdAt - a.createdAt })

            if (newArray.length == updates.length) {
                setUpdate(false)
            }
            setUpdates(newArray)
        }

    }, [user, update])


    return (
        <div>
            <nav className="navbar">
                <NavLink to="/"><img className="logo" src={fractal} alt="" /></NavLink>
                <ul>
                    <li><NavLink activeClassName='active' exact={true} to="/">Inicio</NavLink></li>
                    <li><NavLink to="/iniciativas" activeClassName='active'>Iniciativas</NavLink></li>
                    <li>{user?.displayName}</li>
                    <li><img onClick={() => { toggleBarUpdates(); setUpdate(false) }} src={barUpdates ? notificacion_pressed : update ? notification2 : notification} alt="" /></li>
                    <button onClick={logout}><img src={logout_icon} alt="" /></button>
                </ul>

            </nav> {
                barUpdates ? <div className={`panel-wrap ${barUpdates ? "checked" : ""}`}>
                    <div className="panel">
                        <div onClick={toggleBarUpdates}>x</div>{<Notification updates={updates} />}
                    </div></div> : ""
            }
        </div >

    )
}

export default Barranav;