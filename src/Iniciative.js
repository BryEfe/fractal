import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { InitiativeContext } from "./providers/InitiativeContext";
import { UserContext } from "./providers/UserContext";
import { Route, useHistory } from "react-router-dom";

function Iniciative() {

  const history = useHistory();

  let { iniciativeId } = useParams();

  const { handleGetDoc, initiative, unSubscribeFromDoc } = useContext(InitiativeContext)

  const { user } = useContext(UserContext)

  useEffect(() => {
    handleGetDoc(iniciativeId);

    if (!user || !iniciativeId) {
      history.push("/login");
    }
    return () => {
      unSubscribeFromDoc();
    }
  }, [])

  return (
    <div className="initiative">
      {initiative ?
        <div>
          <h5> {"Iniciativas > Localidad " + initiative.localidad_lugar + " >   " + initiative.lugar + " > " + initiative.name}</h5>
          <br />
          <div className="initiative-name-actions">
            <h2>{initiative.name}</h2>


            {user.uid === initiative.userId ? "" : <div className="initiative-actions">
              <button className="initiative-action">Seguir</button><button className="initiative-action">Apoyar</button>
            </div>}
          </div>

          <div className="info-initiative">
            <h5>{"Por " + initiative.creator}</h5>
            <h5>{"Temas: " + initiative.keywords.join(", ")}</h5>
          </div>
          <div className="images-iniciativa">
            {initiative.img ?
              initiative.img.map((i, index) => {
                return <div key={index}>
                  <img src={i} alt="" />
                </div>
              }) : ""}
          </div >
          <p>{initiative.description}</p>
        </div>
        : "Loading..."}
    </div>
  )
}

export default Iniciative
