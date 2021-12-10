import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "./providers/UserContext";

import Map from "./Map";

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
   {userRendered ?

    <div className="location-users">
     <div className="location-users-text">
      <h1>{userRendered.nombre}</h1>
      <h2>{`${userId === user.uid ? "Te interesan iniciativas sobre: " : `Le interesan iniciativas sobre:`}` + userRendered.intereses.join(", ")}</h2>
      <div className="location-users-text">
      </div>
      <br />
      <h3>{`${userId === user.uid ? "Tu localidad es la #" : `Su localidad es la #`}` + userRendered.localidad_lugar}</h3>
      <h3>{`${userRendered.tipo_lugar == 1 ? "Barrio: " : "Corregimiento:"}` + userRendered.lugar}</h3>
     </div>
     <div className="location-users-img">
      <Map localidad={userRendered.localidad_lugar} />
     </div>
    </div>
    : ""}
  </div>
 )
}

export default Users
