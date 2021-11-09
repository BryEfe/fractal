import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from "./providers/UserContext";
import { useHistory } from "react-router-dom";

function Barranav() {



    const history = useHistory();
    const goToLogin = () => history.push("/login");




    const { user, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <Link to="/"><img className="logo" src="./svg/fractal.svg" alt="" /></Link>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/iniciativas">Iniciativas</Link></li>
                <li><Link to="/reportes">Reportes</Link></li>
                <li><Link to=""><img src="./svg/not_off.svg" /></Link></li>
                <li><Link to=""><img src="./svg/usuario.svg" /></Link></li>
                <li>{user?.email}</li>
                <button onClick={user?.email ? logout : goToLogin}> Sign {user?.email ? "Out" : "In"} </button>

            </ul>
        </nav>
    )
}

export default Barranav;