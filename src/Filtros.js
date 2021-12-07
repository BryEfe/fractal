import React, { useEffect, useContext, useState } from 'react'
import { t } from "./temas.json";
import { b } from "./barrios.json"
import { InitiativeContext } from "./providers/InitiativeContext";
import { UserContext } from "./providers/UserContext";

function Filtros() {

  const [barrios, setBarrios] = useState(b.sort((a, b) => a.lugar.localeCompare(b.lugar)));

  const [keywords, setKeywords] = useState(t);

  const { unSubscribeFromFeed, handleQuery } = useContext(InitiativeContext);

  const { user, userInfo } = useContext(UserContext);

  const { initiatives } = useContext(InitiativeContext)

  const [selected, setSelected] = useState();

  useEffect(() => {
    if (user && userInfo) {
      setSelected({ tipo: "Barrio", texto: "", valor: userInfo.lugar });
      handleBarrios(userInfo.lugar);
    }
    return () => { unSubscribeFromFeed(); setSelected() };
  }, [user, userInfo]);


  const handleBarrios = (event) => {
    setSelected({ tipo: "Barrio", texto: "en el barrio", valor: event });
    handleQuery("initiatives", "lugar", "==", event);
  }

  const handleLocalidades = (event) => {
    setSelected({ tipo: "Localidad", texto: "en la localidad", valor: event });
    handleQuery("initiatives", "localidad_lugar", "==", parseInt(event));
  }

  const handleTemas = (event) => {
    setSelected({ tipo: "Temática", texto: "sobre", valor: event });
    handleQuery("initiatives", "keywords", "array-contains", event);
  }


  return (
    userInfo && selected && initiatives ?
      <div className="top-initiative-subnavbar">
        <div className="initiative-subnavbar">
          <h4>{`Iniciativas  ${selected ? `> ${selected.tipo} > ${selected.valor}` : ""}`} </h4>

          <div className="initiative-subnavbar-filters">


            <select value={selected ? selected.tipo === "Localidad" ? selected.valor : "none" : ""} refplaceholder="Localidad" onChange={(event) => {
              handleLocalidades(event.target.value)
            }}>
              <option value="none" selected disabled hidden>Localidad</option>
              <option value="1" >Localidad 1</option>
              <option value="2" >Localidad 2</option>
              <option value="3" >Localidad 3</option>
              <option value="4" >Localidad 4</option>
              <option value="5" >Localidad 5</option>
              <option value="6" >Localidad 6</option>
            </select>


            <select value={selected ? selected.tipo === "Barrio" ? selected.valor : "none" : ""} placeholder="Barrio" onChange={(event) => {
              handleBarrios(event.target.value)
            }} >
              <option value="none" selected disabled hidden>Barrio</option>
              {barrios.map((e, index) => {
                return <option key={index} value={e.lugar} >{e.lugar}</option>
              })} </select>


            <select placeholder="Tema" value={selected ? selected.tipo === "Temática" ? selected.valor : "none" : ""} onChange={(event) => {
              handleTemas(event.target.value)
            }} >
              <option value="none" selected disabled hidden>Tema</option>
              {keywords.map((e, index) => {
                return <option key={index} value={e} >{e}</option>
              })} </select>
          </div>
        </div>


        {initiatives.length === 0 && selected ? `Todavía no hay iniciativas  ${selected.texto} ${selected.valor}` : ""}</div>

      : <div className="modal loader"><div id="loading"></div></div>)
}

export default Filtros
