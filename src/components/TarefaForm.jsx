import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { addTarefa, getTarefaById, editTarefa } from "../services/localstorageTarefa";
import { getListOfEmployees } from "../services/localstorage"; // Importar a função para obter a lista de clientes
import { getListOfMotoboys } from "../services/localstorageMotoboy"; // Importar a função para obter a lista de motoboys

export const TarefaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const clientes = getListOfEmployees(); // Obter a lista de clientes
  const motoboys = getListOfMotoboys(); // Obter a lista de motoboys
  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    clientId: '',
    motoboyId: '',
    status: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      const tarefa = getTarefaById(id);
      setForm(tarefa);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    id ? editTarefa(id, inputValues) : addTarefa(inputValues);
    setShowAlert(true);
    resetForm();
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex my-5 justify-content-between">
        <button className='btn btn-outline-secondary' onClick={() => navigate("/listar-tarefa")}>Voltar</button>
        <h1>{id ? "Editar" : "Cadastro de"} Tarefa</h1>
        <div />
      </div>

      {/* Form */}
      <div className="card border-primary p-5 m-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label mt-2" htmlFor="clientId">Cliente</label>
            <select
              name="clientId"
              value={inputValues.clientId}
              onChange={handleInputChange}
              className="form-select"
              id="clientId"
            >
              <option value="">Selecione um cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="motoboyId">Motoboy</label>
            <select
              name="motoboyId"
              value={inputValues.motoboyId}
              onChange={handleInputChange}
              className="form-select"
              id="motoboyId"
            >
              <option value="">Selecione um motoboy</option>
              {motoboys.map(motoboy => (
                <option key={motoboy.id} value={motoboy.id}>{motoboy.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="status">Status</label>
            <select
              name="status"
              value={inputValues.status}
              onChange={handleInputChange}
              className="form-select"
              id="status"
            >
              <option value="">Selecione um status</option>
              <option value="Aguardando">Aguardando</option>
              <option value="Motoboy designado">Motoboy designado</option>
              <option value="Buscando volume">Buscando volume</option>
              <option value="Em rota de entrega">Em rota de entrega</option>
              <option value="Entregue">Entregue</option>
              <option value="Motoboy não atendido">Motoboy não atendido</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="description">Descrição</label>
            <textarea
              name="description"
              value={inputValues.description}
              onChange={handleInputChange}
              className="form-control"
              id="description"
              placeholder="Digite a descrição"
              rows="3"
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-outline-primary">Adicionar Tarefa</button>
          </div>
        </form>
      </div>

      {showAlert && (
        <div className="px-5">
          <div className="alert alert-success text-white" role="alert">
            Cadastro realizado com sucesso!
          </div>
        </div>
      )}
    </div>
  );
};
