import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { appsettings } from "../../settings/appsetings";

export function RecuperarPassword() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviarSolicitud = async () => {
    if (!correo) {
      Swal.fire({
        title: "Campo requerido",
        text: "Por favor ingresa tu correo electrónico.",
        icon: "warning",
      });
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch(`${appsettings.apiUrl}Auth/RecuperarPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Solicitud enviada",
          text: "Se ha enviado un enlace de recuperación a tu correo.",
          icon: "success",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Error",
          text: "No se encontró una cuenta con ese correo.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error de conexión",
        text: "No se pudo enviar la solicitud. Intenta nuevamente.",
        icon: "error",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm="6" md="5" lg="4">
          <div className="text-center mb-4">
            <h4>Recuperar contraseña</h4>
            <hr />
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          <Form>
            <FormGroup>
              <Label for="correo">Correo electrónico</Label>
              <Input
                type="email"
                id="correo"
                placeholder="usuario@correo.com"
                value={correo}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCorreo(e.target.value)
                }
              />
            </FormGroup>

            <FormGroup>
              <Label for="usuario">Usuario</Label>
              <Input
                type="text"
                id="usuario"
                placeholder="nombredeusuario"
                value={correo}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCorreo(e.target.value)
                }
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="text"
                id="password"
                placeholder="******"
                value={correo}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCorreo(e.target.value)
                }
              />
            </FormGroup>

            <div className="text-center mt-4">
              <Button
                color="primary"
                className="me-4"
                onClick={enviarSolicitud}
                disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar enlace"}
              </Button>
              <Button color="secondary" onClick={() => navigate("/login")}>
                Volver al login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
