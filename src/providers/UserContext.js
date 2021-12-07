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
 const [updates, setUpdates] = useState()
 const [user, setUser] = useState();
 const [userInfo, setUserInfo] = useState();

 onAuthStateChangedF(auth, (currentUser) => {
  setUser(currentUser);
  if (currentUser && !userInfo) {
   getUserInfo(currentUser.uid);
  }
  if (currentUser) {
   if (localStorage.getItem('user') === "null" || !localStorage.getItem('user')) {
    localStorage.setItem('user', currentUser.uid);
   }

  }

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
     intereses: intereses,
     nombre: user?.displayName
    }).catch((error) => { console.log(error); });
   }).catch((error) => { console.log(error); });
   await updateProfileF(auth.currentUser, {
    displayName: registerName
   });

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
   );
  } catch (error) {
   setErrorMessage(error.message);
  }
 };

 const logout = async () => {
  localStorage.setItem('user', null);
  setErrorMessage();
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
  <UserContext.Provider value={{ userInfo, errorMessage, user, auth, getUserInfo, setUser, logout, login, register, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword, setRegisterName }}>
   {props.children}
  </UserContext.Provider>
 )
}

export default UserContextProvider
