import React, { useContext } from 'react'
import { InitiativeContext } from "../providers/InitiativeContext";
import Discussion from "./Discussion";
function Summary({ initiative, user, id }) {

  const { setLikes } = useContext(InitiativeContext)

  const like = (array) => {
    let result = array.map(a => a.uid);
    return array.length > 0 ? result.includes(user.uid) : false;
  }

  return (
    initiative ?
      <div className="top-initiative-parent">

        <div className="initiative-name-follow">
          <h2>{initiative.name}</h2>

          {user ? user.uid !== initiative.userId ?
            <button onClick={(e) => { setLikes(id, { by: user?.displayName, uid: user.uid }, initiative.followers) }} className={like(initiative.followers) ? "like" : "unlike"}>{like(initiative.followers) ? "Siguiendo" : "Seguir"}</button> : "" : ""}
        </div>

        <div className="info-initiative">

          <div className="info-initiative-creator"><h5>{"Por " + initiative.creator} |</h5>
            <h5>{"Temas: " + initiative.keywords.join(", ")}</h5>
          </div>

          <div className="images-iniciativa">
            {initiative.img ?
              initiative.img.map((i, index) => {
                return <img key={index} src={i} alt="" />
              }) : ""}

            {initiative.img.length > 0 && initiative.img.length < 2 ?
              <div>  <img src="https://wallpaperaccess.com/full/1285952.jpg" alt="" />
                <img src="https://wallpaperaccess.com/full/1285952.jpg" alt="" /></div> : ""}

            {initiative.img.length > 1 ?
              <img src="https://wallpaperaccess.com/full/1285952.jpg" alt="" />
              : ""}


          </div >
          <br />
          <h4>{initiative.followers.length === 0 ? "Sé la primera persona en apoyar esta iniciativa" : `${initiative.followers.length} ${initiative.followers.length > 1 ? "personas apoyan " : "persona apoya "} este proyecto.`}</h4>
          <h3>{initiative.description}</h3>

        </div>
        <hr />
        <Discussion user={user} id={id} />
      </div > : ""

  )
}

export default Summary
