import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SelectCLient from "../../Components/Select/Select";
import "./style.css"

interface clienteValues {
    persons: Array<object>,
    id: string,
    name: string,
  }
  

export function Editar(props: { match: { params: { id: string; }; }; }) {

    const [motivo , setMotivo ] = useState('');
    const [valor, setValor] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [cliente, setCliente] = useState('');
    const [novoCliente, setNovoCliente] = useState(clienteId);
    const [id] = useState(props.match.params.id)
    
    useEffect(() => {
        axios.get(`https://provadev.xlab.digital/api/v1/divida/${id}?uuid=ce7d2f4d-1d53-43bf-b899-72cb2eb7d336`)
        .then( res => {
            setMotivo(res.data.result.motivo);
            setValor(res.data.result.valor)
            setClienteId(res.data.result.idUsuario);
        //    setCliente(1)
        })

        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(response => {
            var arrayCliente = [...response.data] 
            for (var i=0; i<arrayCliente.length; i++) {
                if(arrayCliente[i].id === clienteId) {
                    setCliente(arrayCliente[i].name)
                }
            }
        })
    },[clienteId, id, setClienteId, setMotivo, setValor])
    
    const editarDivida = () =>{
        console.log(cliente, "novo cliente", novoCliente,"clienteID",  clienteId)
        const dados = {
            idUsuario: clienteId,
            motivo: motivo,
            valor: valor
        } 
        console.log(dados)
        axios.put(`https://provadev.xlab.digital/api/v1/divida/${id}?uuid=ce7d2f4d-1d53-43bf-b899-72cb2eb7d336`,dados)
        .then(res => {

                console.log("aq")
                console.log(res);
                console.log(res.data);
        })
        console.log("FIM")
    }

    return(
        <div className="pageAtualizacao">
            <div className="atualizacao">
                <h3>Editar Divida:</h3>
                <label htmlFor="cliente">Cliente</label>
                
                <SelectCLient  value={{label:cliente, value: clienteId}}  render={ (i: clienteValues ) => {
                    setNovoCliente(i.name)

                    if(novoCliente !== ""){
                        setCliente(i.name)
                        setClienteId(i.id)
                    }
                }} > </SelectCLient>

                <label htmlFor="motivo">Motivo</label>
                <input  type="motivo" name="motivo" id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Ex: divida cartão de crédito"  />
                <label htmlFor="valor">Valor</label>
                <input  type="valor" name="valor" id="valor" value={valor} onChange={(e) => setValor(e.target.value)}  placeholder="Ex: R$500,00"  />
                <Link onClick={() => editarDivida()} className="btnEnviar" to="/" >Salvar</Link>
            </div>
        </div>
    )

}