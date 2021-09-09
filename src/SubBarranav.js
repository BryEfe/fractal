import React from 'react'
import SubFilter from './SubFilter'

function SubBarranav() {
    return (
        <div id='navbar'>
            <div id='leftbuttons'>
                <button id="home"><img src="./svg/home.svg"/></button>
                <SubFilter values={['COMUNA1','COMUNA2','COMUNA3']}/>
                <SubFilter values={['BARRIO','BARRIO2','BARRIO3']}/>
            </div>
        </div>
    )
}

export default SubBarranav
