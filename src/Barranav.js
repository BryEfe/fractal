import React, { useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "./providers/UserContext";
import fractal from './svg/fractal.svg';
import logout_icon from './svg/logout_icon.svg';
import notification from './svg/notificacion.svg'

function Barranav() {

    const { user, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <NavLink to="/"><img className="logo" src={fractal} alt="" /></NavLink>
            <ul>
                <li><NavLink activeClassName='active' exact={true} to="/">Inicio</NavLink></li>
                <li><NavLink to="/iniciativas" activeClassName='active'>Iniciativas</NavLink></li>

                <li>{user?.displayName}</li>
                <li><img src={notification} alt="" /></li>

                <button onClick={user?.email ? logout : ""}><img src={logout_icon} alt="" /></button>
            </ul>
        </nav>
    )
}

export default Barranav;