import React from 'react'

function Barranav({nombre}) {
    return (
<<<<<<< Updated upstream
        <nav>   
            <a href="#sec1"><img src="./svg/fractal.svg" alt="" /></a>
            <ul>
                <li><a href="#sec1">{nombre}</a></li>
                <li><a href="#sec2"><img src="./svg/usuario.svg" /></a></li>
                <li><a href="#sec3"><img src="./svg/not_off.svg" /></a></li>
=======
        <nav id="navbar">
            <a href><img id="logo" src="./svg/fractal.svg" alt="" /></a>
            <ul>
                <li><a>Inicio</a></li>
                <li><a>Iniciativas</a></li>
                <li><a>Reportes</a></li>
                <li><a><img src="./svg/not_off.svg" /></a></li>
                <li><a><img src="./svg/usuario.svg" /></a></li>
>>>>>>> Stashed changes
            </ul>
        </nav>
    )
}

export default Barranav;
