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
    <h1>{userRendered.nombre}</h1>
    <h2>{"Te interesan iniciativas sobre: " + userRendered.intereses.join(", ")}</h2>

    <h3>{"Perteneces a la localidad " + userRendered.localidad_lugar}</h3>

    <h3>{`${userRendered.tipo_lugar == 1 ? "Barrio: " : "Corregimiento:"}` + userRendered.lugar}</h3>


   </div> : ""}
  </div>
 )
}

export default Users
