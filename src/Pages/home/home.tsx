/* eslint-disable react-hooks/exhaustive-deps */
import { Menu } from '../../Components/header/Menu';
import "./home.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export function Home () {

    var arrayValue = [] as Array<object>;
    var arrayValor = [] as Array<object>;
    const [dividas ,  setDividas] = useState(arrayValue)
    
    const [motivo, setMotivo] = useState(arrayValor);

  
    useEffect(() => {
      axios.get(`https://provadev.xlab.digital/api/v1/divida?uuid=ce7d2f4d-1d53-43bf-b899-72cb2eb7d336`)
      .then( Response => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => {
          var Arraycliente = [...res.data]
          var Arraydividas = [...Response.data.result]
          for(var i=0; i<Arraycliente.length; i++){
            for(var j=0; j < Arraydividas.length; j++){
              if(Arraycliente[i].id === Arraydividas[j].idUsuario){
                var dados = {
                    name: Arraycliente[i].name,
                    idUsuario : Arraycliente[i].id,
                    _id: Arraydividas[j]._id
                }
               arrayValue.push(dados);  
                }
            }
        }

     const removeDuplicates = (array: Array<object>, key: string | number) => {
        return array.reduce((arr: Array<any> , item: { [x: string]: any; }) => {
            const removed = arr.filter(i => i[key] !== item[key]);
            return [...removed, item];
        }, []);
        };
        var unico = removeDuplicates(arrayValue, "name")
        setDividas(unico);
        })
        // setDividas(Response.data.result)
      })
    }, [arrayValue, dividas, setDividas])


    async function getClientePorId(_id: number) {
        await axios.get(`https://provadev.xlab.digital/api/v1/divida/?uuid=ce7d2f4d-1d53-43bf-b899-72cb2eb7d336`)
        .then( Response => {
            var dadosCliente = Response.data.result;
            for(var z=0; z< dadosCliente.length; z++){
                if(_id === dadosCliente[z].idUsuario ){
                    var data = {
                        motivo: dadosCliente[z].motivo,
                        id: dadosCliente[z]._id,
                        valor: dadosCliente[z].valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                    }    
                    arrayValor.push(data)          
                    setMotivo(arrayValor)
                }
            }
        })
    }

    async function DeleteCliente(_id: string) {

            await axios.delete(`https://provadev.xlab.digital/api/v1/divida/${_id}?uuid=ce7d2f4d-1d53-43bf-b899-72cb2eb7d336`)       
            window.location.reload();
        
    }

    return(
        <div className="home">
            <Menu></Menu>
            <div className="container">
                <div className="sideBar">
                    <div className="card">
                    {dividas.map((index: any) => (
                        <button key={index.id} onClick={() => getClientePorId(index.idUsuario)} >{index.name}</button>

                        ))}
                
                    </div>
                </div>
                <div className="dividas">
                {motivo.map((i: any) => (
                        <div className="cardDividas">
                            <h4>{i.motivo}</h4>
                            <h3>{i.valor}</h3>
                            <div className="button">
                                <button  className="remover" onClick={() => DeleteCliente(i._id) }>Excluir</button>
                                <Link to={"/editar/" + i.id}>
                                     <button  className="atualizar">Editar</button>
                                </Link>
                            </div>
                        </div>
                        ))}
                </div>
            </div>
        </div>
    )
}