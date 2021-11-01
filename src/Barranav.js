import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { SettingsContext } from "./providers/SettingsContext";
function Barranav() {

    const { toggleModalCreate } = useContext(SettingsContext)
    return (
        <nav className="navbar">
            <Link to="/"><img className="logo" src="./svg/fractal.svg" alt="" /></Link>
            <ul>
                <li><Link to="/inicio">Inicio</Link></li>
                <li><Link to="/iniciativas">Iniciativas</Link></li>
                <li><Link to="/reportes">Reportes</Link></li>
                <button onClick={toggleModalCreate}> Nuevo </button>
                <li><Link to=""><img src="./svg/not_off.svg" /></Link></li>
                <li><Link to=""><img src="./svg/usuario.svg" /></Link></li>


            </ul>
        </nav>
    )
}

export default Barranav;