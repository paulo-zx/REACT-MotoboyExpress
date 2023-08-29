import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getListOfTarefas } from '../services/localstorageTarefa';
import { getListOfMotoboys } from '../services/localstorageMotoboy';
import { getListOfEmployees } from '../services/localstorage'; // Importe a função para obter a lista de clientes
import { useNavigate } from 'react-router-dom';

export const TabsDashboard = () => {
    const [tarefas, setTarefas] = useState([]);
    const [motoboys, setMotoboys] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0); // Adicione o estado para controlar a aba ativa

    useEffect(() => {
        setTarefas(getListOfTarefas());
        setMotoboys(getListOfMotoboys());
        setClientes(getListOfEmployees());
    }, []);

    const filterTarefasByStatus = (status) => {
        return tarefas.filter((tarefa) => tarefa.status === status);
    };

    const motoboyIdToName = motoboys.reduce((map, motoboy) => {
        map[motoboy.id] = motoboy.name;
        return map;
    }, {});

    const clientIdToName = clientes.reduce((map, cliente) => {
        map[cliente.id] = cliente.name;
        return map;
    }, {});

    const navigate = useNavigate();

    return (
        <div>
            <h1 className="my-5 text-center">Tabelas</h1>
            <Tabs selectedIndex={activeTabIndex} onSelect={(index) => setActiveTabIndex(index)}>
                <TabList className="nav nav-pills nav-justified">
                    <Tab className={`nav-item nav-link ${activeTabIndex === 0 ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                        Aguardando
                    </Tab>
                    <Tab className={`nav-item nav-link ${activeTabIndex === 1 ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                        Em Andamento
                    </Tab>
                    <Tab className={`nav-item nav-link ${activeTabIndex === 2 ? 'active' : ''}`} style={{ cursor: 'pointer' }}>
                        Encerrados
                    </Tab>
                </TabList>

                <TabPanel>
                <h3 className="my-5 text-center">Tarefas Aguardando</h3>
                <div className="p-3" style={{ border: '1px solid #808080', margin: '10px 0' }}>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>Cliente</th>
                                <th>Motoboy</th>
                                <th>Status</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterTarefasByStatus('Aguardando').map((tarefa) => (
                                <tr key={tarefa.id}>
                                    <td>{clientIdToName[tarefa.clientId]}</td>
                                    <td>{motoboyIdToName[tarefa.motoboyId]}</td>
                                    <td>{tarefa.status}</td>
                                    <td>{tarefa.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </TabPanel>

                <TabPanel>
                <h3 className="my-5 text-center">Tarefas Em Andamento</h3>
                <div className="p-3" style={{ border: '1px solid #808080', margin: '10px 0' }}>
                    <table className="table" >
                        <thead className="table-dark">
                            <tr>
                                <th>Cliente</th>
                                <th>Motoboy</th>
                                <th>Status</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterTarefasByStatus('Motoboy designado').map((tarefa) => (
                                <tr key={tarefa.id}>
                                    <td>{clientIdToName[tarefa.clientId]}</td>
                                    <td>{motoboyIdToName[tarefa.motoboyId]}</td>
                                    <td>{tarefa.status}</td>
                                    <td>{tarefa.description}</td>
                                </tr>
                            ))}
                            {filterTarefasByStatus('Buscando volume').map((tarefa) => (
                                <tr key={tarefa.id}>
                                    <td>{clientIdToName[tarefa.clientId]}</td>
                                    <td>{motoboyIdToName[tarefa.motoboyId]}</td>
                                    <td>{tarefa.status}</td>
                                    <td>{tarefa.description}</td>
                                </tr>
                            ))}
                            {filterTarefasByStatus('Em rota de entrega').map((tarefa) => (
                                <tr key={tarefa.id}>
                                    <td>{clientIdToName[tarefa.clientId]}</td>
                                    <td>{motoboyIdToName[tarefa.motoboyId]}</td>
                                    <td>{tarefa.status}</td>
                                    <td>{tarefa.description}</td>
                                </tr>
                            ))}
                            {filterTarefasByStatus('Motoboy não atendido').map((tarefa) => (
                                <tr key={tarefa.id}>
                                    <td>{clientIdToName[tarefa.clientId]}</td>
                                    <td>{motoboyIdToName[tarefa.motoboyId]}</td>
                                    <td>{tarefa.status}</td>
                                    <td>{tarefa.description}</td>
                                </tr>
                            ))}
                            {/* Repita o mesmo padrão para outros status em andamento */}
                        </tbody>
                    </table>
                    </div>
                </TabPanel>

                <TabPanel>
                <h3 className="my-5 text-center">Tarefas Encerradas</h3>
                <div className="p-3" style={{ border: '1px solid #808080', margin: '10px 0' }}>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>Cliente</th>
                                <th>Motoboy</th>
                                <th>Status</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterTarefasByStatus('Entregue').map((tarefa) => (
                                <tr key={tarefa.id}>
                                    <td>{clientIdToName[tarefa.clientId]}</td>
                                    <td>{motoboyIdToName[tarefa.motoboyId]}</td>
                                    <td>{tarefa.status}</td>
                                    <td>{tarefa.description}</td>
                                </tr>
                            ))}
                            {filterTarefasByStatus('Cancelado').map((tarefa) => (
                                <tr key={tarefa.id}>
                                    <td>{clientIdToName[tarefa.clientId]}</td>
                                    <td>{motoboyIdToName[tarefa.motoboyId]}</td>
                                    <td>{tarefa.status}</td>
                                    <td>{tarefa.description}</td>
                                </tr>
                            ))}
                            {/* Repita o mesmo padrão para outros status encerrados */}
                        </tbody>
                    </table>
                    </div>
                </TabPanel>
            </Tabs>

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
