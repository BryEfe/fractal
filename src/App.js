
import { useState } from 'react';
import './App.css';
import IniciativeContext from "./providers/IniciativeContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Barranav from "./Barranav";
import Card from './Card';
import SubBarranav from './SubBarranav';
function App() {

  const [nombre, setNombre] = useState('Iniciar Sesion')

  function Gustavo() {
    setNombre('Gustavo Petro')
  }

  return (

    <IniciativeContext>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Barranav />
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
