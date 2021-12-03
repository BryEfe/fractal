import React, { useRef, useState, useContext } from 'react'
import { InitiativeContext } from "./providers/InitiativeContext";
import { UserContext } from "./providers/UserContext";
import { serverTimestampF } from "./firebase";
import { t } from "./temas.json";

function IniciativeModalCreate({ toggleModalCreate }) {

  const [keywords, setKeywords] = useState(t)

  const [file, setFile] = useState([]);
  const [sent, setSent] = useState();

  const { handleNewDoc, uploadImage, progress } = useContext(InitiativeContext)

  const { user, userInfo } = useContext(UserContext)

  const formEl = useRef();

  const handleNew = async (e) => {
    console.log(handleSubmit(e));
    const referencia = await handleNewDoc("initiatives", handleSubmit(e));
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
      console.log("Promise Image", imageUrl)
    } catch (error) {
      console.log("Promise Image", error)
    }
    setFile((oldFile) => [...oldFile, imageUrl]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var kArray = []
    const formInputs = [...formEl.current.elements].map(e => {
      if (e.hasOwnProperty('checked')) {
        if (e.checked) {
          kArray.push(e.name)
        }
      }

      return !e.hasOwnProperty('checked') ? { [e.name]: e.value } : {}
    }).filter((value) => Object.keys(value).length !== 0).filter((value) => Object.keys(value)[0] !== "");

    const newSubmitted = formInputs.reduce((acc, input) => {
      return {
        ...acc, ...input, keywords: kArray, userId: user.uid, creator: user.displayName, lugar: userInfo.lugar,
        id_lugar: userInfo.id_lugar,
        tipo_lugar: userInfo.tipo_lugar,
        localidad_lugar: userInfo.localidad_lugar
      };
    }, 0);

    return { ...newSubmitted, createdAt: serverTimestampF(), img: file }
  };

  return (
    <div className="modal" onClick={toggleModalCreate}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <div onClick={toggleModalCreate}><strong>x</strong> </div>
        {!sent ?
          <div className="modal-form">

            <form ref={formEl} onSubmit={(e) => handleNew(e)} id="confirmationForm">
              <label htmlFor="name-input"> Titulo del Proyecto</label>
              <input id="name-input" name="name" type="text" placeholder="Titulo de tu proyecto" />
              <label htmlFor="team-input">Descripción</label>
              <textarea name="description" type="text" cols="40" rows="5" />
              <label>Añadir Imágenes</label>
              <div className="modal-upload-images" >
                <div className="images">
                  <input type="file" id="file" name="img" accept="image/*" onChange={(e) => handleImages(e)} />

                  <label htmlFor="file"> <progress id="file" value={progress} max="100" style={progress === 0 ? {} : { background: "#FF8D97" }} />{progress === 0 ? <p>+</p> : <p>{progress + "%"}</p>}</label>
                  {file
                    ? file.map((f, index) => {
                      return <div className="image-added" key={index}>
                        <p>Eliminar</p>
                        <img src={f} alt="" />

                      </div>
                    })
                    : ""}
                </div>
              </div>
              <label>Palabras Clave</label>
              <div className="keywords">
                {keywords.map((k, index) => {
                  return <label id="ck-button" key={index}>
                    <input type="checkbox" id="btnControl" name={k} hidden />
                    <span>{k}</span>
                  </label>
                })}
              </div>

              <button type="submit">SUBMIT</button>
            </form>
          </div> : "Iniciativa Enviada"}
      </div>
    </div >
  )
}

export default IniciativeModalCreate
