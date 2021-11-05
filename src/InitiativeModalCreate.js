import React, { useRef, useState, useContext } from 'react'
import { InitiativeContext } from "./providers/InitiativeContext";
import { SettingsContext } from "./providers/SettingsContext";
import { serverTimestampF } from "./firebase";

function IniciativeModalCreate() {

  const [keywords, setKeywords] = useState([]);
  const [file, setFile] = useState();
  const [sent, setSent] = useState();
  const { handleNewInitiative } = useContext(InitiativeContext)
  const { toggleModalCreate } = useContext(SettingsContext)

  const titleRef = useRef();
  const descriptionRef = useRef();
  const keyWordsRef = useRef();


  const handleNew = async () => {
    console.log("keyword", keyWordsRef.current.value);
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const referencia = await handleNewInitiative(newInitiative(title, description))
    console.log("referencia es:", referencia)
    setSent(true);
    setTimeout(() => {
      toggleModalCreate();
    }, 5000);
  }

  const newInitiative = (name, description, keyWords) => {
    return { name: name, description: description, keyWords: [], createdAt: serverTimestampF() }
  }

  const handleImages = (e) => {
    console.log("SOmeting")
    const url = URL.createObjectURL(e.target.files[0]);
    console.log(url);
    setFile(url);

  }

  return (
    <div className="modal" onClick={toggleModalCreate}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <div onClick={toggleModalCreate}><strong>x</strong> </div>
        {!sent ?
          <div className="modal-form">
            <label> Titulo del Proyecto</label>
            <input ref={titleRef} type="text" placeholder="Titulo de tu proyecto" />
            <label> Descripción</label>
            <textarea ref={descriptionRef} type="text" placeholder="Titulo de tu proyecto" maxLength="350" />

            <label>Añadir Imágenes</label>
            <div className="modal-upload-images" >
              <input type="file" id="file" name="img" accept="image/*" onChange={(e) => handleImages(e)} />
              <label for="file">+</label>
              <div className="image-added">

                {file ? <img src={file} alt="" /> : ""}
              </div>
            </div>
            <label>
              Palabras Clave:

            </label>
            <input ref={keyWordsRef} list="browsers" name="myBrowser" />
            <datalist id="browsers">
              <option value="Seguridad" />
              <option value="Infraestructura" />
              <option value="Movilidad" />
              <option value="Educación" />
              <option value="Medio Ambiente" />
              <option value="Transparencia" />
            </datalist>
            <button onClick={handleNew}>Enviar</button>
          </div> : "Iniciativa Enviada"}
      </div>
    </div >
  )
}

export default IniciativeModalCreate
