import React, { useContext, useEffect, useState } from 'react';
import { InitiativeContext } from "../providers/InitiativeContext";
import { UserContext } from "../providers/UserContext";
import Summary from "./Summary";
import Change from "./Change";
import Discussion from "./Discussion";
import Comment from "./Comment";
import { useParams, Route, NavLink, useHistory } from "react-router-dom";
import DiscussionModalCreate from "../DiscussionModalCreate";
import { SettingsContext } from "../providers/SettingsContext";

function Iniciative() {

  const history = useHistory();

  let { iniciativeId } = useParams();

  const { modalCreate, toggleModalCreate } = useContext(SettingsContext)

  const { handleGetDoc, initiative, unSubscribeFromDoc } = useContext(InitiativeContext)

  const [location, setLocation] = useState("Resumen")

  const { user } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('user') === "null" || !localStorage.getItem('user')) {
      history.push("/login");
    }
    handleGetDoc(iniciativeId, "initiatives");
    return () => {
      unSubscribeFromDoc();
    }

  }, [localStorage.getItem('user')])

  return (

    <div className="initiative">

      {initiative ?
        <div className="initiative-parent">
          <div className="initiative-breadcrumbs-nav">
            <h5> {"Iniciativas > Localidad " + initiative.localidad_lugar + " >   " + initiative.lugar + " > " + initiative.name + " > " + location}</h5>
            <div className="initiative-actions">
              <ul>
                <li onClick={() => {
                  setLocation("Resumen");
                  handleGetDoc(iniciativeId, "initiatives");
                }}>
                  <NavLink activeClassName='active' exact={true} to={`/iniciativas/${iniciativeId}/resumen`} className="initiative-action">Resumen</NavLink>
                </li>
                <li onClick={() => { setLocation("Anuncios"); handleGetDoc(iniciativeId, "initiatives"); }}>
                  <NavLink activeClassName='active' exact={true} to={`/iniciativas/${iniciativeId}/anuncios`} className="initiative-action">Anuncios</NavLink>
                </li>
                <li onClick={() => { setLocation("Discusi??n"); handleGetDoc(iniciativeId, "initiatives"); }}>
                  <NavLink activeClassName='active' strict to={`/iniciativas/${iniciativeId}/discusion`} className="initiative-action">Discusi??n</NavLink></li>
              </ul>
            </div>
          </div>
          <Route exact path={`/iniciativas/${iniciativeId}/resumen`} >
            <Summary initiative={initiative} user={user} id={iniciativeId} />
          </Route>

          <Route exact path={`/iniciativas/${iniciativeId}/anuncios`} >
            <Change initiative={initiative} user={user} id={iniciativeId} />

            {user ? user.uid === initiative.userId ? modalCreate ? <DiscussionModalCreate toggleModalCreate={toggleModalCreate} id={iniciativeId} />
              : <button className="button-add" onClick={toggleModalCreate} >  + </button> : "" : ""}


          </Route >
          <Route exact path={`/iniciativas/${iniciativeId}/discusion`} >
            <Discussion initiative={initiative} user={user} id={iniciativeId} />
          </Route >
          <Route exact path={`/iniciativas/${iniciativeId}/discusion/:commentId`} >
            <Comment initiative={initiative} user={user} id={iniciativeId} />
          </Route >
        </div>
        : <div className="modal loader"><div id="loading"></div></div>}


    </div>
  )
}

export default Iniciative
