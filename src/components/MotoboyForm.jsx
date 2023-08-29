import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "../hooks/useForm";
import { addMotoboy, getMotoboyById, editMotoboy } from "../services/localstorageMotoboy";
import { useEffect, useState } from "react";

export const MotoboyForm = () => { 
  const navigate = useNavigate();
  const {id} = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const { inputValues, handleInputChange, resetForm, setForm} = useForm({
    name: '',
    email: '',
    address: '',
    phone: '',
  })


  useEffect(()=> {
    if(id) {
      const motoboy = getMotoboyById(id);
      setForm(motoboy);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    id ? editMotoboy(id, inputValues) : addMotoboy(inputValues);
    setShowAlert(true);
    resetForm();
    setTimeout(()=>{
      setShowAlert(false);
    },2000);
  }


  return (
    <div>
      {/* Header*/ }
      <div className="d-flex my-5 justify-content-between">
        <button className='btn btn-outline-secondary' onClick={()=>navigate("/listar-motoboy")}>Voltar</button>
        <h1> {id ? "Editar" : "Cadastro do"} Motoboy</h1>
        <div />
      </div>


      {/* Form*/ }
      <div className="card border-primary p-5 m-5">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="name">Nome</label>
            <input
              name="name"
              type="text" 
              className="form-control"
              id="name"
              value={inputValues.name}
              onChange={handleInputChange}
              placeholder="Digite seu nome"
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="email">Email</label>
            <input
              name="email"
              value={inputValues.email}
              onChange={handleInputChange}
              type="email"
              className="form-control"
              id="email"
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="address">Endereço</label>
            <input
              name="address"
              value={inputValues.address}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="address"
              placeholder="Digite seu endereço"
            />
          </div>

          <div className="form-group">
            <label className="form-label mt-2" htmlFor="phone">Telefone</label>
            <input
              name="phone"
              value={inputValues.phone}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              id="phone"
              placeholder="Digite seu telefone"
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-outline-primary">Adicionar Motoboy</button>
          </div>
          

        </form>
      </div>

      {
        showAlert && (
          <div className="px-5">
            <div className="alert alert-success text-white" role="alert">
              Cadastro realizado com sucesso!
            </div>
          </div>
        )
      }



    </div>
  )
}
