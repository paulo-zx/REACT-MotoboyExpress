import React, { useState, useEffect } from 'react';
import { getListOfTarefas } from '../services/localstorageTarefa';
import { useNavigate } from 'react-router-dom';

export const Contador = () => {
    const [tarefas, setTarefas] = useState([]);
    const [statusCounts, setStatusCounts] = useState({});
    const [totalTasks, setTotalTasks] = useState(0);
    const [encerradosCount, setEncerradosCount] = useState(0);
    const [emAndamentoCount, setEmAndamentoCount] = useState(0);

    useEffect(() => {
        setTarefas(getListOfTarefas());
    }, []);

    useEffect(() => {
        // Count the tasks by status
        const counts = tarefas.reduce((acc, tarefa) => {
            const status = tarefa.status;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});
        setStatusCounts(counts);

        // Calculate the total tasks, encerrados count, and emAndamento count
        const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
        setTotalTasks(total);

        const encerrados =
            (counts['Entregue'] || 0) +
            (counts['Cancelado'] || 0);
        setEncerradosCount(encerrados);

        const emAndamento =
            (counts['Motoboy designado'] || 0) +
            (counts['Buscando volume'] || 0) +
            (counts['Em rota de entrega'] || 0) +
            (counts['Motoboy não atendido'] || 0);
        setEmAndamentoCount(emAndamento);
    }, [tarefas]);

    const navigate = useNavigate();

    return (
        <div>
            <h1 className="my-5 text-center">Contador</h1>
            <div className="card p-3">
                <h3>Contador:</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(statusCounts).map((status) => (
                            <tr key={status}>
                                <td>{status}</td>
                                <td>{statusCounts[status]}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>Total</td>
                            <td>{totalTasks}</td>
                        </tr>
                        <tr>
                            <td>Encerrados</td>
                            <td>{encerradosCount}</td>
                        </tr>
                        <tr>
                            <td>Em Andamento</td>
                            <td>{emAndamentoCount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
                
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
