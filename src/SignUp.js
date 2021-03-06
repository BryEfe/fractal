import React, { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from "./providers/UserContext";
import { useHistory } from "react-router-dom";
import Map from "./Map";
import { b } from "./barrios.json"
import { t } from "./temas.json";

function SignUp({ setPopUpSignUp }) {

  const { user, register, setRegisterEmail, setRegisterPassword, registerPassword, setRegisterName } = useContext(UserContext);

  const checks = useRef();

  const [barrios, setBarrios] = useState(b);

  const [barrio, setBarrio] = useState();

  const [topics, setTopics] = useState([]);

  const history = useHistory();

  const [keywords, setKeywords] = useState(t);


  const handleLocation = (event) => {
    const barrioX = barrios.filter(b => { return b.lugar === event });
    setBarrio(barrioX[0]);
    console.log("Información", barrioX[0]);

  }

  const handleTopics = (e) => {

    topics.includes(e.target.name) ? setTopics(topics.filter(t => t !== e.target.name)) : setTopics(t => [...topics, e.target.name])

  }

  const [isToggled, setIsToggled] = useState(false);

  const onToggle = () => {

    setIsToggled(!isToggled);

    var arrayBarrios = isToggled ? b.filter(b => { return b.tipo === 1 }) : b.filter(b => { return b.tipo === 0 })

    setBarrios(arrayBarrios);
  };

  return (
    <div className="modal" onClick={() => setPopUpSignUp(false)}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <h3>Crear Nueva Cuenta</h3>
        <div>
          <input
            placeholder="Nombre Completo"
            onChange={(event) => {
              setRegisterName(event.target.value);
            }} />
        </div>
        <input
          placeholder="Correo Electrónico..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />

        <input
          placeholder="Contraseña..."
          type="password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <p>{registerPassword.split('').length < 6 && registerPassword.split('').length > 1 ? "La contraseña debe tener más de 6 caracteres" : ""}</p>

        <div className="container-toggle-switch">
          <p>Vivo en un:       <b>barrio</b></p>
          <label className="toggle-switch">
            <input type="checkbox" checked={isToggled} onChange={onToggle} />
            <span className="switch" />
          </label>
          <p><b>corregimiento</b></p>
        </div>

        <input ref={checks} list="barrios" placeholder={!isToggled ? "Barrio" : "Corregimiento"}
          onChange={(event) => {
            handleLocation(event.target.value)
          }} />

        <datalist id="barrios">
          {barrios.map((e, index) => {
            return <option key={index} value={e.lugar} />
          })}
        </datalist>
        <br />
        {barrio ? <div>
          <h5>{`En Cali, Distrito Especial, tu ${barrio.tipo === 1 ? "barrio" : "corregimiento"} estará en la Localidad ${barrio.localidad}`}</h5>  </div >
          : ""}

        <Map localidad={barrio ? barrio.localidad : 0} />
        <br />
        <h4>Intereses</h4>
        <div className="keywords">
          {keywords.map((k, index) => {
            return <label id="ck-button" key={index}>
              <input type="checkbox" id="btnControl" name={k} hidden onChange={(event) => handleTopics(event)} />
              <span>{k}</span>
            </label>
          })}
        </div>

        <button onClick={() => { register(barrio, topics); setPopUpSignUp(false) }}> Crear Usuario</button>
      </div>




    </div>
  )
}

export default SignUp
