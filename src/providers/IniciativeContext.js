import React, { createContext, useState, useEffect } from "react";
import { db, collectionF, onSnapshotF, addDocF } from "../firebase";

export const IniciativeContext = createContext();

const IniciativeContextProvider = (props) => {

 const [iniciatives, setIniciatives] = useState([]);
 // Reference to the collection this context works for. 
 const iniciativesCollectionRef = collectionF(db, "iniciatives");

 useEffect(
  () => {
   onSnapshotF(iniciativesCollectionRef, (data) =>
    setIniciatives(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
   )
  }, [])

 const handleNewIniciative = async (payload) => {
  const docRef = await addDocF(iniciativesCollectionRef, payload);
  return docRef.data;

 }

 return (
  <IniciativeContext.Provider value={{ iniciatives }}>
   {props.children}
  </IniciativeContext.Provider>
 )

}

export default IniciativeContextProvider
