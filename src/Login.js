import React, { useContext, useEffect } from 'react';
import { UserContext } from "./providers/UserContext";
import { useHistory, Link } from "react-router-dom";

function Login() {

 const { user, login, setLoginEmail, setLoginPassword, errorMessage } = useContext(UserContext);

 const history = useHistory();

 useEffect(() => {

  if (user?.email) {
   history.push("/");
  }

 }, [user])


 return (

  <div>

   <div className="login">

    <div className="login-info"> <Link to="/"><img className="logo" src="./svg/fractal.svg" alt="" /></Link>
     <div className="login-info-text">
      <h1>Lorem Ipsum  dolor sit amet,  elit.</h1>
      <h4>Morbi nec diam nulla. Mauris quis cursus sem. Fusce in libero mi. Suspendisse varius enim eu nulla sodales.</h4>
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
     <h5>{errorMessage}</h5>
     <div className="login-buttons">
      <div onClick={login}>Ingresar</div>
      <Link to="/signup"><div onClick={login}>Crear Cuenta</div></Link>

     </div>
    </div>

   </div>

  </div>
 )
}

export default Login
