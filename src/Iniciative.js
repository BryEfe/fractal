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
     <h1>{initiative.name}</h1>
     <p></p></div>
    : "Loading..."}
  </div>
 )
}

export default Iniciative
