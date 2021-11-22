import React, { createContext, useState } from "react";
import { auth, createUserWithEmailAndPasswordF, signInWithEmailAndPasswordF, onAuthStateChangedF, signOutF, updateProfileF, collectionF, setDocF, db, docF } from "../firebase";


export const UserContext = createContext();

function UserContextProvider(props) {

 const collection = "users";
 const usersCollectionRef = collectionF(db, collection);
 const [registerEmail, setRegisterEmail] = useState("");
 const [registerPassword, setRegisterPassword] = useState("");
 const [registerName, setRegisterName] = useState("");
 const [loginEmail, setLoginEmail] = useState("");
 const [loginPassword, setLoginPassword] = useState("");
 const [errorMessage, setErrorMessage] = useState()

 const [user, setUser] = useState({});

 onAuthStateChangedF(auth, (currentUser) => {
  setUser(currentUser);

 });

 const register = async (info, intereses) => {

  console.log("Info inside User Context", info)

  try {
   await createUserWithEmailAndPasswordF(auth, registerEmail, registerPassword).then(async (userRec) => {
    const user = userRec.user;
    await setDocF(docF(db, "users", user.uid), {
     nombre: info.lugar,
     id: info.id,
     tipo: info.tipo,
     localidad: info.localidad,
     intereses: intereses

    }).catch((error) => {
     console.log(error);
    });
   }).catch((error) => {
    console.log(error);
   });
   await updateProfileF(auth.currentUser, {
    displayName: registerName
   });

  } catch (error) {
   setErrorMessage(error.message);
  }
 }

 const login = async () => {
  try {
   const user = await signInWithEmailAndPasswordF(
    auth,
    loginEmail,
    loginPassword
   );
   console.log("user", user);

  } catch (error) {
   setErrorMessage(error.message);
  }


 };

 const logout = async () => {
  await signOutF(auth);

 };

 return (
  <UserContext.Provider value={{ errorMessage, user, setUser, logout, login, register, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword, setRegisterName }}>
   {props.children}
  </UserContext.Provider>
 )
}

export default UserContextProvider
