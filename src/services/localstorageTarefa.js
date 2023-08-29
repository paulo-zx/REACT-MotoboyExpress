import uuid from "react-uuid";

export const getListOfTarefas = () => {
    if(!localStorage["@tarefas"]){
        localStorage["@tarefas"] = JSON.stringify([]);
    }

    let tarefas = JSON.parse(localStorage["@tarefas"]);
    return tarefas;
}

export const getTarefaById = (id) => {
    const tarefas = getListOfTarefas();
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);
    return tarefa;
};

export const addTarefa = (tarefa) => {
    const tarefas = getListOfTarefas();
    tarefas.push({ id: uuid(), ...tarefa });
    localStorage["@tarefas"] = JSON.stringify(tarefas);
};

export const editTarefa = (id, newTarefa) => {
    let tarefas = getListOfTarefas();
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    tarefas.push(newTarefa );
    localStorage["@tarefas"]= JSON.stringify(tarefas);
};

export const deleteTarefa = (id) => {
    let tarefas = getListOfTarefas();
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    localStorage["@tarefas"]= JSON.stringify(tarefas);
};