import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "./providers/UserContext";
import { useHistory, Link } from "react-router-dom";
import SignUp from "./SignUp";
import home from "./svg/home.svg";

function Login() {

 const { user, login, setLoginEmail, setLoginPassword, errorMessage } = useContext(UserContext);

 const history = useHistory();

 const [popUpSignUp, setPopUpSignUp] = useState(false)

 useEffect(() => {
  if (user?.email) { history.push("/"); setLoginEmail(); setLoginPassword(); } else {
   localStorage.setItem('user', null);
  }
  console.log(user);
 }, [user])


 return (

  <div>

   <div className="login">

    <div className="login-info">
     <div className="login-info-text">
      <h1>Transformemos la ciudad desde el barrio.</h1>
      <h4>Con Fractal podrás formular y discutir los proyectos que transformarán a Cali. ¡Únete!</h4>
     </div>

    </div>

    <div className="login-input">

     <input
      placeholder="Correo Electrónico"
      onChange={(event) => {
       setLoginEmail(event.target.value);
      }}
     />

     <input
      placeholder="Contraseña"
      type="password"
      onChange={(event) => {
       setLoginPassword(event.target.value);
      }}
     />

     <h5>{errorMessage ? "Usuario o Cuenta incorrecta" : ""}</h5>
     <div className="login-buttons">
      <div onClick={() => login()}><h4>Ingresar</h4></div>
      <div onClick={() => { setPopUpSignUp(true) }}><h4>Crear Cuenta</h4></div>
     </div>
    </div>
    <img src={home} alt="" />
   </div>
   {popUpSignUp ? <SignUp setPopUpSignUp={setPopUpSignUp} /> : ""}
  </div>


 )
}

export default Login
