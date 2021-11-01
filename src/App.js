import './App.css';
import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Barranav from "./Barranav";
import Card from './Card';
import IniciativeModalCreate from "./IniciativeModalCreate";
import IniciativeContext from "./providers/IniciativeContext";
import { SettingsContext } from "./providers/SettingsContext";

function App() {

  const { modalCreate } = useContext(SettingsContext)

  return (

    <IniciativeContext>
      <BrowserRouter>
        {modalCreate ?
          <IniciativeModalCreate />
          : ""

        }
        <Barranav />
        <Switch>
          <Route exact path="/">
            <Card />
          </Route>
          <Route exact path="/">
            <Card />
          </Route>
          <Route path="*">
            <h2>Error 404</h2>
          </Route>
        </Switch>
      </BrowserRouter>
    </IniciativeContext>

  );
}

export default App;
