import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Barranav from "./Barranav";
import Card from './Card';
import InitiativeModalCreate from "./InitiativeModalCreate";
import { SettingsContext } from "./providers/SettingsContext";
import { UserContext } from "./providers/UserContext";

import Iniciative from "./Iniciative";
function Main() {

 const { modalCreate, toggleModalCreate } = useContext(SettingsContext)

 const { user } = useContext(UserContext);


 const history = useHistory();

 useEffect(() => {
  console.log("user info", user);
  if (!user) {
   history.push("/login");
  }
 }, [user])


 return (
  <div>

   {modalCreate ?
    <InitiativeModalCreate />
    : <button onClick={toggleModalCreate}> Nuevo </button>
   }

   <Barranav />

   <Route exact path="/">
    <Card />
   </Route>
   <Route path="/iniciativas/:iniciativeId">
    <Iniciative />
   </Route>



  </div>
 )
}

export default Main
