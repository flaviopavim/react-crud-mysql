import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { formataData, formataDataBanco } from '../Funcoes'
import 'react-toastify/dist/ReactToastify.css';

function EditarDesenvolvedor() {

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
        nivel_id: 0,
        nome: '',
        sexo: '',
        datanascimento: '',
        hobby: ''
    })
    const [niveis, setarNiveis] = useState([])

    useEffect(() => {

        const id = window.location.href.split('/')[5]
        
        //busca dados do desenvolvedor selecionado
        Axios.get('http://localhost:3002/desenvolvedor/' + id)
            .then(response => {
              
                //formata data de nascimento para dd/mm/yyyy
                let data = response.data.datanascimento
                data = data.substring(8, 10) + '/' + data.substring(5, 7) + '/' + data.substring(0, 4)
                response.data.datanascimento = data

                //setar dados do desenvolvedor
                setarDesenvolvedor(response.data)

                //busca todos os niveis para o select
                Axios.get('http://localhost:3002/listar/niveis').then(response2 => {
                    setarNiveis([]);
                    response2.data.forEach(nivel => {
                        setarNiveis(niveis => [...niveis, { value: nivel.id, label: nivel.nivel }])
                        //seleciona o nivel
                        if (typeof response.data.nivel_id!==null) {
                            if (nivel.id === response.data.nivel_id.id) {
                                response.data.nivel_id=nivel.id
                                //selecionar o nivel do desenvolvedor
                                setarDesenvolvedor(response.data)
                            }
                        }
                    })
                }).catch(error => {
                    toast.error("Erro ao listar os níveis")
                })
            }).catch(error => {
                toast.error("Erro ao listar desenvolvedor")
            })

    }, [historico.location.pathname])
    
    function manipularMudanca(event) {
        if (event.target.name == "sexo") {
            //verificar se digitou o sexo certo
            if (event.target.value=='m' || event.target.value=='f') {
                setarDesenvolvedor({
                    ...desenvolvedor,
                    [event.target.name]: event.target.value
                })
            } else {
                toast.error("Sexo inválido!")
            }
        } else if (event.target.name == "datanascimento") {
            //formata a data conforme digita
            event.target.value=formataData(event.target.value)
        }
        if (event.target.name == "nivel") {
            //seta o nivel_id
            setarDesenvolvedor({
                ...desenvolvedor,
                nivel_id: event.target.value
            })
        } else {
            setarDesenvolvedor({
                ...desenvolvedor,
                [event.target.name]: event.target.value
            })
        }
        
    }

    //formata e atualiza
    function manipularCadastro(event) {
        event.preventDefault()
        if (desenvolvedor.nivel=='') {
            toast.error("O nivel não pode ser vazio")
        } else if (desenvolvedor.nome=='') {
            toast.error("O nome não pode ser vazio")
        } else if (desenvolvedor.hobby=='') {
            toast.error("A descrição não pode ser vazia")
        } else {

            //formata data para yyyy-mm-dd antes de enviar
            let dataNascimento=formataDataBanco(desenvolvedor.datanascimento)

            const id = window.location.href.split('/')[5]
            Axios.patch(`http://localhost:3002/editar/desenvolvedor/${id}`, { 
                    nivel_id: desenvolvedor.nivel_id, 
                    nome: desenvolvedor.nome, 
                    sexo: desenvolvedor.sexo, 
                    datanascimento: dataNascimento, 
                    hobby: desenvolvedor.hobby
            }).then(response => {
                toast.success("Desenvolvedor editado com sucesso!")
                historico.push("/")
            }).catch(error => {
                toast.error("Erro ao editar desenvolvedor!")
            })
        }
    }

    return (
        <div className="container">
            <h2>Editar desenvolvedor</h2>
            <a href="/listar/desenvolvedores" className="btn btn-xs btn-default">Ver desenvolvedores</a>
            <div className="space"></div>
            <form onSubmit={manipularCadastro}>
                <div className="form-group">
                    <label>Nível:</label>
                    <select className="form-control" name="nivel" value={desenvolvedor.nivel_id} onChange={manipularMudanca}>
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
                    <input className="form-control" type="text" name="hobby" onChange={manipularMudanca} value={desenvolvedor.hobby}/>
                </div>
                <input className="btn btn-success right" type="submit" value="Atualizar desenvolvedor" />
            </form>
        </div>
    )
}

export default EditarDesenvolvedor