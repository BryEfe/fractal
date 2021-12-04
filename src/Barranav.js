import React, { useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "./providers/UserContext";


function Barranav() {

    const { user, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <NavLink to="/"><img className="logo" src="./svg/fractal.svg" alt="" /></NavLink>
            <ul>
                <li><NavLink activeClassName='active' exact={true} to="/">Inicio</NavLink></li>
                <li><NavLink to="/iniciativas" activeClassName='active'>Iniciativas</NavLink></li>

                <li>{user?.displayName}</li>
                <li><img src="./svg/notificacion.svg" alt="" /></li>
                
                <button onClick={user?.email ? logout : ""}><img src="./svg/logout.svg" alt="" />Sign {user?.email ? "Out" : "In"}</button>
            </ul>
        </nav>
    )
}

export default Barranav;