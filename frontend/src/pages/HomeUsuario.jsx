import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "./HomeUsuario.css";

const HomeUsuario = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [perfiles, setPerfiles] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    raza: "", // Lo usamos como 'Categoría' en la UI
    observaciones: "",
  });

  const cargarDatos = async () => {
    if (!usuario?._id) return;
    try {
      const [resPerfiles, resTurnos] = await Promise.all([
        api.get("/mascotas"),
        api.get(`/turnos/dueno/${usuario._id}`),
      ]);
      setPerfiles(
        Array.isArray(resPerfiles.data)
          ? resPerfiles.data
          : resPerfiles.data.mascotas || [],
      );
      setTurnos(resTurnos.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (usuario) cargarDatos();
  }, [usuario]);

  const handleAbrirModal = (perfil = null) => {
    if (perfil) {
      setEditando(true);
      setEditId(perfil._id);
      setFormData({
        nombre: perfil.nombre,
        raza: perfil.raza,
        observaciones: perfil.observaciones || "",
      });
    } else {
      setEditando(false);
      setFormData({ nombre: "", raza: "", observaciones: "" });
    }
    setShowModal(true);
  };

  const handleGuardar = async () => {
    try {
      const payload = { ...formData, dueno: usuario._id, tipoDueno: "Usuario" };
      if (editando) await api.put(`/mascotas/${editId}`, payload);
      else await api.post("/mascotas", payload);

      Swal.fire({
        title: "¡Éxito!",
        text: "Perfil actualizado",
        icon: "success",
        confirmButtonColor: "#ad1457",
      });
      cargarDatos();
      setShowModal(false);
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  };

  return (
    <div className="user-container">
      <div className="user-welcome-header mb-5">
        <span className="user-badge">CLIENTE EXCLUSIVA</span>
        <h1 className="user-title">Hola, {usuario?.nombre}</h1>
        <p>Gestiona tus tratamientos y próximos turnos.</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="section-title-sasha">✨ Mis Perfiles de Belleza</h3>
        <button className="btn-sasha-glow" onClick={() => handleAbrirModal()}>
          + Nuevo Perfil
        </button>
      </div>

      <div className="row mb-5">
        {perfiles.map((p) => (
          <div key={p._id} className="col-md-6 col-lg-4 mb-4">
            <div className="sasha-card-beauty">
              <div className="d-flex justify-content-between">
                <h4 className="pet-name-sasha">{p.nombre}</h4>
                <span>🌸</span>
              </div>
              <p className="small text-muted">{p.raza}</p>
              <p className="text-truncate">{p.observaciones || "Sin notas"}</p>
              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn-icon"
                  onClick={() => handleAbrirModal(p)}
                >
                  ✏️
                </button>
                <button
                  className="btn-turno-sasha"
                  onClick={() => navigate("/agendar")}
                >
                  📅 Agendar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="section-title-sasha mb-4">📅 Mis Próximas Citas</h3>
      {/* ... (aquí iría el mapeo de turnos igual al que tenías) ... */}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editando ? "Editar" : "Nuevo"} Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Tratamiento</Form.Label>
              <Form.Control
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría (Ej: Uñas, Facial)</Form.Label>
              <Form.Control
                value={formData.raza}
                onChange={(e) =>
                  setFormData({ ...formData, raza: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleGuardar} className="btn-save-sasha">
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default HomeUsuario;
