import './App.css';
import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Barranav from "./Barranav";
import Card from './Card';
import InitiativeModalCreate from "./InitiativeModalCreate";
import InitiativeContext from "./providers/InitiativeContext";
import { SettingsContext } from "./providers/SettingsContext";
import Iniciative from "./Iniciative";

function App() {

  const { modalCreate, toggleModalCreate } = useContext(SettingsContext)

  return (

    <InitiativeContext>
      <BrowserRouter>
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
      </BrowserRouter>
    </InitiativeContext>

  );
}

export default App;
