import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import api from "../api/axios";
import Swal from "sweetalert2";
import "./DuenosList.css"; // Reutilizamos el mismo CSS para mantener la estética

const EmpleadosList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [empleadoEditarId, setEmpleadoEditarId] = useState(null);

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    email: "",
    telefono: "",
    puesto: "Masajista",
  });

  // Nota: Asegúrate de tener la ruta /empleados en tu backend
  const cargarEmpleados = async () => {
    try {
      const res = await api.get("/empleados");
      setEmpleados(res.data);
    } catch (error) {
      console.error("Error al cargar staff");
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const handleAbrirModal = (emp = null) => {
    if (emp) {
      setEditando(true);
      setEmpleadoEditarId(emp._id);
      setFormData({
        nombres: emp.nombres,
        apellidos: emp.apellidos,
        dni: emp.dni,
        email: emp.email,
        telefono: emp.telefono,
        puesto: emp.puesto,
      });
    } else {
      setEditando(false);
      setFormData({
        nombres: "",
        apellidos: "",
        dni: "",
        email: "",
        telefono: "",
        puesto: "Masajista",
      });
    }
    setShowModal(true);
  };

  const handleGuardar = async () => {
    try {
      if (editando) {
        await api.put(`/empleados/${empleadoEditarId}`, formData);
      } else {
        await api.post("/empleados", formData);
      }
      Swal.fire({
        title: "¡Staff Actualizado!",
        icon: "success",
        confirmButtonColor: "#ad1457",
      });
      setShowModal(false);
      cargarEmpleados();
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar la información", "error");
    }
  };

  return (
    <div className="admin-container fade-in">
      <div className="admin-header-flex">
        <div>
          <h2 className="admin-title-sasha">Staff de Sasha</h2>
          <p className="admin-subtitle-sasha">Masajistas y Manicuras</p>
        </div>
        <Button className="btn-sasha-pink" onClick={() => handleAbrirModal()}>
          + Registrar Personal
        </Button>
      </div>

      <div className="table-responsive sasha-table-card">
        <Table hover className="sasha-table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>ESPECIALIDAD</th>
              <th>CONTACTO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp._id}>
                <td className="fw-bold name-cell">
                  {emp.nombres} {emp.apellidos}
                </td>
                <td>
                  <span className="badge-manual">{emp.puesto}</span>
                </td>
                <td>{emp.telefono}</td>
                <td>
                  <div className="action-btns-wrap">
                    <button
                      className="btn-action edit"
                      onClick={() => handleAbrirModal(emp)}
                    >
                      ✏️
                    </button>
                    <button className="btn-action delete">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="sasha-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editando ? "Editar Perfil" : "Nuevo Integrante"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="sasha-form">
            <Form.Group className="mb-3">
              <Form.Label>Especialidad</Form.Label>
              <Form.Select
                value={formData.puesto}
                onChange={(e) =>
                  setFormData({ ...formData, puesto: e.target.value })
                }
              >
                <option value="Masajista">Masajista</option>
                <option value="Manicura">Manicura</option>
                <option value="Estilista">Estilista</option>
              </Form.Select>
            </Form.Group>
            <div className="row">
              <div className="col-6 mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  value={formData.nombres}
                  onChange={(e) =>
                    setFormData({ ...formData, nombres: e.target.value })
                  }
                />
              </div>
              <div className="col-6 mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  value={formData.apellidos}
                  onChange={(e) =>
                    setFormData({ ...formData, apellidos: e.target.value })
                  }
                />
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono de contacto</Form.Label>
              <Form.Control
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button className="btn-save-sasha" onClick={handleGuardar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmpleadosList;
