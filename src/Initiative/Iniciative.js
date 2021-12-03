import React, { useContext, useEffect, useState } from 'react';
import { InitiativeContext } from "../providers/InitiativeContext";
import { UserContext } from "../providers/UserContext";
import Summary from "./Summary";
import Change from "./Change";
import Discussion from "./Discussion";
import { useParams, Route, NavLink, useHistory } from "react-router-dom";
import DiscussionModalCreate from "../DiscussionModalCreate";
import { SettingsContext } from "../providers/SettingsContext";

function Iniciative() {

  const history = useHistory();

  let { iniciativeId } = useParams();

  const { modalCreate, toggleModalCreate } = useContext(SettingsContext)

  const { handleGetDoc, initiative, unSubscribeFromDoc, setLike } = useContext(InitiativeContext)

  const [location, setLocation] = useState("Resumen")

  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user || !iniciativeId) {
      history.push("/login");
    }
    handleGetDoc(iniciativeId);
    return () => {
      unSubscribeFromDoc();
    }

  }, [])

  return (
    <div className="initiative">
      {initiative ?
        <div>
          <div className="initiative-breadcrumbs-nav">
            <h5> {"Iniciativas > Localidad " + initiative.localidad_lugar + " >   " + initiative.lugar + " > " + initiative.name + " > " + location}</h5>
            <div className="initiative-actions">
              <ul>
                <li onClick={() => setLocation("Resumen")}><NavLink activeClassName='active' exact={true} to={`resumen`} className="initiative-action">Resumen</NavLink></li>
                <li onClick={() => setLocation("Anuncios")}>     <NavLink activeClassName='active' exact={true} to={`anuncios`} className="initiative-action">Anuncios</NavLink></li>
                <li onClick={() => setLocation("Discusión")}>
                  <NavLink activeClassName='active' exact={true} to={`discusion`} className="initiative-action">Discusión</NavLink></li>
              </ul>
            </div>
          </div>
          <Route exact path={`/iniciativas/${iniciativeId}/resumen`} >
            <Summary initiative={initiative} user={user} setLike={setLike} id={iniciativeId} />
          </Route >

          <Route exact path={`/iniciativas/${iniciativeId}/anuncios`} >
            <Change initiative={initiative} user={user} setLike={setLike} id={iniciativeId} />
            {modalCreate ?
              <DiscussionModalCreate toggleModalCreate={toggleModalCreate} id={iniciativeId} />
              : <button className="button-add" onClick={toggleModalCreate} >  + </button>}
          </Route >
          <Route exact path={`/iniciativas/${iniciativeId}/discusion`} >
            <Discussion initiative={initiative} user={user} setLike={setLike} id={iniciativeId} />
          </Route >
        </div>
        : "Loading..."}


    </div>
  )
}

export default Iniciative
