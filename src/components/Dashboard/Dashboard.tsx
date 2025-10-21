import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { appsettings } from "../../settings/appsetings";

interface IMetricas {
  totalClientes: number;
  totalPedidos: number;
  totalVentas: number;
  totalPrioridades: number;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [metricas, setMetricas] = useState<IMetricas>({
    totalClientes: 0,
    totalPedidos: 0,
    totalVentas: 0,
    totalPrioridades: 0,
  });

  // Cargar métricas al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await fetch(`${appsettings.apiUrl}Dashboard/ObtenerMetricas`);
        if (response.ok) {
          const data = await response.json();
          setMetricas(data);
        } else {
          Swal.fire("Error", "No se pudieron cargar las métricas del dashboard", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Error al conectar con el servidor", "error");
      }
    };

    cargarDatos();
  }, []);

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Panel de Control</h3>
      <Row>
        {/* Tarjetas de métricas */}
        <Col md="3" sm="6" className="mb-4">
          <Card body color="primary" inverse>
            <CardBody>
              <CardTitle tag="h5">Clientes</CardTitle>
              <CardText>{metricas.totalClientes}</CardText>
              <Button color="light" size="sm" onClick={() => navigate("/clientes/listaclientes")}>
                Ver más
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="3" sm="6" className="mb-4">
          <Card body color="success" inverse>
            <CardBody>
              <CardTitle tag="h5">Pedidos</CardTitle>
              <CardText>{metricas.totalPedidos}</CardText>
              <Button color="light" size="sm" onClick={() => navigate("/pedidos/listapedidos")}>
                Ver más
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="3" sm="6" className="mb-4">
          <Card body color="warning" inverse>
            <CardBody>
              <CardTitle tag="h5">Ventas</CardTitle>
              <CardText>{metricas.totalVentas}</CardText>
              <Button color="light" size="sm" onClick={() => navigate("/ventas/listaventas")}>
                Ver más
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="3" sm="6" className="mb-4">
          <Card body color="info" inverse>
            <CardBody>
              <CardTitle tag="h5">Prioridades</CardTitle>
              <CardText>{metricas.totalPrioridades}</CardText>
              <Button color="light" size="sm" onClick={() => navigate("/prioridades/listaprioridades")}>
                Ver más
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Sección extra */}
      <Row className="mt-5">
        <Col sm="12" className="text-center">
          <h5>Resumen general</h5>
          <p>
            Este panel muestra los indicadores más importantes del sistema.  
            Usa las opciones de navegación para ver más detalles sobre cada módulo.
          </p>
          <Button color="primary" onClick={() => navigate("/prioridades/nueva")}>
            Crear nueva prioridad
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
