import React, { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { converterDataNascimento } from '../Funcoes';

function ListarDesenvolvedores() {

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

    const [desenvolvedoresLista, setarDesenvolvedorLista] = useState([]);
    const [busca, setarBusca] = useState('');
    const [total_desenvolvedores, setarTotalDesenvolvedores] = useState(0);
    const [paginacao, setarPaginacao] = useState(1);
    const [excluir_id, setarExcluirID] = useState('');
    const [esconderMorstrar, setarEsconderMostrar] = useState('hide');

    useEffect(() => {
        let acao = historico.location.pathname.split("/")[1];
        let tabela = historico.location.pathname.split("/")[2];
        let busca_ = historico.location.pathname.split("/")[3];
        //setarPaginacao(1)
        if (acao==='buscar' && tabela==='desenvolvedores' && typeof busca_!=='undefined') {
            setarBusca(busca_)
            if (typeof historico.location.pathname.split("/")[4]==='undefined' || 
                historico.location.pathname.split("/")[4]==='' ||
                historico.location.pathname.split("/")[4]===0
            ) {
                historico.push(`/buscar/desenvolvedores/${busca_}/1`)
            } else {
                //setarPaginacao(historico.location.pathname.split("/")[4])
                fetch(`http://localhost:3002/buscar/desenvolvedores/${busca_}/${paginacao}`)
                    .then(res => res.json())
                    .then(array => {
                        let data=array.desenvolvedores;
                        data=converterDataNascimento(data)
                        setarDesenvolvedorLista(data);
                        setarTotalDesenvolvedores(array.total);
                    }).catch(error => {
                        toast.error('Erro ao buscar desenvolvedores')
                    })
            }
        } else {
            if (typeof historico.location.pathname.split("/")[3]==='undefined' || 
                historico.location.pathname.split("/")[3]==='' ||
                historico.location.pathname.split("/")[3]===0
            ) {
                historico.push(`/listar/desenvolvedores/1`)
            } else {
                //setarPaginacao(historico.location.pathname.split("/")[3])
                fetch(`http://localhost:3002/listar/desenvolvedores/${paginacao}`)
                    .then(response => response.json())
                    .then(array => {
                        let data=array.desenvolvedores;
                        data=converterDataNascimento(data)
                        setarDesenvolvedorLista(data);
                        setarTotalDesenvolvedores(array.total);
                    }).catch(error => {
                        toast.error("Erro ao listar desenvolvedores")
                    });
            }
        }
    },[historico.location.pathname]);

    function manipularExclusao() {
        setarEsconderMostrar('hide');
        fetch(`http://localhost:3002/excluir/desenvolvedor/${excluir_id}`, {
            method: 'DELETE'
        }).then(res => {
            toast.success("Desenvolvedor excluído com sucesso!");
            fetch(`http://localhost:3002/listar/desenvolvedores/${paginacao}`)
            .then(response => response.json())
            .then(array => {
                let data=array.desenvolvedores;
                data=converterDataNascimento(data);
                setarDesenvolvedorLista(data);
                setarTotalDesenvolvedores(array.total);
            }).catch(error => {
                toast.error('Erro ao excluir desenvolvedor')
            });
        }).catch(error => {
            toast.error("Não foi possível excluir o desenvolvedor")
        })
    }

    function manipularEdicao(paginacao) {
        setarPaginacao(paginacao);
        historico.push(`/editar/desenvolvedor/${paginacao}`);
    }

    function manipularMudanca(event) {
        event.preventDefault()
        setarBusca(event.target.value)
    }

    function manipularBusca(event) {
        event.preventDefault()
        if (busca!=='') {
            if (paginacao!=='') {
                historico.push(`/buscar/desenvolvedores/${busca}/${paginacao}`)
            } else {
                historico.push(`/buscar/desenvolvedores/${busca}`)
            }
        } else {
            toast.error('Digite algo para buscar')
        }
    }
    
    function mudarPaginacao(paginacao){
        setarPaginacao(paginacao)
        if (busca!=='') {
            historico.push(`/buscar/desenvolvedores/${busca}/${paginacao}`)
        } else {
            historico.push('/listar/desenvolvedores/'+paginacao);
        }
        
    
    }

    let links=Math.ceil(total_desenvolvedores/6)

    let paginas=[];
    for (let i=1; i<=links; i++) {
        paginas.push(i);
    }
    
    function fecharModal() {
        setarEsconderMostrar('hide');
    }
    function showModal(id) {
        setarExcluirID(id);
        setarEsconderMostrar('show');
    }

    let resultados=desenvolvedoresLista.map((developer, key) => {
                    
        //completa a string idade
        let str_idade=''
        if (typeof developer.idade!='undefined') {
            if (developer.idade>0) {
                str_idade=' ('+developer.idade+' anos)'
            }
        }

        let str_sexo=''
        if (developer.sexo==='m') {
            str_sexo='Masculino'
        } else if (developer.sexo==='f') {
            str_sexo='Feminino'
        } else {
            str_sexo='Desconhecido'
        }
        
        let nivel=''
        if (developer['nivel_id']!==null) {
            nivel=developer['nivel_id']['nivel']
        }


        return (
            <div key={key} className="col-md-4">
                <div className="box">
                    <i className="glyphicon glyphicon-remove" onClick={() => showModal(developer.id)}></i>
                    <i className="glyphicon glyphicon-pencil" onClick={() => manipularEdicao(developer.id)}></i>
                    <div><strong>ID:</strong> {developer.id}</div>
                    <div><strong>Nível:</strong> {nivel}</div>
                    <div><strong>Nome:</strong> {developer.nome}</div>
                    <div><strong>Sexo:</strong> {str_sexo}</div>
                    <div><strong>Data de nascimento:</strong> {developer.datanascimento}{str_idade}</div>
                    <div><strong>Hobby:</strong> {developer.hobby}</div>
                </div>
                <div className="space"></div>
            </div>
        )
    }
    )

    
    return (
        <div className="container">
            <div className={"myModalBG "+esconderMorstrar}>
                <div className="myModal">
                    <div className="myModalTitle">Excluir</div>
                    <div className="myModalBody">
                        Tem certeza que deseja excluir este desenvolvedor?
                    </div>
                    <div className="myModalFooter right">
                        <button className="btn btn-default" onClick={fecharModal}>Fechar</button>
                        <button className="btn btn-success" onClick={manipularExclusao}>Confirmar</button>
                    </div>
                </div>
            </div>
            <h2>Desenvolvedores</h2>
            <a href="/cadastrar/desenvolvedor" className="btn btn-xs btn-default">Cadastrar desenvolvedor</a>
            <div className="space"></div>
            <form>
                <div className="row">
                    <div className="col-md-9">
                        <div className="form-group">
                            <label>Pesquisar:</label>
                            <input className="form-control" type="text" name="busca" value={busca} onChange={manipularMudanca} placeholder="Digite um nome, descrição ou nível" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="spaceLabel"></div>
                        <button onClick={manipularBusca} type="submit" className="btn btn-block btn-default">Pesquisar</button>
                    </div>
                </div>
            </form>

            <div className="row">
                { resultados.length>0 ? resultados : <div className="col-md-12"><div className="alert alert-warning">Nenhum resultado encontrado</div></div> }
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="pagination right">
                        <ul className="pagination">
                            {
                                paginas.map((val, key) => {
                                    return (
                                        <li key={key} className={paginacao===val ? 'active' : ''}><a onClick={()=>mudarPaginacao(val)} value={val}>{val}</a></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default ListarDesenvolvedores