import React, { createContext, useState } from "react";
import { db, collectionF, onSnapshotF, addDocF, docF, setDocF, getStorageF, sRef, uploadBytesResumableF, getDownloadURLF, queryF, whereF, getDocF } from "../firebase";

export const InitiativeContext = createContext();

const InitiativeContextProvider = (props) => {
  // Reference to the collection this context works for. 

  const [initiatives, setInitiatives] = useState([]);
  const [initiative, setInitiative] = useState(null);
  const [comment, setComment] = useState(null);
  const [progress, setProgress] = useState(0);
  const [myInitiativeUpdates, setMyInitiativeUpdates] = useState()
  const [myFollowedInitiatives, setMyFollowedInitiatives] = useState()
  const [changes, setChanges] = useState(null)
  const [comments, setComments] = useState()
  const [pickedLugar, setPickedLugar] = useState("");
  const [update, setUpdate] = useState(false)
  var unsubscribeInititatives = () => { };
  var unsubscribeInititative = () => { };


  const handleQuery = (collection, type, operator, value) => {

    console.log("hello", collection, type, operator, value);

    var q = ""

    if (collection == "updates") {

      switch (operator) {
        case "==":
          q = queryF(collectionF(db, "updates"), whereF(type, operator, value));
          break;
        case "array-contains":
          q = queryF(collectionF(db, "updates"), whereF(type, operator, value));
          break;
      }

    } else {
      q = queryF(collectionF(db, collection), whereF(type, operator, value));
    }

    unsubscribeInititatives = onSnapshotF(q, (data) => {
      switch (collection) {
        case "initiatives":
          setInitiatives(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          break;
        case "changes":
          setChanges(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          break;
        case "comments":
          setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          break;
        case "updates":
          if (operator == "==") {
            setMyInitiativeUpdates(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, type: "Mine" })));
          } else {
            setMyFollowedInitiatives(data.docs.map((doc) => ({ ...doc.data(), id: doc.id, type: "Follow" })));
          }
          setUpdate(true)
          break;
      }
    }, (error) => {
      console.log("handle feed OnSnapshot error:", error)
    })
  }

  const handleUserUpdates = (uid, name) => {
    handleQuery("updates", "followers", "array-contains", { by: name, uid: uid });
    handleQuery("updates", "creatorId", "==", uid);
  }

  const unSubscribeFromFeed = () => {
    setMyInitiativeUpdates();
    setMyFollowedInitiatives(); setInitiatives(); unsubscribeInititatives();
  }

  const handleGetDoc = (ref, collection) => {
    const docRef = docF(db, collection, ref);
    unsubscribeInititative = onSnapshotF(docRef, (doc) => {
      switch (collection) {
        case "initiatives":
          setInitiative(doc.data())
          break;
        case "comments":
          setComment(doc.data())
          break;
      }
    }, (error) => {
      console.log("handle get Doc OnSnapshot error:", error)
    });
  }

  const unSubscribeFromDoc = () => {
    setInitiative();
    setComments();
    setChanges();
    unsubscribeInititative();
  }

  /*Writes initiatives, changes and top comments to database */
  const handleNewDoc = async (collection, payload) => {
    const docRef = await addDocF(collectionF(db, collection), payload);
    if (collection != "updates") {
      handleUpdates(collection == "initiatives" ? docRef.id : payload.initiative_id, collection, payload);
    }
    return docRef.id;
  }

  const handleUpdates = async (ref, action, payload) => {
    const docRef = docF(db, "initiatives", ref);
    const docSnap = await getDocF(docRef);
    if (docSnap.exists()) {
      const update = {
        action: handleTypeUpdate(action),
        followers: docSnap.data().followers,
        creator: docSnap.data().creator,
        initiativeName: docSnap.data().name,
        initiative_id: ref,
        creatorId: docSnap.data().userId,
        createdAt: new Date(),
        ...handleUpdateContent(action, payload)
      }
      console.log("update", update)
      handleNewDoc("updates", update)
    } else {
      console.log("No such document!");
    }
  }

  const handleTypeUpdate = (action) => {
    var a = ""
    switch (action) {
      case "comments":
        a = "comentario"
        break;
      case "initiative":
        a = "iniciativa"
        break;

      case "changes":
        a = "anuncio"
        break;

      case "like":
        a = "seguidor"
        break;

      case "reply":
        a = "réplica"
        break;


    }

    return a;
  }

  const handleUpdateContent = (action, content) => {
    var update = ""
    switch (action) {
      case "comments":
      case "initiatives":
      case "changes":
        update = { content: content.content, by: content.creator, by_id: content.userId }
        break;
      case "reply":
        update = { content: content.content, by: content.by, by_id: content.by_id }
        break;
      case "like":
        update = { content: action, by: content.by, by_id: content.uid }
        break;
    }
    return update;
  }

  /* Writes likes and replies to db  */
  const setLikes = async (id, uid, oldArray) => {
    var newArray = [];
    if (oldArray.filter((e) => { return e.uid === uid.uid; }).length > 0) {
      newArray = oldArray.filter(oi => { return oi.uid !== uid.uid })
    } else {
      newArray = [...oldArray, uid]
    }

    await setDocF(docF(db, "initiatives", id), { followers: newArray }, { merge: true });

    if (!oldArray.filter((e) => { return e.uid === uid.uid; }).length > 0) {
      handleUpdates(id, "like", uid);
    }
  }

  const setReplies = async (commentId, initiativeId, content, oldArray) => {
    var newArray = [];
    newArray = [...oldArray, content]
    await setDocF(docF(db, "comments", commentId), { replies: newArray }, { merge: true });
    handleUpdates(initiativeId, "reply", content);
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
    <InitiativeContext.Provider value={{ update, setUpdate, setLikes, handleUserUpdates, myFollowedInitiatives, myInitiativeUpdates, initiatives, changes, initiative, comments, comment, progress, handleUpdates, setPickedLugar, setReplies, uploadImage, handleQuery, unSubscribeFromFeed, handleNewDoc, handleGetDoc, unSubscribeFromDoc }}>
      {props.children}
    </InitiativeContext.Provider>
  )

}

export default InitiativeContextProvider
