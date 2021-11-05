import React, { createContext, useState } from "react";
import { db, collectionF, onSnapshotF, addDocF, docF } from "../firebase";

export const InitiativeContext = createContext();

const InitiativeContextProvider = (props) => {
 // Reference to the collection this context works for. 
 const collection = "initiatives"
 const [initiatives, setInitiatives] = useState([]);
 const [initiative, setInitiative] = useState(null);
 var unsubscribeInititatives = () => { };
 var unsubscribeInititative = () => { };
 const initiativesCollectionRef = collectionF(db, collection);

 const handleFeed = () => {
  unsubscribeInititatives = onSnapshotF(initiativesCollectionRef, (data) => {
   console.log("Awake")
   setInitiatives(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }), (error) => {
    console.log("handle feed OnSnapshot errro:", error)
   }))
  })
 }

 const unSubscribeFromFeed = () => {
  console.log("unmount")
  unsubscribeInititatives();
 }

 const handleNewInitiative = async (payload) => {
  const docRef = await addDocF(initiativesCollectionRef, payload);
  return docRef.id;
 }

 const handleGetDoc = (ref) => {
  console.log("mount Doc")
  const docRef = docF(db, collection, ref);
  unsubscribeInititative = onSnapshotF(docRef, (doc) => {
   setInitiative(doc.data())
  }, (error) => {
   console.log("handle get Doc OnSnapshot errro:", error)
  });
 }

 const unSubscribeFromDoc = () => {
  console.log("unmount")
  unsubscribeInititative();
 }

 return (
  <InitiativeContext.Provider value={{ initiatives, initiative, handleFeed, unSubscribeFromFeed, handleNewInitiative, handleGetDoc, unSubscribeFromDoc, handleFeed }}>
   {props.children}
  </InitiativeContext.Provider>
 )

}

export default InitiativeContextProvider