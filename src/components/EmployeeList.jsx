import { useEffect, useState } from 'react'
import { EmployeeItem } from './EmployeeItem'
import { getListOfEmployees } from '../services/localstorage';
import { useNavigate } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setEmployees(getListOfEmployees());
    },[]);

    const navigate = useNavigate();

  return (
    <div>

        <div className="d-flex my-5 justify-content-between flex-column flex-md-row">
                <h1 className="my-3 text-center">Lista dos Clientes</h1>

                <form className="d-flex mb-2 flex-column flex-md-row">
                    <input
                        className="form-control mb-2 mb-md-0 me-md-2"
                        type="search"
                        placeholder="Buscar Cliente"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    /> 
                </form>
                

                <button className='btn btn-outline-secondary my-2 my-sm-0'
                    onClick={() => navigate("/cadastrar-cliente")}
                    >
                    Cadastrar Cliente
                </button>
        </div>
        


        {
            employees.length > 0 ? (
                <div className="card bg-secondary p-3">
                    <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Endereço</th>
                                <th>Telefone</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
        
                        <tbody>
                            {employees
                            .filter((employee) =>
                            employee.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((employee) => (
                                <EmployeeItem 
                                    employee={employee}
                                    key={employee.id}
                                    setEmployees={setEmployees}
                                />
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            ): (
                    <h3 className="text-center">Nenhum Cliente</h3>
            )
        }

        <div className='d-flex my-5 justify-content-between'>
        <button className='btn btn-outline-secondary my-2 my-sm-0'
            onClick={() => navigate("/")}
            >
            Voltar
        </button>
        </div>
        
        
    </div>
  )
}
