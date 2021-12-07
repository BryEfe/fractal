import React from 'react'
import my_anuncio from "./svg/my_anuncio.svg";
import follow_anuncio from "./svg/follow_anuncio.svg";
import { Link } from 'react-router-dom'
function Notification({ updates }) {
  return (
    updates.length > 0 ? <div> {updates.map((a, index) => {
      return <div className="notification" key={index}>
        <img src={a.type == "Mine" ? my_anuncio : follow_anuncio} alt="" />
        <div>
          <div className="notification-content">


            <h5>

              <Link to={`/iniciativas/${a.initiative_id}/resumen`}>
                {`Nuevo ${a.action}`}
              </Link>


              {`en ${a.type == "Mine" ? "tu proyecto" : "el proyecto"}`}

              <Link to={`/iniciativas/${a.initiative_id}/resumen`}>{a.initiativeName}</Link>

              {`(${a.createdAt.toDate().toLocaleString()})`}</h5>
          </div>

          <div className="notification-content">
            <Link to={`/usuario/${a.by_id}`}>{a.by}</Link>
            <p>{`  ${a.content == "seguidor" ? "" : ": '" + a.content + "'"}`}</p>
          </div>
        </div>

      </div>
    })}</div>


      : "Todavía no hay notificaciones. ¡Busca y Sigue un Proyecto!")
}

export default Notification
