
import { useState } from 'react';
import IniciativeContext from "./providers/IniciativeContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Barranav from "./Barranav";
import SubBarranav from './SubBarranav';
<<<<<<< Updated upstream

=======
import Card from './Card';
import './App.css';
>>>>>>> Stashed changes
function App() {

  const [nombre, setNombre] = useState('Iniciar Sesion')

  function Gustavo() {
    setNombre('Gustavo Petro')
  }

  return (
<<<<<<< Updated upstream
    <div className="App">
      <Barranav nombre={nombre}/>
      <SubBarranav/>
      {
         //<button onClick={()=>Gustavo()}>CAMP ROCK</button> 
      }
    </div>
=======

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

>>>>>>> Stashed changes
  );
}

export default App;
