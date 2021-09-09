
import { useState } from 'react';
import './App.css';
import Barranav from "./Barranav";
import SubBarranav from './SubBarranav';

function App() {

  const [nombre, setNombre] = useState('Iniciar Sesion')

  function Gustavo() {
    setNombre('Gustavo Petro')
  }
  return (
    <div className="App">
      <Barranav nombre={nombre}/>
      <SubBarranav/>
      {
         //<button onClick={()=>Gustavo()}>CAMP ROCK</button> 
      }
    </div>
  );
}

export default App;
