// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './Menu.css';


export function Menu () {
    return(
        <head className="menu">
            <div className="title">
                <h4>Gestão de dívidas</h4>
            </div>
            <div>
              <Link to="/cadastro" className="nova">Novo</Link>
            </div>
        </head>
    )
}