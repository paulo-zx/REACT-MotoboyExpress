import React from 'react';
import { useNavigate } from 'react-router-dom';


import { useContadorData } from '../hooks/useContadorData';


import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);


export const Home = () => {
    const navigate = useNavigate();


    const { totalTasks, encerradosCount, emAndamentoCount, statusCounts } = useContadorData();


    const chartData = {
      labels: ['Total', 'Encerrados', 'Em Andamento'],
      datasets: [
          {
              label: 'Quantidade',
              data: [totalTasks, encerradosCount, emAndamentoCount],
              backgroundColor: ['blue', 'red', 'green'],
              borderColor: ['blue', 'red', 'green'],
          },
      ],
  } ;


            

      const options ={
            responsive: true,

      }



  return (
    <div>

            <div className="d-flex flex-column align-items-center my-5">
            <h1>Home</h1>
            <div className="d-flex flex-wrap justify-content-center">
            <button className='btn btn-outline-secondary my-2 my-sm-0 mx-2' onClick={() => navigate("/listar-cliente")}>Clientes</button>
            <button className='btn btn-outline-secondary my-2 my-sm-0 mx-2' onClick={() => navigate("/listar-motoboy")}>Motoboys</button>
            <button className='btn btn-outline-secondary my-2 my-sm-0 mx-2' onClick={() => navigate("/listar-tarefa")}>Tarefas</button>
            <button className='btn btn-outline-secondary my-2 my-sm-0 mx-2' onClick={() => navigate("/contador")}>Contador</button>
            <button className='btn btn-outline-secondary my-2 my-sm-0 mx-2' onClick={() => navigate("/tabelas")}>Tabelas</button>
            </div>
            </div>

    

      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="mb-4">Gráfico de Tarefas</h2>
      <div style={{ width: "300px", height: "300px" }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
      

    </div>
  )
}



