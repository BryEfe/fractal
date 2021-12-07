import React, { useContext, useEffect } from 'react'
import { UserContext } from "./providers/UserContext";

import { useParams } from "react-router-dom";
function Users() {

 let { userId } = useParams();

 const { user, userInfo, getUserInfo } = useContext(UserContext)

 useEffect(() => {

  getUserInfo(userId)

 }, [])
 return (
  <div>
   {userInfo.id}
  </div>
 )
}

export default Users
