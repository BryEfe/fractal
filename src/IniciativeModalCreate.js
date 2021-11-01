import React, { useRef, useState } from 'react'



function IniciativeModalCreate() {




 return (
  <div className="modal">
   <div className="modal-body">

    <div className="modal-form">
     <h5> Titulo del Proyecto</h5>
     <input type="text" placeholder="Titulo de tu proyecto" />
     <h5> Descripción</h5>
     <input type="text" placeholder="Titulo de tu proyecto" maxlength="350" />
     <label for="img">Select image:</label>
     <input type="file" id="img" name="img" accept="image/*" />
    </div>


   </div>

  </div>
 )
}

export default IniciativeModalCreate
