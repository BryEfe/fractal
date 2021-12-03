import React, { createContext, useState } from "react";
import { auth, createUserWithEmailAndPasswordF, signInWithEmailAndPasswordF, onAuthStateChangedF, signOutF, updateProfileF, collectionF, setDocF, db, docF, getDocF } from "../firebase";


export const UserContext = createContext();

function UserContextProvider(props) {

 const [registerEmail, setRegisterEmail] = useState("");
 const [registerPassword, setRegisterPassword] = useState("");
 const [registerName, setRegisterName] = useState("");
 const [loginEmail, setLoginEmail] = useState("");
 const [loginPassword, setLoginPassword] = useState("");
 const [errorMessage, setErrorMessage] = useState()

 const [user, setUser] = useState();
 const [userInfo, setUserInfo] = useState();

 onAuthStateChangedF(auth, (currentUser) => {
  setUser(currentUser);
  console.log("nombre", registerName, registerName)

 });

 const register = async (info, intereses) => {

  console.log("Info inside User Context", info)

  try {
   await createUserWithEmailAndPasswordF(auth, registerEmail, registerPassword).then(async (userRec) => {
    const user = userRec.user;
    await setDocF(docF(db, "users", user.uid), {
     lugar: info.lugar,
     id_lugar: info.id,
     tipo_lugar: info.tipo,
     localidad_lugar: info.localidad,
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

   getUserInfo(auth.currentUser.uid);


  } catch (error) {
   setErrorMessage(error.message);
  }
 }

 const login = async () => {

  try {
   await signInWithEmailAndPasswordF(
    auth,
    loginEmail,
    loginPassword
   ).then(u => { getUserInfo(u.user.uid); });

  } catch (error) {
   setErrorMessage(error.message);
  }

 };

 const logout = async () => {

  await signOutF(auth);
 };

 const getUserInfo = async (id) => {
  const docRef = docF(db, "users", id);
  const docSnap = await getDocF(docRef);
  if (docSnap.exists()) {
   setUserInfo(docSnap.data());
  } else {
   console.log("No such document!");
  }
 }

 return (
  <UserContext.Provider value={{ userInfo, errorMessage, user, getUserInfo, setUser, logout, login, register, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword, setRegisterName }}>
   {props.children}
  </UserContext.Provider>
 )
}

export default UserContextProvider
