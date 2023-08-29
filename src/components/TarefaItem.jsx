import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTarefa, getListOfTarefas } from '../services/localstorageTarefa';

export const TarefaItem = ({ tarefa, setTarefas, clientes, motoboys }) => {
    const { id, clientId, motoboyId, status, description } = tarefa;
    const navigate = useNavigate();

    const cliente = clientes.find(cliente => cliente.id === clientId);
    const motoboy = motoboys.find(motoboy => motoboy.id === motoboyId);

    const removeTarefa = () => {
        deleteTarefa(id);
        setTarefas(getListOfTarefas());
    };

    return (
        <tr>
            <th>{cliente ? cliente.name : 'Cliente não encontrado'}</th>
            <th>{motoboy ? motoboy.name : 'Motoboy não encontrado'}</th>
            <th>{status}</th>
            <th>{description}</th>
            <th>
                <div className='d-flex gap-3'>
                    <span role='button' className='badge bg-success' onClick={() => navigate(`/editar-tarefa/${id}`)}>
                        Editar
                    </span>
                    <span role='button' className='badge bg-danger' onClick={() => removeTarefa()}>
                        Deletar
                    </span>
                </div>
            </th>
        </tr>
    );
};
