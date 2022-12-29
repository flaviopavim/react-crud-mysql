import React, { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListarNiveis() {

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

    const [niveisList, setLevelList] = useState([]);
    const [busca, setarBusca] = useState('');
    const [total_niveis, setarTotalNiveis] = useState(0);
    const [paginacao, setarPaginacao] = useState(1);
    const [excluir_id, setarExcluirID] = useState('');
    const [esconderMostrar, setarEsconderMostrar] = useState('hide');

    useEffect(() => {
        let action = historico.location.pathname.split("/")[1];
        let tabela = historico.location.pathname.split("/")[2];
        let busca_ = historico.location.pathname.split("/")[3];
        setarPaginacao(1)
        if (action==='buscar' && tabela==='niveis' && typeof busca_!=='undefined') {
            setarBusca(busca_)
            if (typeof historico.location.pathname.split("/")[4]==='undefined' || 
                historico.location.pathname.split("/")[4]==='' ||
                historico.location.pathname.split("/")[4]===0
            ) {
                historico.push(`/buscar/niveis/${busca_}/1`)
            } else {
                setarPaginacao(historico.location.pathname.split("/")[4])
                fetch(`http://localhost:3002/buscar/niveis/${busca_}/${paginacao}`)
                    .then(res => res.json())
                    .then(array => {
                        setLevelList(array.niveis)
                        setarTotalNiveis(array.total)
                    }).catch(err => {
                        toast.error("Erro ao buscar níveis")
                    })
            }
        } else {
            if (typeof historico.location.pathname.split("/")[3]==='undefined' || 
                historico.location.pathname.split("/")[3]==='' ||
                historico.location.pathname.split("/")[3]===0
            ) {
                historico.push(`/listar/niveis/1`)
            } else {
                setarPaginacao(historico.location.pathname.split("/")[3])
                fetch(`http://localhost:3002/listar/niveis/${paginacao}`)
                    .then(response => response.json())
                    .then(array => {
                        setLevelList(array.niveis)
                        setarTotalNiveis(array.total)
                    }).catch(err => {
                        toast.error("Erro ao listar níveis")
                    })
            }
        }
    },[historico.location.pathname])
    
    function manipularExclusao() {
        setarEsconderMostrar('hide');
        fetch(`http://localhost:3002/excluir/nivel/${excluir_id}`, {
            method: 'DELETE'
        }).then(res => {
            console.log(res)
            if (res.status == 501) {
                res.json().then(data => {
                    toast.error(data.error);
                });
            } else {
                fetch(`http://localhost:3002/listar/niveis/${paginacao}`)
                .then(response => response.json())
                .then(array => {
                    setLevelList(array.niveis)
                    setarTotalNiveis(array.total)
                    toast.success('Nível excluído com sucesso')
                }).catch(error => {
                    toast.error('Não foi possível excluir o nível')
                });
            }
        }).catch(error => {
            toast.error('Não foi possível excluir o nível')
        })
    }

    function manipularMudanca(event) {
        event.preventDefault()
        setarBusca(event.target.value)
    }

    function manipularBusca(event) {
        event.preventDefault()
        if (busca!='') {
            if (paginacao!='') {
                historico.push(`/buscar/niveis/${busca}/${paginacao}`)
            } else {
                historico.push(`/buscar/niveis/${busca}`)
            }
        } else {
            toast.error('Digite algo para buscar')
        }
    }

    function mudarPaginacao(paginacao){
        setarPaginacao(paginacao)
        historico.push(`/listar/niveis/${paginacao}`);
    }

    let links=Math.ceil(total_niveis/6);

    let paginas=[];
    for (let i=1; i<=links; i++) {
        paginas.push(i);
    }

    function fecharModal() {
        setarEsconderMostrar('hide');
    }
    function mostrarModal(id) {
        setarExcluirID(id);
        setarEsconderMostrar('show');
    }

    let resultados=niveisList.map((val, key) => {
        return (
            <tr key={key}>
                <td>{val.id}</td>
                <td>{val.nivel}</td>
                <td>{val.total_desenvolvedores}</td>
                <td>
                    <div className="right">
                        <a className="btn btn-xs btn-warning margin-right" onClick={() => historico.push('/editar/nivel/'+val.id)}>Editar</a>
                        <a className="btn btn-xs btn-danger" onClick={() => mostrarModal(val.id)}>Excluir</a>
                    </div>
                </td>
            </tr>
        )}
    )

    return (
        <div className="container">
            <div className={"myModalBG "+esconderMostrar}>
                <div className="myModal">
                    <div className="myModalTitle">Excluir</div>
                    <div className="myModalBody">
                        Tem certeza que deseja excluir este ítem?
                    </div>
                    <div className="myModalFooter right">
                        <button className="btn btn-default" onClick={fecharModal}>Fechar</button>
                        <button className="btn btn-success" onClick={manipularExclusao}>Confirmar</button>
                    </div>
                </div>
            </div>
            <h2>Níveis</h2>
            <a href="/cadastrar/nivel" className="btn btn-xs btn-default">Cadastrar nível</a>
            <div className="space"></div>
            <form>
                <div className="row">
                    <div className="col-md-9">
                        <div className="form-group">
                            <label>Pesquisar:</label>
                            <input className="form-control" type="text" name="busca" value={busca} onChange={manipularMudanca} placeholder="Digite o nível ou a descrição do nivel" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="spaceLabel"></div>
                        <button onClick={manipularBusca} type="submit" className="btn btn-block btn-default">Pesquisar</button>
                    </div>
                </div>
            </form>
            {
                resultados.length>0 ?
                    <table className="table table-stripped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nível</th>
                                <th>Desenvolvedores com esse nível</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados}
                        </tbody>
                    </table>
                    :
                    <div className="alert alert-warning">Nenhum resultado encontrado</div>
            }
            
            <div className="row">
                <div className="col-md-12">
                    <div className="pagination right">
                        <ul className="pagination">
                            {
                                paginas.map((val, key) => {
                                    return (
                                        <li key={key} className={paginacao==val ? 'active' : ''}><a onClick={()=>mudarPaginacao(val)} value={val}>{val}</a></li>
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

export default ListarNiveis