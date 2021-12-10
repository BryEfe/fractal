import React, { useState } from 'react'
import cero from "./svg/loc_0.svg";
import uno from "./svg/loc_1.svg";
import dos from "./svg/loc_2.svg";
import tres from "./svg/loc_3.svg";
import cuatro from "./svg/loc_4.svg";
import cinco from "./svg/loc_5.svg";
import seis from "./svg/loc_6.svg";
function Map({ localidad }) {

 const svgSwitch = () => {

  var s = {};
  switch (localidad) {
   case 0:
    s = cero;
    break;
   case 1:
    s = uno;
    break;
   case 2:
    s = dos;
    break;
   case 3:
    s = tres;
    break;
   case 4:
    s = cuatro;
    break;
   case 5:
    s = cinco;
    break;
   case 6:
    s = seis;
    break;
  }
  return s;
 }
 return (
  <div className="mapa">
   <img src={svgSwitch(localidad)} alt="" />
  </div>
 )
}

export default Map
