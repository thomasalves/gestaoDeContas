import axios from "axios";
import React, { useEffect, useState } from "react"
import './sideBar.css';

export function SideBar(_props: any)  {   
  const [dividas,  setDividas] = useState([])
  const [idCLiente, setIdcliente] = useState([]);

  useEffect(() => {
    axios.get(`https://provadev.xlab.digital/api/v1/divida?uuid=ce7d2f4d-1d53-43bf-b899-72cb2eb7d336`)
    .then( Response => {
      axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        var Arraycliente = [...res.data]
        var Arraydividas = [...Response.data.result]
        console.log('cliente' ,Arraycliente, "dividas", Arraydividas)
        for(var i=0; i<Arraycliente.length; i++){
          for(var j=0; j < Arraydividas.length; j++){
            if(Arraycliente[i].id === Arraydividas[j].idUsuario){
              setDividas(Arraycliente[i].name)
              setIdcliente(Arraydividas[j]._id)
            }
          }
        }
      })
      // setDividas(Response.data.result)
    })
  }, [setDividas, setIdcliente])


  console.log(dividas, idCLiente)
  return(
        <div className="card">
          <button onClick={() => setIdcliente(idCLiente)} >{dividas}</button>
        </div>
  )
}