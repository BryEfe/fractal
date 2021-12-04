import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { InitiativeContext } from "../providers/InitiativeContext";
import { serverTimestampF } from "../firebase";
import { NavLink, useHistory } from "react-router-dom";
function Comment({ user }) {

 let { commentId } = useParams();


 const { handleGetDoc, unSubscribeFromFeed, comment } = useContext(InitiativeContext)


 useEffect(() => {
  console.log(user)
  if (user) {
   handleGetDoc(commentId, "comments");
   console.log("lalala", comment, commentId)
  }
  return () => { unSubscribeFromFeed() };
 }, []);


 return (
  <div>
   {commentId}
  </div>
 )
}

export default Comment
