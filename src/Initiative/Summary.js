import React, { useEffect } from 'react'

function Summary({ initiative, user, setArray, id }) {

  const like = (array) => {
    return array[0] ? user.uid.localeCompare(array[0]) : false;
  }

  return (
    initiative ?
      <div>

        <div className="initiative-name-follow">
          <h2>{initiative.name}</h2>

          {user ? user.uid !== initiative.userId ?
            <button onClick={(e) => { e.preventDefault(); setArray("initiatives", id, user.uid, initiative.followers) }} className={like(initiative.followers) === 0 ? "like" : "unlike"}>{like(initiative.followers) === 0 ? "Siguiendo" : "Seguir"}</button> : "" : ""}
        </div>

        <div className="info-initiative">
          <h5>{"Por " + initiative.creator} |</h5>
          <h5>{"Temas: " + initiative.keywords.join(", ")}</h5>
        </div>
        <div className="images-iniciativa">
          {initiative.img ?
            initiative.img.map((i, index) => {
              return <img key={index} src={i} alt="" />
            }) : ""}
        </div >
        <div className="initiative-description-likes"> <p>{initiative.description}</p> <h2>{initiative.followers.length === 0 ? "Sé la primera persona en apoyar esta iniciativa" : `${initiative.followers.length} ${initiative.followers.length > 1 ? "personas apoyan " : "persona apoya "} este proyecto.`}</h2></div> </div> : ""

  )
}

export default Summary
