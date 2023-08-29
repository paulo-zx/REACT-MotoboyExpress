import { useEffect, useState } from 'react'
import { MotoboyItem } from './MotoboyItem'
import { getListOfMotoboys } from '../services/localstorageMotoboy';
import { useNavigate } from "react-router-dom"

export const MotoboyList = () => {
    const [motoboys, setMotoboys] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setMotoboys(getListOfMotoboys());
    },[]);

    const navigate = useNavigate();

  return (
    <div>

        <div className="d-flex my-5 justify-content-between">
            <h1 className='my-S text-center'>Lista de Motoboys</h1>

            
            <form class="d-flex">
                    <input
                        class="form-control me-sm-2"
                        type="search"
                        placeholder="Buscar Motoboy"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    /> 
            </form>
            

            <button className='btn btn-outline-secondary my-2 my-sm-0'
                onClick={() => navigate("/cadastrar-motoboy")}
                >
                Cadastrar Motoboy
            </button>
        </div>
        

        {
            motoboys.length > 0 ? (
                <div className="card bg-secondary p-3">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Endereço</th>
                                <th>Telefone</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
        
                        <tbody>
                        {/*    {motoboys.map(motoboy => 
                                <MotoboyItem 
                                    motoboy={motoboy}
                                    key={motoboy.id}
                                    setMotoboys={setMotoboys}
                                />
                        )}  */}

                                {motoboys
                                .filter((motoboy) =>
                                    motoboy.name.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((motoboy) => (
                                    <MotoboyItem
                                        motoboy={motoboy}
                                        key={motoboy.id}
                                        setMotoboys={setMotoboys}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            ): (
                    <h3 className="text-center">Nenhum Motoboy</h3>
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
