import React, { createContext, useState } from "react";
import { db, collectionF, onSnapshotF, addDocF, docF, setDocF, getStorageF, sRef, uploadBytesResumableF, getDownloadURLF, queryF, whereF } from "../firebase";

export const InitiativeContext = createContext();

const InitiativeContextProvider = (props) => {
 // Reference to the collection this context works for. 

 const [initiatives, setInitiatives] = useState([]);
 const [initiative, setInitiative] = useState(null);
 const [progress, setProgress] = useState(0);
 const [updates, setUpdates] = useState(null)
 const [pickedLugar, setPickedLugar] = useState("");

 var unsubscribeInititatives = () => { };
 var unsubscribeInititative = () => { };


 const handleQuery = (collection, type, operator, value) => {
  const q = queryF(collectionF(db, collection), whereF(type, operator, value));
  unsubscribeInititatives = onSnapshotF(q, (data) => {
   switch (collection) {
    case "initiatives":
     setInitiatives(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
     break;
    case "changes":
     setUpdates(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
     break;
   }
  }, (error) => {
   console.log("handle feed OnSnapshot error:", error)
  })
 }

 const unSubscribeFromFeed = () => { unsubscribeInititatives(); }

 const handleNewDoc = async (collection, payload) => {
  const docRef = await addDocF(collectionF(db, collection), payload);
  return docRef.id;
 }

 const handleGetDoc = (ref) => {
  const docRef = docF(db, "initiatives", ref);
  unsubscribeInititative = onSnapshotF(docRef, (doc) => {
   setInitiative(doc.data())
  }, (error) => {
   console.log("handle get Doc OnSnapshot error:", error)
  });
 }

 const unSubscribeFromDoc = () => {
  setInitiative();
  unsubscribeInititative();
 }

 const setLike = async (id, uid, oldArray) => {

  var newArray = oldArray.includes(uid) ? oldArray.filter(oi => oi != uid) : [...oldArray, uid]

  await setDocF(docF(db, "initiatives", id), { followers: newArray }, { merge: true });

 }

 const uploadImage = (imageToUpload, name) => {

  const storage = getStorageF();

  const storageRef = sRef(storage, "Images/" + name);

  const uploadTask = uploadBytesResumableF(storageRef, imageToUpload, { contentType: "png" });

  return new Promise((resolve, reject) => {
   uploadTask.on('state_changed', (snap) => {

    setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));

   }, (error) => { reject(error); },
    () => getDownloadURLF(uploadTask.snapshot.ref).then((downloadURL) => { setProgress(0); resolve(downloadURL); })
   )
  })
 }


 return (
  <InitiativeContext.Provider value={{ initiatives, updates, initiative, progress, setPickedLugar, setLike, uploadImage, handleQuery, unSubscribeFromFeed, handleNewDoc, handleGetDoc, unSubscribeFromDoc }}>
   {props.children}
  </InitiativeContext.Provider>
 )

}

export default InitiativeContextProvider
