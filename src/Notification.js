import React from 'react'

function Notification({ updates }) {



 return (
  <div>
   {updates.map((a, index) => {
    return <div className="notification" key={index}>
     <div>  <img src="" alt="" />
      <p>{a.type}</p>
      <p>{a.createdAt.toDate().toLocaleString()}</p>
      <h5>{` Nuevo ${a.action} en ${a.initiativeName}`}</h5>
     </div>
     <div>
      <p>{` ${a.by} ${a.content == "seguidor" ? "" : ": " + a.content}`}</p>
     </div>

    </div>
   })}
  </div>
 )
}

export default Notification
