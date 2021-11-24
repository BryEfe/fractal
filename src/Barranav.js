import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { UserContext } from "./providers/UserContext";
import { useHistory, } from "react-router-dom";

function Barranav() {

    const history = useHistory();

    const goToLogin = () => history.push("/login");

    const { user, logout } = useContext(UserContext);



    return (
        <nav className="navbar">
            <NavLink to="/"><img className="logo" src="./svg/fractal.svg" alt="" /></NavLink>
            <ul>
                <li><NavLink activeClassName='active' exact={true} to="/">Inicio</NavLink></li>
                <li><NavLink to="/iniciativas" activeClassName='active'>Iniciativas</NavLink></li>

                <li>{user?.displayName}</li>
                <button onClick={user?.email ? logout : goToLogin}> Sign {user?.email ? "Out" : "In"} </button>
            </ul>
        </nav>
    )
}

export default Barranav;