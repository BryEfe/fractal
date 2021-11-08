import React, { useRef, useState, useContext, useEffect } from 'react'
import { InitiativeContext } from "./providers/InitiativeContext";
import { SettingsContext } from "./providers/SettingsContext";
import { serverTimestampF } from "./firebase";

function IniciativeModalCreate() {

  const [keywords, setKeywords] = useState(["Seguridad", "Infraestructura", "Movilidad", "Educación", "Medio Ambiente", "Transparencia"])

  const [file, setFile] = useState([]);
  const [sent, setSent] = useState();
  const { handleNewInitiative, uploadImage, progress } = useContext(InitiativeContext)
  const { toggleModalCreate } = useContext(SettingsContext)

  const formEl = useRef();

  const handleNew = async (e) => {
    console.log(handleSubmit(e));
    const referencia = await handleNewInitiative(handleSubmit(e));
    console.log("referencia es:", referencia);
    setSent(true);
    setTimeout(() => {
      toggleModalCreate();

    }, 5000);
  }


  const handleImages = async (e) => {

    const imageUrl = await uploadImage(e.target.files[0], e.target.files[0].name);
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
      return { ...acc, ...input, keywords: kArray };
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
              <label htmlFor="team-input"> Descripción</label>
              <textarea name="description" type="text" cols="40" rows="5" />
              <label>Añadir Imágenes</label>
              <div className="modal-upload-images" >

                <div className="images">
                  <input type="file" id="file" name="img" accept="image/*" onChange={(e) => handleImages(e)} />
                  <label for="file">+</label>

                  {file
                    ? file.map((f, index) => {
                      return <div className="image-added" key={index}>

                        <img src={f} alt="" />
                        <progress id="file" value={progress} max="100" />
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
