import React, { createContext, useState } from "react";
import { db, collectionF, onSnapshotF, addDocF, docF, setDocF, getStorageF, sRef, uploadBytesResumableF, getDownloadURLF, queryF, whereF } from "../firebase";

export const InitiativeContext = createContext();

const InitiativeContextProvider = (props) => {
 // Reference to the collection this context works for. 
 const collection = "initiatives";

 const initiativesCollectionRef = collectionF(db, collection);
 const [initiatives, setInitiatives] = useState([]);
 const [initiative, setInitiative] = useState(null);
 const [progress, setProgress] = useState(0);

 const [pickedLugar, setPickedLugar] = useState("")

 var unsubscribeInititatives = () => { };
 var unsubscribeInititative = () => { };


 const handleFeed = (type, operator, value) => {
  const q = queryF(collectionF(db, "initiatives"), whereF(type, operator, value));
  unsubscribeInititatives = onSnapshotF(q, (data) => {
   console.log("Awake")

   setInitiatives(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }), (error) => {
    console.log("handle feed OnSnapshot error:", error)
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

 const setLike = async (id, uid, oldArray) => {

  var newArray = oldArray.includes(uid) ? oldArray.filter(oi => oi != uid) : [...oldArray, uid]

  console.log("hola", newArray)
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
  <InitiativeContext.Provider value={{ initiatives, initiative, progress, setPickedLugar, setLike, uploadImage, handleFeed, unSubscribeFromFeed, handleNewInitiative, handleGetDoc, unSubscribeFromDoc, handleFeed }}>
   {props.children}
  </InitiativeContext.Provider>
 )

}

export default InitiativeContextProvider
