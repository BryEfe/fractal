import React, { createContext, useState } from "react";
import { auth, createUserWithEmailAndPasswordF, signInWithEmailAndPasswordF, onAuthStateChangedF, signOutF } from "../firebase";
export const UserContext = createContext();

function UserContextProvider(props) {
 const [registerEmail, setRegisterEmail] = useState("");
 const [registerPassword, setRegisterPassword] = useState("");
 const [loginEmail, setLoginEmail] = useState("");
 const [loginPassword, setLoginPassword] = useState("");

 const [user, setUser] = useState({});

 onAuthStateChangedF(auth, (currentUser) => {
  setUser(currentUser);
  console.log("User:", user)

 });

 const register = async () => {
  try {
   const user = await createUserWithEmailAndPasswordF(
    auth,
    registerEmail,
    registerPassword
   );
   console.log(user);
  } catch (error) {
   console.log(error.message);
  }
 };

 const login = async () => {
  try {
   const user = await signInWithEmailAndPasswordF(
    auth,
    loginEmail,
    loginPassword
   );
   console.log("user", user);
  } catch (error) {
   console.log(error.message);
  }
 };

 const logout = async () => {
  await signOutF(auth);
 };

 return (
  <UserContext.Provider value={{ user, setUser, logout, login, register, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword }}>
   {props.children}
  </UserContext.Provider>
 )
}

export default UserContextProvider
