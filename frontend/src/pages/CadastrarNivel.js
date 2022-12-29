import React, { useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CadatrarNivel() {

    toast.configure({
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    let historico = useHistory();

    const [nivel, setarNivel] = useState('')

    function manipularMudanca(event) {
        setarNivel(event.target.value)
    }

    function manipularCadastro(event) {
        event.preventDefault()
        Axios.post('http://localhost:3002/cadastrar/nivel', { nivel: nivel }).then(response => {
            toast.success("Cadastrado com sucesso");
            historico.push("/listar/niveis")
        }).catch(error => {
            toast.error("Erro ao cadastrar");
        }) 
    }
    
    return (
        <div className="container">
            <h2>Cadastrar nível</h2>
            <a href="/listar/niveis" className="btn btn-xs btn-default">Ver níveis</a>
            <div className="space"></div>
            <form onSubmit={manipularCadastro}>
            <div className="form-group">
                    <label>Título do nível:</label>
                    <input className="form-control" type="text" name="nivel" value={nivel} onChange={manipularMudanca} />
                </div>
                <input className="btn btn-success right" type="submit" value="Cadastrar nível" />
            </form>
        </div>
    )
}

export default CadatrarNivel