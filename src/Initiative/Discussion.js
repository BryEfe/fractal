import React, { useContext, useState, useEffect, useRef } from 'react';
import { InitiativeContext } from "../providers/InitiativeContext";
import { UserContext } from "../providers/UserContext";
import { serverTimestampF } from "../firebase";
import { NavLink, useHistory } from "react-router-dom";

function Discussion({ user, id }) {

  const { handleQuery, unSubscribeFromFeed } = useContext(InitiativeContext)


  const history = useHistory();
  const formEl = useRef();
  const [file, setFile] = useState();

  const { comments, handleNewDoc, uploadImage, progress } = useContext(InitiativeContext)
  useEffect(() => {
    console.log(user)
    if (user) {
      handleQuery("comments", "initiative_id", "==", id)
      console.log(comments)
    }
    return () => { unSubscribeFromFeed() };
  }, []);


  const handleNew = async (e) => {
    console.log(handleSubmit(e));
    const referencia = await handleNewDoc("comments", handleSubmit(e));
    formEl.current.reset()
    console.log("referencia es:", referencia);

  }

  const handleImages = async (e) => {
    var imageUrl = "";
    try {
      imageUrl = await uploadImage(e.target.files[0], e.target.files[0].name);
    } catch (error) {
      console.log("Promise Image", error)
    }
    setFile(imageUrl);
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    setFile();
    const formInputs = [...formEl.current.elements].map(e => {
      return { [e.name]: e.value }
    }).filter((value) => Object.keys(value).length !== 0).filter((value) => Object.keys(value)[0] !== "");

    const newSubmitted = formInputs.reduce((acc, input) => {
      return {
        ...acc, ...input, userId: user.uid, initiative_id: id, creator: user.displayName, replies: []
      };
    }, 0);

    return { ...newSubmitted, createdAt: serverTimestampF(), img: file ? file : "" }

  };

  return (
    <div className="initiative discussion">

      {comments ? <div className="initiative-sub-two">

        <form ref={formEl} onSubmit={(e) => handleNew(e)} id="confirmationForm">

          {file ? <img src={file} alt="" /> : ""}

          <input id="name-input" name="content" type="text" placeholder="¿Qué piensas?" />

          <div className="images">
            <input type="file" id="file" name="img" accept="image/*" onChange={(e) => handleImages(e)} />
            <label htmlFor="file">
              {progress === 0 ? file ? "📸" : <p>📸</p> : <p>{progress + "%"}</p>}</label>
          </div>

          <button type="submit"></button>
        </form>


        {
          comments.length > 0 ?
            <div className="initiative-container">
              {comments.sort((a, b) => { return b.createdAt - a.createdAt }).map(i => {
                return <NavLink activeClassName='active' exact={true} to={`discusion/${i.id}`} key={i.id} className="Comentario">
                  <h3>{i.creator}</h3>
                  <p>{i.createdAt ? i.createdAt.toDate().toLocaleString() : ""}</p>
                  {i.img ? <img src={i.img} alt="" /> : ""}
                  {i.content}

                </NavLink>

              })
              }</div>
            : "Aún no hay comentarios para esta iniciativa."
        }</div> : ""}
    </div>
  )
}

export default Discussion
