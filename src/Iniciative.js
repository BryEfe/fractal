import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { InitiativeContext } from "./providers/InitiativeContext";


function Iniciative() {

  let { iniciativeId } = useParams();

  const { handleGetDoc, initiative, unSubscribeFromDoc } = useContext(InitiativeContext)

  useEffect(() => {
    handleGetDoc(iniciativeId);
    return () => {
      unSubscribeFromDoc();
    }
  }, [])

  return (
    <div>
      {initiative ?
        <div>
          <h5> {"Iniciativas > " + initiative.name}</h5>
          <br />
          <h1>{initiative.name}</h1>
          <h5>{initiative.keywords.join(", ")}</h5>
          <br />
          <h4>{initiative.description}</h4>
        </div>
        : "Loading..."}
    </div>
  )
}

export default Iniciative
