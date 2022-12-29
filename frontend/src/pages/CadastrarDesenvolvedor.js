import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { formataData,formataDataBanco } from '../Funcoes'
import 'react-toastify/dist/ReactToastify.css';

function CadatrarDesenvolvedor() {

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

    const [desenvolvedor, setarDesenvolvedor] = useState({
        nivel: '',
        nome: '',
        sexo: '',
        datanascimento: '',
        hobby: ''
    })
    const [niveis, setarNiveis] = useState([])

    function manipularMudanca(event) {
        if (event.target.name == "sexo") {
            //verificar se digitou o sexo certo
            if (event.target.value=='m' || event.target.value=='f') {
                setarDesenvolvedor({
                    ...desenvolvedor,
                    [event.target.name]: event.target.value
                })
            } else {
                toast.error("Sexo inválido")
            }

        } else if (event.target.name == "datanascimento") {
            //formata a data conforme digita
            event.target.value=formataData(event.target.value)
        }
        setarDesenvolvedor({
            ...desenvolvedor,
            [event.target.name]: event.target.value
        })
    }

    function manipularCadastro(event) {
        event.preventDefault()
        if (desenvolvedor.nivel=='') {
            toast.error("Selecione o nível")
        } else if (desenvolvedor.nome=='') {
            toast.error("Digite um nome")
        } else if (desenvolvedor.sexo=='') {
            toast.error("Selecione o sexo")
        } else if (desenvolvedor.datanascimento=='') {
            toast.error("Digite a data de nascimento")
        } else if (desenvolvedor.hobby=='') {
            toast.error("Digite a o hobby")
        } else {
            
            //formata data para yyyy-mm-dd antes de enviar
            let dataNascimento=formataDataBanco(desenvolvedor.datanascimento)

            Axios.post('http://localhost:3002/cadastrar/desenvolvedor', { 
                nivel:desenvolvedor.nivel, 
                nome: desenvolvedor.nome, 
                sexo: desenvolvedor.sexo, 
                datanascimento: dataNascimento, 
                hobby: desenvolvedor.hobby 
            }).then(response => {
                toast.success("Cadastrado com sucesso")
                historico.push("/")
            }).catch(error => {
                toast.error("Erro ao cadastrar")
            })
        }
    }

    useEffect(() => {
        Axios.get('http://localhost:3002/listar/niveis/todos').then(response => {
            setarNiveis([{value:'Selecione um nível', label:'Selecione um nível'}]);
            response.data.forEach(nivel => {
                setarNiveis(niveis => [...niveis, { value: nivel.id, label: nivel.nivel }])
            })
        }).catch(error => {
            toast.error("Erro ao listar todos os níveis!")
        })
    }, [])

    return (
        <div className="container">
            <h2>Cadastrar desenvolvedor</h2>
            <a href="/listar/desenvolvedores" className="btn btn-xs btn-default">Ver desenvolvedores</a>
            <div className="space"></div>
            <form onSubmit={manipularCadastro}>
                <div className="form-group">
                    <label>Nível:</label>
                    <select className="form-control" name="nivel" value={desenvolvedor.nivel} onChange={manipularMudanca}>
                        {
                            niveis.map(nivel => {
                                return <option key={nivel.value} value={nivel.value}>{nivel.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Nome do desenvolvedor:</label>
                    <input className="form-control" type="text" name="nome" value={desenvolvedor.nome} onChange={manipularMudanca} />
                </div>
                <div className="form-group">
                    <label>Sexo:</label>
                    <select className="form-control" type="text" name="sexo" value={desenvolvedor.sexo} onChange={manipularMudanca}>
                        <option value="">Selecione o sexo</option>
                        <option value="m">Masculino</option>
                        <option value="f">Feminino</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Data de nascimento:</label>
                    <input className="form-control" type="text" name="datanascimento" value={desenvolvedor.datanascimento} onChange={manipularMudanca} />
                </div>
                <div className="form-group">
                    <label>Hobby:</label>
                    <input className="form-control" type="text" name="hobby" value={desenvolvedor.hobby} onChange={manipularMudanca} />
                </div>
                <input className="btn btn-success right" type="submit" value="Cadastrar desenvolvedor" />
            </form>
        </div>
    )
}

export default CadatrarDesenvolvedor