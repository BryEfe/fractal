import React from 'react'

function Barranav({nombre}) {
    return (
        <nav>   
            <a href="#sec1"><img src="./svg/fractal.svg" alt="" /></a>
            <ul>
                <li><a href="#sec1">{nombre}</a></li>
                <li><a href="#sec2"><img src="./svg/usuario.svg" /></a></li>
                <li><a href="#sec3"><img src="./svg/not_off.svg" /></a></li>
            </ul>
         </nav>
    )
}

export default Barranav;
