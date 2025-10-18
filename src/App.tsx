import {BrowserRouter,Route,Routes} from "react-router"
import {Lista} from "./components/Lista"
import {NuevoCliente} from "./components/NuevoCliente"
import { EditarCliente } from "./components/EditarCliente"
import {ListaCategoria} from "./components/Categorias/ListaCategoria"
import { NuevaCategoria } from "./components/Categorias/NuevaCategoria"
import { EditarCategoria } from "./components/Categorias/EditarCategoria"
import { ListaPrioridades } from "./components/Prioridades/ListaPrioridades"
import { NuevaPrioridad } from "./components/Prioridades/NuevaPrioridad"
import { EditarPrioridades } from "./components/Prioridades/EditarPrioridades"
import { ListaDepartamentos } from "./components/Departamentos/ListaDepartamentos"
import { NuevoDepartamento } from "./components/Departamentos/NuevoDepartamento"
import { EditarDepartamentos } from "./components/Departamentos/EditarDepartamentos"
import { ListaEstados } from "./components/Estados/ListaEstados"
import { NuevoEstado } from "./components/Estados/NuevoEstado"
import { EditarEstados } from "./components/Estados/EditarEstados"
import { Login} from "./components/Login/Ingreso"
import { RecuperarPassword} from "./components/Login/RecuperarPassword"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lista/>}/>
        <Route path="/nuevocliente" element={<NuevoCliente/>}/>
        <Route path="/editarcliente/:id" element={<EditarCliente/>}/>
        <Route path="prioridades/listaprioridades" element={<ListaPrioridades/>}/>
        <Route path="estados/listaestados" element={<ListaEstados/>}/>
        <Route path="estados/nuevoestado" element={<NuevoEstado/>}/>
        <Route path="estados/editarestados/:id" element={<EditarEstados/>}/>
        <Route path="login/ingreso" element={<Login/>}/>
        <Route path="login/recuperarpassword" element={<RecuperarPassword/>}/>
      </Routes>
      <Routes>
        <Route path="categorias/listacategoria" element={<ListaCategoria/>}/>
        <Route path="categorias/nuevacategoria" element={<NuevaCategoria/>}/>
        <Route path="categorias/editarcategoria/:id" element={<EditarCategoria/>}/>
      </Routes>
      <Routes>
        
        <Route path="prioridades/nuevaprioridad" element={<NuevaPrioridad/>}/>
        <Route path="prioridades/editarprioridades/:id" element={<EditarPrioridades/>}/>
      </Routes>
      <Routes>
        <Route path="Departamentos/listadepartamentos" element={<ListaDepartamentos/>}/>
        <Route path="Departamentos/nuevodepartamento" element={<NuevoDepartamento/>}/>
        <Route path="Departamentos/editardepartamentos/:id" element={<EditarDepartamentos/>}/>
      </Routes>
    </BrowserRouter>  
  )}

export default App
