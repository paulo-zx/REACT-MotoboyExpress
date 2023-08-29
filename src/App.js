import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { EmployeeList , EmployeeForm } from "./components";
import { MotoboyList , MotoboyForm } from "./components";
import { TarefaList , TarefaForm } from "./components";
import { Home } from "./components";
import { Contador } from "./components";
import { TabsDashboard } from "./components";
import { Footer } from "./components/Footer";



export const App =() => {
  return (
    <div>
     <Navbar/>


    <div className="container"> 
    <Routes>

    <Route path="/" element={<Home/>}/>


      <Route path="/listar-cliente" element={<EmployeeList/>}/>
      <Route path="/cadastrar-cliente" element={<EmployeeForm/>}/>
      <Route path="/editar-cliente/:id" element={<EmployeeForm/>}/>

      <Route path="/listar-motoboy" element={<MotoboyList/>}/>
      <Route path="/cadastrar-motoboy" element={<MotoboyForm/>}/>
      <Route path="/editar-motoboy/:id" element={<MotoboyForm/>}/>

      <Route path="/listar-tarefa" element={<TarefaList/>}/>
      <Route path="/cadastrar-tarefa" element={<TarefaForm/>}/>
      <Route path="/editar-tarefa/:id" element={<TarefaForm/>}/>

      <Route path="/contador" element={<Contador/>}/>

      <Route path="/tabelas" element={<TabsDashboard/>}/>

    </Routes>
    </div>

    <Footer/>

    </div>
  );
}

export default App;
