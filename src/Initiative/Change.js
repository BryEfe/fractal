import React, { useContext, useEffect } from 'react';
import { InitiativeContext } from "../providers/InitiativeContext";
function Change({ user, id }) {

  const { changes, handleQuery, unSubscribeFromFeed } = useContext(InitiativeContext)

  useEffect(() => {
    if (user) {
      handleQuery("changes", "initiative_id", "==", id)
      console.log(changes)
    }
    return () => { unSubscribeFromFeed() };
  }, []);

  return (

    <div className="initiative">
      {changes ? <div className="initiative-sub-two">{
        changes.length > 0 ?
          <div className="initiative-container">{
            changes.map(i => {
              return <div className="anuncio">
                {i.img ? <img src={i.img} alt="" /> : ""}
                <h3>{i.title}</h3>{i.update}</div>
            })
          }
          </div>
          : "Aún no hay anuncios para esta iniciativa."
      }</div> : ""}
    </div>
  )
}

export default Change
