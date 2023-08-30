import React, { useEffect, useState } from 'react';
import { TarefaItem } from './TarefaItem';
import { getListOfTarefas } from '../services/localstorageTarefa';
import { useNavigate } from 'react-router-dom';

import { getListOfEmployees } from '../services/localstorage';
import { getListOfMotoboys } from '../services/localstorageMotoboy';

export const TarefaList = () => {
    const [tarefas, setTarefas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setTarefas(getListOfTarefas());
    }, []);

    const navigate = useNavigate();

    const clientes = getListOfEmployees();
    const motoboys = getListOfMotoboys();

    return (
        <div>
            <div className="d-flex my-5 justify-content-between flex-column flex-md-row">
                <h1 className="my-3 text-center">Lista de Tarefas</h1>

                <form className="d-flex mb-2 flex-column flex-md-row">
                    <input
                        className="form-control mb-2 mb-md-0 me-md-2"
                        type="search"
                        placeholder="Buscar por Motoboy"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <button
                    className="btn btn-outline-secondary my-2 my-sm-0"
                    onClick={() => navigate('/cadastrar-tarefa')}
                >
                    Cadastrar Tarefa
                </button>
            </div>

            {tarefas.length > 0 ? (
                <div className="card bg-secondary p-3">
                    <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Cliente</th>
                                <th>Motoboy</th>
                                <th>Status</th>
                                <th>Descrição</th>
                                <th>Opções</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tarefas
                                .filter((tarefa) =>
                                    tarefa.motoboyId &&
                                    motoboys.find((motoboy) =>
                                        motoboy.id === tarefa.motoboyId
                                    ).name.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((tarefa) => (
                                    <TarefaItem
                                        tarefa={tarefa}
                                        key={tarefa.id}
                                        setTarefas={setTarefas}
                                        clientes={clientes}
                                        motoboys={motoboys}
                                    />
                                ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            ) : (
                <h3 className="text-center">Nenhuma Tarefa</h3>
            )}

            <div className="d-flex my-5 justify-content-between">
                <button
                    className="btn btn-outline-secondary my-2 my-sm-0"
                    onClick={() => navigate('/')}
                >
                    Voltar
                </button>
            </div>
        </div>
    );
};
