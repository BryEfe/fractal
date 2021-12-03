import React, { useContext, useEffect } from 'react';
import { unSubscribeFromFeed, InitiativeContext } from "../providers/InitiativeContext";
function Change({ user, id }) {

 const { updates, handleQuery, unSubscribeFromFeed } = useContext(InitiativeContext)

 useEffect(() => {
  if (user) {
   handleQuery("changes", "initiative_id", "==", id)
   console.log(updates)
  }
  return () => { unSubscribeFromFeed() };
 }, []);

 return (

  <div className="initiative">
   {updates.length > 0 ?
    <div className="initiative-container">{
     updates.map(i => {
      return <div className="container update">
       <img src={i.img} alt="" />
       <h3>{i.title}</h3>{i.update}</div>
     })
    }
    </div>
    : "Aún no hay anuncios para esta iniciativa."
   }
  </div>
 )
}

export default Change
