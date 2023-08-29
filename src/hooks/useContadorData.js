
import React, { useState, useEffect } from 'react';
import { getListOfTarefas } from '../services/localstorageTarefa';

export const useContadorData = () => {
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

    return { totalTasks, encerradosCount, emAndamentoCount };
};