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

    <div className="initiative initiative-change">
      {changes ? <div className="initiative-sub-two">{
        changes.length > 0 ?
          <div className="initiative-container">{
            changes.sort((a, b) => { return b.createdAt - a.createdAt }).map(i => {
              return <div className="anuncio">
                {i.img ? <img src={i.img} alt="" /> : ""}
                <p>{i.createdAt? i.createdAt.toDate().toLocaleString():""}</p>
                <h3>{i.content}</h3>{i.update}</div>
            })
          }
          </div>
          : "Aún no hay anuncios para esta iniciativa."
      }</div> : ""}
    </div>
  )
}

export default Change
