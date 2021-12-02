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

  const { user } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {

    if (!user) {
      history.push("/login");
    }

  }, [user])


  return (
    <div className="app">

      <Barranav />

      <Route exact path="/">
        <Inicio />
        <Inititatives />
      </Route>

      <Route exact path="/iniciativas">
        <Filtros />
        <Inititatives />
        {modalCreate ?
          <InitiativeModalCreate />
          : <button className="button-add" onClick={toggleModalCreate}> + </button>}
      </Route>

      <Route path="/iniciativas/:iniciativeId">
        <Iniciative />
      </Route>

    </div>
  )
}

export default Main
