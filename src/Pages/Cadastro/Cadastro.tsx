import './Cadastro.css'
import  React, { useState } from "react";
import SelectCLient from '../../Components/Select/Select';
import { Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'react-bootstrap';
// import { redirectTo } from "@reach/router"

interface clienteValues {
    persons: Array<object>,
    id: string,
    name: string,
  }
  

export function Cadastro () {

    const [showA, setShowA] = useState(false);

    function createDivida(){
        console.log("oi")
        console.log(motivo,valor, cliente)
        if(motivo !== '' && valor !== '' && cliente !== '') {
            axios.post(`https://provadev.xlab.digital/api/v1/divida?uuid=ce7d2f4d-1d53-43bf-b899-72cb2eb7d336`,
            {
                "idUsuario": cliente,
                "motivo": motivo,
                "valor": valor
            })
            .then(res => {
             <Redirect to="/"/>
              console.log(res.data);
            })

        } else {
            setShowA(true);
 
        }

    }

    const [motivo , setMotivo ] = useState('');
    const [valor, setValor] = useState('');
    const [cliente, setCliente] = useState('');
    return(
        <div className="pageCadastro">
            <div className="cadastro">
                <Toast className="toast" show={showA} onClick={ () => setShowA(false) } >
                    <Toast.Body >Preencha todos os campos corretamente</Toast.Body>
                 </Toast>    
                <h3>Nova Divida:</h3>
                <label htmlFor="cliente">Cliente</label>
                
                <SelectCLient render={ (i: clienteValues ) => (
                    setCliente(i.id)
                )} > </SelectCLient>

                <label htmlFor="motivo">Motivo</label>
                <input  type="motivo" name="motivo" id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Ex: divida cartão de crédito"  />
                <label htmlFor="valor">Valor</label>
                <input  type="valor" name="valor" id="valor" value={valor} onChange={(e) => setValor(e.target.value)}  placeholder="Ex: R$500,00"  />
                <Link to='/' onClick={() => createDivida()} className="btnEnviar">Enviar</Link>
            </div>
        </div>
    )
}
