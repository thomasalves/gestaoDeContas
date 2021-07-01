import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import { Home } from './Pages/home/home';
import {Cadastro} from './Pages/Cadastro/Cadastro';
import {Editar} from './Pages/Editar'



function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/cadastro" component={Cadastro} />
      <Route exact path="/editar/:id" component={Editar} />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
