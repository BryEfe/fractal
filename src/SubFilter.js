import React from 'react'

function SubFilter({values}) {
    return (
        <select name="comunas" id="comunas">
            {values.map((l, index)=><option key={index} value={l}>{l}</option>)}
        </select>
    )
}

export default SubFilter
