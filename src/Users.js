import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "./providers/UserContext";

import { useParams } from "react-router-dom";
function Users() {

 let { userId } = useParams();

 const { user, userInfo, getUserInfo } = useContext(UserContext)

 const [userRendered, setUserRendered] = useState()

 useEffect(async () => {

  var u = await getUserInfo(userId);
  setUserRendered(u);

  return () => { setUserRendered() };

 }, [userId])

 return (
  <div>
   {userRendered ? <div>
    <h3>{userRendered.nombre}</h3>
    <p>{"Intereses: " + userRendered.intereses.join(", ")}</p>

    <h4>{"Localidad: " + userRendered.localidad_lugar}</h4>

    <h4>{`${userRendered.tipo_lugar == 1 ? "Barrio: " : "Corregimiento:"}` + userRendered.lugar}</h4>


   </div> : ""}
  </div>
 )
}

export default Users
