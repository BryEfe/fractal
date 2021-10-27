import React from 'react'

function Barranav() {
    return (
        <nav id="navbar">   
            <a href><img id="logo"src="./svg/fractal.svg" alt="" /></a>
            <ul>
                <li><a>Inicio</a></li>
                <li><a>Iniciativas</a></li>
                <li><a>Reportes</a></li>
                <li><a><img src="./svg/not_off.svg" /></a></li>
                <li><a><img src="./svg/usuario.svg" /></a></li>
                
            </ul>
         </nav>
    )
}

export default Barranav;