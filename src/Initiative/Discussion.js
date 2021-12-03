import React, { useContext, useEffect } from 'react';
import { unSubscribeFromFeed, InitiativeContext } from "../providers/InitiativeContext";
function Discussion({ user, id }) {

 const { initiatives, handleQuery, unSubscribeFromFeed } = useContext(InitiativeContext)

 useEffect(() => {
  console.log(user)
  if (user) {
   handleQuery("changes", "initiative_id", "==", id)
   console.log(initiatives)
  }
  return () => { unSubscribeFromFeed() };
 }, []);
 return (
  <div>

  </div>
 )
}

export default Discussion
