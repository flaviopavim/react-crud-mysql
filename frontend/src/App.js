import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Top from './includes/Top'
import ListarNiveis from './pages/ListarNiveis'
import CadastrarNivel from './pages/CadastrarNivel'
import EditarNivel from './pages/EditarNivel'
import ListarDesenvolvedores from './pages/ListarDesenvolvedores'
import CadastrarDesenvolvedor from './pages/CadastrarDesenvolvedor'
import EditarDesenvolvedor from './pages/EditarDesenvolvedor'

const App = () => {

  return (
    <div>
      <Top />
      <Router>
        <Route path="/" exact render={(props) => <ListarDesenvolvedores />} />
        <Route path="/listar/niveis" exact render={(props) => <ListarNiveis />} />
        <Route path="/listar/niveis/:paginacao" exact render={(props) => <ListarNiveis />} />
        <Route path="/buscar/niveis/:busca" exact render={(props) => <ListarNiveis />} />
        <Route path="/buscar/niveis/:busca/:paginacao" exact render={(props) => <ListarNiveis />} />
        <Route path="/cadastrar/nivel" render={(props) => <CadastrarNivel />} />
        <Route path="/editar/nivel/:id" render={(props) => <EditarNivel />} />
        <Route path="/listar/desenvolvedores" exact render={(props) => <ListarDesenvolvedores />} />
        <Route path="/listar/desenvolvedores/:paginacao" exact render={(props) => <ListarDesenvolvedores />} />
        <Route path="/buscar/desenvolvedores/:busca" exact render={(props) => <ListarDesenvolvedores />} />
        <Route path="/buscar/desenvolvedores/:busca/:paginacao" exact render={(props) => <ListarDesenvolvedores />} />
        <Route path="/cadastrar/desenvolvedor" render={(props) => <CadastrarDesenvolvedor />} />
        <Route path="/editar/desenvolvedor/:id" render={(props) => <EditarDesenvolvedor />} />
      </Router>
    </div>
  )
}

export default App;