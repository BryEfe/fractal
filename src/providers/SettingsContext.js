import React, { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

function SettingsContextProvider(props) {

 const [modalCreate, setModalCreate] = useState(false)

 const toggleModalCreate = () => {
  setModalCreate(!modalCreate);
 }
 const [barUpdates, setBarUpdates] = useState(false)

 const toggleBarUpdates = (condition) => {
  if (condition == "cerrar") {
   setBarUpdates(false);
  } else {
   setBarUpdates(!barUpdates);
  }

 }

 return (
  <SettingsContext.Provider value={{ modalCreate, toggleModalCreate, barUpdates, toggleBarUpdates }}>
   {props.children}
  </SettingsContext.Provider>
 )
}

export default SettingsContextProvider
