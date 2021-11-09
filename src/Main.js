import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Barranav from "./Barranav";
import Card from './Card';
import InitiativeModalCreate from "./InitiativeModalCreate";
import { SettingsContext } from "./providers/SettingsContext";

import Iniciative from "./Iniciative";
function Main() {


 const { modalCreate, toggleModalCreate } = useContext(SettingsContext)

 return (
  <div>

   {modalCreate ?
    <InitiativeModalCreate />
    : <button onClick={toggleModalCreate}> Nuevo </button>
   }

   <Barranav />
   <Switch>
    <Route exact path="/">
     <Card />
    </Route>
    <Route path="/iniciativas/:iniciativeId">
     <Iniciative />
    </Route >
    <Route path="*">
     <h2>Error 404</h2>
    </Route>
   </Switch>

  </div>
 )
}

export default Main
