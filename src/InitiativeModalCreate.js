import React, { useRef, useState, useContext } from 'react'
import { InitiativeContext } from "./providers/InitiativeContext";
import { SettingsContext } from "./providers/SettingsContext";
import { serverTimestampF } from "./firebase";

function IniciativeModalCreate() {

  const [currentInitiative, setCurrent] = useState()
  const [sent, setSent] = useState(false)
  const { handleNewInitiative } = useContext(InitiativeContext)
  const { toggleModalCreate } = useContext(SettingsContext)
  const titleRef = useRef();
  const descriptionRef = useRef();


  const handleNew = async () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const referencia = await handleNewInitiative({ name: title, description: description, createdAt: serverTimestampF() })
    console.log("referencia es:", referencia)
    setSent(true);
    setTimeout(() => {
      toggleModalCreate();
    }, 2000);

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
            <input ref={descriptionRef} type="text" placeholder="Titulo de tu proyecto" maxlength="350" />
            <label for="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*" />
            <button onClick={handleNew}>Enviar</button>
          </div> : "Iniciativa Enviada"}
      </div>
    </div>
  )
}

export default IniciativeModalCreate
