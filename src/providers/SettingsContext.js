import React, { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

function SettingsContextProvider(props) {

 const [modalCreate, setModalCreate] = useState(false)

 const toggleModalCreate = () => {
  setModalCreate(!modalCreate);
 }

 return (
  <SettingsContext.Provider value={{ modalCreate, toggleModalCreate }}>
   {props.children}
  </SettingsContext.Provider>
 )
}

export default SettingsContextProvider
