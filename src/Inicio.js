import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "./providers/UserContext";
import { InitiativeContext } from "./providers/InitiativeContext";
import { Link } from "react-router-dom";
function Inicio() {

  const { user, userInfo } = useContext(UserContext)
  const { unSubscribeFromFeed, handleUserFeed, initiativesLocalidad, initiativesBarrio, initiativesKeywords, setLikes } = useContext(InitiativeContext);


  var options = { weekday: "long", month: "long", day: "numeric" };

  var optionsTime = { hour12: "false" };



  useEffect(() => {
    if (user && userInfo) {
      handleUserFeed(userInfo.intereses[0], userInfo.localidad_lugar, userInfo.lugar)
      console.log("interestInitiatives", initiativesKeywords)
    }
    return () => unSubscribeFromFeed();
  }, [user, userInfo])


  const like = (array) => {
    let result = array.map(a => a.uid);
    return array.length > 0 ? result.includes(user.uid) : false;
  }

  return (initiativesKeywords && user && initiativesLocalidad && initiativesBarrio ?
    <div className="feed">

      {user ?
        <div><h4>{user.displayName ? `Hola, ${user.displayName.split(" ").length >= 4 ? user.displayName.split(" ").slice(0, 3).join(" ") : user.displayName.split(" ")[0]}` : ""}</h4>

          <h5>creemos que te podrían interesar las siguientes iniciativas :</h5></div>
        : <div className="modal loader"><div id="loading"></div></div>}


      <h3>{userInfo ? userInfo.intereses[0] : ""}</h3>

      {initiativesKeywords
        ?
        <div className="initiative-feed">{initiativesKeywords.length > 0 ? <div className="initiative-feed-container">{initiativesKeywords.filter(u => u.userId != user.uid).sort((a, b) => { return b.createdAt - a.createdAt }).map(i => {
          return < Link to={`iniciativas/${i.id}/resumen`
          } key={i.id}>
            <div className="container">
              <div className="container-top">
                <div className="container-location">
                  <h5>{`Localidad ${i.localidad_lugar} | ${i.lugar} | ${i.keywords.join(",")}`}</h5>
                </div>
                <div className="title-button">
                  <h4>{i.name}</h4>
                  {user ? user.uid !== i.userId ? <button onClick={(e) => { e.preventDefault(); setLikes(i.id, { by: user?.displayName, uid: user.uid }, i.followers) }} className={like(i.followers) ? "like" : "unlike"}>
                    {like(i.followers) ? "Siguiendo" : "Seguir"}
                  </button> : "" : ""}
                </div>

                <div className="container-author-time">
                  <h5>{"Por " + i.creator} | </h5>
                  <h5>{i.createdAt ? i.createdAt.toDate().toLocaleDateString("es-ES", options) + " " + i.createdAt.toDate().toLocaleTimeString("es-ES", optionsTime) : ""}</h5>
                </div>
              </div>
              <div className="container-bot">
                <div className="container-img">
                  {i.img.map((im, index) => { return <img key={index} src={im} alt="" /> })}
                </div>
                <div className="container-description"><p>{i.description}</p></div>
                <hr />
                <Link to={`iniciativas/${i.id}/resumen`}> Ver Más...</Link>
              </div>
            </div>
          </Link >
        })}</div> : ""}</div>
        :
        <h5>Loading...</h5>
      }

      <h3>{userInfo ? userInfo.lugar : ""}</h3>


      {initiativesBarrio
        ?
        <div className="initiative-feed">{initiativesBarrio.length > 0 ? <div className="initiative-feed-container">{initiativesBarrio.filter(u => u.userId != user.uid).sort((a, b) => { return b.createdAt - a.createdAt }).map(i => {
          return < Link to={`iniciativas/${i.id}/resumen`
          } key={i.id}>
            <div className="container">
              <div className="container-top">
                <div className="container-location">
                  <h5>{`Localidad ${i.localidad_lugar} | ${i.lugar} | ${i.keywords.join(",")}`}</h5>
                </div>
                <div className="title-button">
                  <h4>{i.name}</h4>
                  {user ? user.uid !== i.userId ? <button onClick={(e) => { e.preventDefault(); setLikes(i.id, { by: user?.displayName, uid: user.uid }, i.followers) }} className={like(i.followers) ? "like" : "unlike"}>
                    {like(i.followers) ? "Siguiendo" : "Seguir"}
                  </button> : "" : ""}
                </div>

                <div className="container-author-time">
                  <h5>{"Por " + i.creator} | </h5>
                  <h5>{i.createdAt ? i.createdAt.toDate().toLocaleDateString("es-ES", options) + " " + i.createdAt.toDate().toLocaleTimeString("es-ES", optionsTime) : ""}</h5>
                </div>
              </div>
              <div className="container-bot">
                <div className="container-img">
                  {i.img.map((im, index) => { return <img key={index} src={im} alt="" /> })}
                </div>
                <div className="container-description"><p>{i.description}</p></div>
                <hr />
                <Link to={`iniciativas/${i.id}/resumen`}> Ver Más...</Link>
              </div>
            </div>
          </Link >
        })}</div> : ""}</div>
        :
        <h5>Loading...</h5>
      }

      <h3>{userInfo ? `Localidad ${userInfo.localidad_lugar}` : ""}</h3>

      {initiativesLocalidad
        ?
        <div className="initiative-feed">{initiativesLocalidad.length > 0 ? <div className="initiative-feed-container">{initiativesLocalidad.filter(u => u.userId != user.uid).sort((a, b) => { return b.createdAt - a.createdAt }).map(i => {
          return < Link to={`iniciativas/${i.id}/resumen`
          } key={i.id}>
            <div className="container">
              <div className="container-top">
                <div className="container-location">
                  <h5>{`Localidad ${i.localidad_lugar} | ${i.lugar} | ${i.keywords.join(",")}`}</h5>
                </div>
                <div className="title-button">
                  <h4>{i.name}</h4>
                  {user ? user.uid !== i.userId ? <button onClick={(e) => { e.preventDefault(); setLikes(i.id, { by: user?.displayName, uid: user.uid }, i.followers) }} className={like(i.followers) ? "like" : "unlike"}>
                    {like(i.followers) ? "Siguiendo" : "Seguir"}
                  </button> : "" : ""}
                </div>

                <div className="container-author-time">
                  <h5>{"Por " + i.creator} | </h5>
                  <h5>{i.createdAt ? i.createdAt.toDate().toLocaleDateString("es-ES", options) + " " + i.createdAt.toDate().toLocaleTimeString("es-ES", optionsTime) : ""}</h5>
                </div>
              </div>
              <div className="container-bot">
                <div className="container-img">
                  {i.img.map((im, index) => { return <img key={index} src={im} alt="" /> })}
                </div>
                <div className="container-description"><p>{i.description}</p></div>
                <hr />
                <Link to={`iniciativas/${i.id}/resumen`}> Ver Más...</Link>
              </div>
            </div>
          </Link >
        })}</div> : ""}</div>
        :
        <h5>Loading...</h5>
      }
    </div>
    : <div className="modal loader"><div id="loading"></div></div>)
}

export default Inicio
