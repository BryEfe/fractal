import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { InitiativeContext } from "../providers/InitiativeContext";
import { serverTimestampF } from "../firebase";
import { NavLink, useHistory } from "react-router-dom";
function Comment({ user }) {

 let { commentId } = useParams();


 const { handleGetDoc, unSubscribeFromDoc, comment, setArray } = useContext(InitiativeContext)

 const formEl = useRef();

 useEffect(() => {
  handleGetDoc(commentId, "comments");
  console.log(comment)
  return () => {
   unSubscribeFromDoc();
  }

 }, [localStorage.getItem('user')])

 const handleNew = async (e) => {

  setArray("comments", commentId, handleSubmit(e), comment.followers)
  formEl.current.reset()

 }

 const handleSubmit = (event) => {
  event.preventDefault();

  const formInputs = [...formEl.current.elements].map(e => {
   return { [e.name]: e.value }
  }).filter((value) => Object.keys(value).length !== 0).filter((value) => Object.keys(value)[0] !== "");

  const newSubmitted = formInputs.reduce((acc, input) => {
   return {
    ...acc, ...input, userId: user.uid, creator: user.displayName
   };
  }, 0);

  var currentdate = new Date().toLocaleString();

  return { ...newSubmitted, createdAt: currentdate }

 };

 return (
  <div>
   {comment ? <div>

    <div className="initiative-container">

     <div className="container update">
      <h3>{comment.creator}</h3>
      {comment.img ? <img src={comment.img} alt="" /> : ""}
      {comment.title}

     </div>

    </div>
    <form ref={formEl} onSubmit={(e) => handleNew(e)} id="confirmationForm">

     <input id="name-input" name="title" type="text" placeholder="¿Qué piensas?" />

     <button type="submit" onSubmit={(event) => handleNew(event)}></button>
    </form>

    {
     comment.followers.map((r, index) => { return <div key={index} className="container"><h3>{r.creator}</h3><p>{r.createdAt}</p> <p>{r.title}</p></div> })
    }
   </div> : ""}
  </div>
 )
}

export default Comment
