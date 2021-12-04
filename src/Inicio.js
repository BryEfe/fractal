import React, { useContext, useEffect } from 'react'
import { UserContext } from "./providers/UserContext";

function Inicio() {

  const { user, userInfo, getUserInfo } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      getUserInfo(user.uid)
    }
  }, [])

  return (
    <div>
<hr />
      {user ?
        <div><h3>{user.displayName ? `Hola, ${user.displayName.split(" ").length >= 4 ? user.displayName.split(" ").slice(0, 3).join(" ") : user.displayName.split(" ")[0]}` : ""}</h3>

          <h5>{userInfo ? <div><p>{`Sabemos que te interesan iniciativas sobre ${userInfo.intereses.join(",")}.`}</p> <p> Las siguientes iniciativas te pueden interesar</p></div> : ""}</h5></div>
        : ""}
    </div>
  )
}

export default Inicio
