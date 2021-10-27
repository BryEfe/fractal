import React, { createContext, useState } from "react";
export const IniciativeContext = createContext();


const IniciativeContextProvider = (props) => {

 const [iniciative, setIniciative] = useState({ name: "Renovemos la cuadra", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu....Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqu...." });



 return (
  <IniciativeContext.Provider value={{ iniciative }}>
   {props.children}
  </IniciativeContext.Provider>
 )

}

export default IniciativeContextProvider
