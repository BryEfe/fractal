import React, { useContext, useEffect } from 'react';
import { UserContext } from "./providers/UserContext";
import { useHistory } from "react-router-dom";

function Login() {

 const { user, logout, login, register, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword } = useContext(UserContext);

 const history = useHistory();

 useEffect(() => {
  console.log("user info", user);
  if (user?.email) {
   history.push("/");
  }

 }, [history, user])


 return (
  <div>
   <div>
    <h3> Register User </h3>
    <input
     placeholder="Email..."
     onChange={(event) => {
      setRegisterEmail(event.target.value);
     }}
    />
    <input
     placeholder="Password..."
     onChange={(event) => {
      setRegisterPassword(event.target.value);
     }}
    />

    <button onClick={register}> Create User</button>
   </div>

   <div>
    <h3> Login </h3>
    <input
     placeholder="Email..."
     onChange={(event) => {
      setLoginEmail(event.target.value);
     }}
    />
    <input
     placeholder="Password..."
     onChange={(event) => {
      setLoginPassword(event.target.value);
     }}
    />

    <button onClick={login}>Login</button>
   </div>

   <h4> User Logged In: </h4>
   {user?.email}

   <button onClick={logout}> Sign Out </button>
  </div>
 )
}

export default Login
