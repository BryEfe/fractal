import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Barranav from "./Barranav";
import Inititatives from './Initiatives';
import InitiativeModalCreate from "./InitiativeModalCreate";
import Filtros from "./Filtros";
import Inicio from "./Inicio";
import { SettingsContext } from "./providers/SettingsContext";
import { UserContext } from "./providers/UserContext";
import Iniciative from "./Initiative/Iniciative";


function Main() {

  const { modalCreate, toggleModalCreate } = useContext(SettingsContext)

  const { user, userInfo } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {

    if (localStorage.getItem('user') === "null" || !localStorage.getItem('user')) {
      history.push("/login")
    }

  }, [localStorage.getItem('user')])


  return (
    user ?
      <div className="app">
        <Barranav />
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route exact path="/iniciativas">
          <Filtros />
          <Inititatives />
          {modalCreate ?
            <InitiativeModalCreate toggleModalCreate={toggleModalCreate} />
            : <button className="button-add" onClick={toggleModalCreate}> + </button>}
        </Route>
        <Route path="/iniciativas/:iniciativeId">
          <Iniciative />
        </Route>

      </div>
      : <div className="modal loader"><div id="loading"></div></div>)
}

export default Main
