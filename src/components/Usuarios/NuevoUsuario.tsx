import { ChangeEvent, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { useNavigate } from "react-router"
import  Swal  from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, Label,Input} from "reactstrap"    
import type { IUsuario } from "../../Interfaces/IUsuario"


const initialIUsuario = {  
  nombreUsuario: "",
  apellidoUsuario: "",  
  correo : "",
  direccion: "",
  codigoEstado: 0,
  codigoDepto: 0,
  password:"",
  fechaCreacion: new Date(),
  fechaModificacion: new Date()
}


export function NuevoUsuario(){
     const navigate=useNavigate();
     const [usuarios,setUsuarios]=useState<IUsuario>(initialIUsuario);
    const inputChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setUsuarios({
            ...usuarios,
            [inputName]:inputValue})
    }

    const guardar = async () =>{
           const response = await fetch(`${appsettings.apiUrl}Usuarios/Crear`,{
                method: 'POST',
                headers:{
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarios)
           })
           if(response.ok){
                navigate("/Usuarios/listausuarios")
           }else{
                Swal.fire({
                     title: "Error!",
                     text: "No se pudo guardar el usuario",
                     icon: "warning"
                   });
         }
     }

     const volver = () =>{
          navigate("/usuarios/listausuarios")
     }

    return(
         <Container className="mt-5">
               <Row>
                    <Col sm={{size:8, offset:2}}>
                         <h4>Nuevo Usuario</h4>
                         <hr/>
                         <Form>
            <FormGroup>
              <Label for="nombreUsuario">Nombre Usuario</Label>
              <Input type="text" name="nombreUsuario" onChange={inputChangeValue} value={usuarios.nombreUsuario} />
            </FormGroup>

            <FormGroup>
              <Label for="apellidoUsuario">Apellidos Usuario</Label>
              <Input type="text" name="apellidoUsuario" onChange={inputChangeValue} value={usuarios.apellidoUsuario} />
            </FormGroup>

            <FormGroup>
              <Label for="correo">Correo</Label>
              <Input
                id="correo"
                type="text"
                name="correo"
                value={usuarios.correo}
                onChange={inputChangeValue}
              />
            </FormGroup>
            
            <FormGroup>
              <Label for="direccion">Direccion</Label>
              <Input type="text" name="direccion" onChange={inputChangeValue} value={usuarios.direccion} />
            </FormGroup>

            <FormGroup>
              <Label for="codigoEstado">Estado</Label>
              <Input type="text" name="codigoEstado" onChange={inputChangeValue} value={usuarios.codigoEstado} />
            </FormGroup>

            <FormGroup>
              <Label for="codigoDepto">Departamento</Label>
              <Input type="text" name="codigoDepto" onChange={inputChangeValue} value={usuarios.codigoDepto} />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="text" name="password" onChange={inputChangeValue} value={usuarios.password} />
            </FormGroup>
          </Form>
                         <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                         <Button color="secondary"  onClick={volver}>Volver</Button>
                    </Col>
               </Row>
         </Container>
     )
} 