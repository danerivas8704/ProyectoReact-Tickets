import { useEffect, useState } from "react"
import { appsettings } from "../settings/appsetings"
import { Link } from "react-router"
import Swal from "sweetalert2"
import { ICliente } from "../Interfaces/ICliente"
import { Container, Row, Col, Table, Button } from "reactstrap"

export function Lista() {
     const [clientes, setClientes] = useState<ICliente[]>([]);

     const obtenerClientes = async () => {
          const response = await fetch(`${appsettings.apiUrl}Clientes/Obtener`)
          if (response.ok) {
               const data = await response.json();
               setClientes(data)
          }
     }

     useEffect(() => {
          obtenerClientes()
     }, [])

     const Eliminar = (id: number) => {
          Swal.fire({
               title: "Estas seguro?",
               text: "Eliminar empleado!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Si, eliminar!"
          }).then(async (result) => {
               if (result.isConfirmed) {

                    const response = await fetch(`${appsettings.apiUrl}Empleado/Eliminar/${id}`, { method: "DELETE" })
                    if (response.ok) await obtenerClientes()
               }
          });
     }

     return (
          <Container className="mt-5">
               <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                         <h4>Lista de Clientes</h4>
                         <hr />
                         <Link className="btn btn-success mb-3" to="/nuevocliente" >Nuevo Cliente</Link>

                         <Table bordered>
                              <thead>
                                   <tr>
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Correo</th>                                        
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        clientes.map((item) => (
                                             <tr key={item.codigoCliente}>
                                                  <td>{item.codigoCliente}</td>
                                                  <td>{item.nombreCliente}</td>
                                                  <td>{item.apellidoCliente}</td>
                                                  <td>{item.correoCliente}</td>
                                                  <td>
                                                       <Link className="btn btn-primary me-2" to={`/editarcliente/${item.codigoCliente}`} >Editar</Link>
                                                       <Button color="danger" onClick={() => { Eliminar(item.codigoCliente!) }}>
                                                            Eliminar
                                                       </Button>
                                                  </td>
                                             </tr>
                                        ))
                                   }
                              </tbody>
                         </Table>
                    </Col>
               </Row>
          </Container>
     )
}