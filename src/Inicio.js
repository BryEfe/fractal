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

  </div>
 )
}

export default Inicio
