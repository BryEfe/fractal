import React, { useRef, useState, useContext } from 'react'
import { InitiativeContext } from "./providers/InitiativeContext";
import { UserContext } from "./providers/UserContext";
import { serverTimestampF } from "./firebase";
function DiscussionModalCreate({ toggleModalCreate, id }) {

  const [keywords, setKeywords] = useState(["Seguridad", "Infraestructura", "Movilidad", "Educación", "Medio Ambiente", "Transparencia"])

  const [file, setFile] = useState();
  const [sent, setSent] = useState();
  const { handleNewDoc, uploadImage, progress } = useContext(InitiativeContext)

  const { user, userInfo } = useContext(UserContext)

  const formEl = useRef();

  const handleNew = async (e) => {
    console.log(handleSubmit(e));
    const referencia = await handleNewDoc("changes", handleSubmit(e));
    console.log("referencia es:", referencia);
    setSent(true);
    setTimeout(() => {
      toggleModalCreate();
    }, 5000);
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

    const formInputs = [...formEl.current.elements].map(e => {
      return { [e.name]: e.value }
    }).filter((value) => Object.keys(value).length !== 0).filter((value) => Object.keys(value)[0] !== "");

    const newSubmitted = formInputs.reduce((acc, input) => {
      return {
        ...acc, ...input, userId: user.uid, initiative_id: id, creator: user.displayName
      };
    }, 0);

    return { ...newSubmitted, createdAt: serverTimestampF(), img: file ? file : "" }
  };

  return (
    <div className="modal" onClick={toggleModalCreate}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <div onClick={toggleModalCreate}><strong>x</strong> </div>
        {!sent ?
          <div className="modal-form">

            <form ref={formEl} onSubmit={(e) => handleNew(e)} id="confirmationForm">
              <label htmlFor="name-input"> Titulo del Proyecto</label>
              <input id="name-input" name="content" type="text" placeholder="Titulo de tu proyecto" />
              <label htmlFor="team-input">Descripción</label>
              <textarea name="update" type="text" cols="40" rows="5" />
              <label>Añadir Imágenes</label>

              <div className="modal-upload-images" >

                <div className="images">

                  <input type="file" id="file" name="img" accept="image/*" onChange={(e) => handleImages(e)} />

                  <label htmlFor="file">
                    <progress id="file" value={progress} max="100" style={progress === 0 ? {} : { background: "#FF8D97" }} />{progress === 0 ? file ? "reemplazar" : <p>+</p> : <p>{progress + "%"}</p>}</label>
                  {file
                    ? <div className="image-added">
                      <p>Eliminar</p>
                      <img src={file} alt="" />
                    </div>
                    : ""}
                </div>
              </div>

              <button type="submit">Subir Anuncio</button>
            </form>
          </div> : "Anuncio Enviado"}
      </div>
    </div >
  )
}

export default DiscussionModalCreate
