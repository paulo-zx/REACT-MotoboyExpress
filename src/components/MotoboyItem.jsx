import React from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteMotoboy, getListOfMotoboys } from '../services/localstorageMotoboy';

export const MotoboyItem = ({motoboy, setMotoboys}) => {
    const {id,name, email, address, phone} = motoboy; 
    const navigate = useNavigate();

    const removeMotoboy = () => {
        deleteMotoboy(id);
        setMotoboys(getListOfMotoboys())
    }

  return (
    <tr>
        <th>{name}</th>
        <th>{email}</th>
        <th>{address}</th>
        <th>{phone}</th>
        <th>
            <div className='d-flex gap-3'>
                <span role='button' className='badge bg-success' onClick={() => navigate(`/editar-motoboy/${id}`)}>
                    Editar
                </span>
                <span role='button' className='badge bg-danger' onClick={() => removeMotoboy()}>
                    Deletar
                </span>
            </div>
        </th>
    </tr>
  )
}
