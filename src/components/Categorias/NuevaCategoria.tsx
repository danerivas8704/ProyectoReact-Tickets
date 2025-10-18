import { ChangeEvent, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { useNavigate } from "react-router"
import  Swal  from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, Label,Input} from "reactstrap"    
import type { ICategoria } from "../../Interfaces/ICategoria"


const initialICategoria = {  
  nombreCategoria: "",
  descripcionCategoria: "",    
  codigoEstado: 1
}


export function NuevaCategoria(){
     const navigate=useNavigate();
     const [categorias,setCategorias]=useState<ICategoria>(initialICategoria);
    const inputChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setCategorias({
            ...categorias,
            [inputName]:inputValue})
    }

    const guardar = async () =>{
           const response = await fetch(`${appsettings.apiUrl}Categorias/Crear`,{
                method: 'POST',
                headers:{
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(categorias)
           })
           if(response.ok){
                navigate("/")
           }else{
                Swal.fire({
                     title: "Error!",
                     text: "No se pudo guardar la categoria",
                     icon: "warning"
                   });
         }
     }

     const volver = () =>{
          navigate("/")
     }

    return(
         <Container className="mt-5">
               <Row>
                    <Col sm={{size:8, offset:2}}>
                         <h4>Nueva Categoria</h4>
                         <hr/>
                         <Form>
                              <FormGroup>
                                   <Label>Nombre</Label>
                                   <Input type="text" name="nombreCliente" onChange={inputChangeValue} value={cliente.nombreCliente} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Apellidos</Label>
                                   <Input type="text" name="apellidoCliente" onChange={inputChangeValue} value={cliente.apellidoCliente} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Correo</Label>
                                   <Input type="text" name="correoCliente" onChange={inputChangeValue} value={cliente.correoCliente} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>direccion</Label>
                                   <Input type="text" name="direccionCliente" onChange={inputChangeValue} value={cliente.direccionCliente} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Estado</Label>
                                   <Input type="number" name="codigoEstado" onChange={inputChangeValue} value={cliente.codigoEstado} />
                              </FormGroup>
                         </Form>
                         <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                         <Button color="secondary"  onClick={volver}>Volver</Button>
                    </Col>
               </Row>
         </Container>
     )
}