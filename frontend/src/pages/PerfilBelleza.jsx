// src/pages/PerfilBelleza.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { Table, Button, Form, Card } from "react-bootstrap";
import Swal from "sweetalert2";

const PerfilBelleza = () => {
  const { token } = useAuth();
  const [fichas, setFichas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "Tratamiento General",
    edad: "",
    raza: "", // Usado para Tipo de Piel
    enfermedades: "", // Usado para Alergias
    observaciones: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const fetchFichas = async () => {
    if (!token) return;
    try {
      const res = await api.get("/mascotas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFichas(res.data);
    } catch (err) {
      console.error("❌ Error:", err);
      setErrorMsg("No se pudo cargar tu perfil de belleza.");
    }
  };

  useEffect(() => {
    fetchFichas();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (ficha) => {
    setEditandoId(ficha._id);
    setFormData({
      nombre: ficha.nombre,
      edad: ficha.edad,
      raza: ficha.raza,
      enfermedades: ficha.enfermedades,
      observaciones: ficha.observaciones,
    });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setErrorMsg("");
  };

  const handleGuardar = async () => {
    try {
      await api.put(`/mascotas/${editandoId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        title: "¡Actualizado!",
        text: "Tus datos han sido guardados.",
        icon: "success",
        confirmButtonColor: "#ad1457",
      });
      fetchFichas();
      handleCancelar();
    } catch (err) {
      setErrorMsg("No se pudo guardar la información.");
    }
  };

  return (
    <div className="admin-container fade-in">
      <div className="admin-header-flex">
        <div>
          <h2 className="admin-title-sasha">Mi Perfil de Belleza</h2>
          <p className="admin-subtitle-sasha">
            Gestiona tus preferencias y datos para tus sesiones
          </p>
        </div>
      </div>

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <div className="sasha-table-card table-responsive">
        <Table hover className="sasha-table">
          <thead>
            <tr>
              <th>TIPO DE SESIÓN</th>
              <th>PIEL / UÑAS</th>
              <th>ALERGIAS</th>
              <th>OBSERVACIONES</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {fichas.map((f) => (
              <tr key={f._id}>
                <td>
                  {editandoId === f._id ? (
                    <Form.Control
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="fw-bold text-pink">{f.nombre}</span>
                  )}
                </td>
                <td>
                  {editandoId === f._id ? (
                    <Form.Control
                      name="raza"
                      placeholder="Ej: Piel Seca"
                      value={formData.raza}
                      onChange={handleChange}
                    />
                  ) : (
                    f.raza || "No especificado"
                  )}
                </td>
                <td>
                  {editandoId === f._id ? (
                    <Form.Control
                      name="enfermedades"
                      placeholder="Ej: Alergia al acrílico"
                      value={formData.enfermedades}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="text-danger">
                      {f.enfermedades || "Ninguna"}
                    </span>
                  )}
                </td>
                <td>
                  {editandoId === f._id ? (
                    <Form.Control
                      as="textarea"
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleChange}
                    />
                  ) : (
                    f.observaciones || "-"
                  )}
                </td>
                <td>
                  {editandoId === f._id ? (
                    <div className="action-btns-wrap">
                      <button
                        className="btn-action edit"
                        title="Guardar"
                        onClick={handleGuardar}
                      >
                        ✅
                      </button>
                      <button
                        className="btn-action delete"
                        title="Cancelar"
                        onClick={handleCancelar}
                      >
                        ❌
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-action edit"
                      onClick={() => handleEdit(f)}
                    >
                      ✏️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {!editandoId && fichas.length === 0 && (
        <Card className="text-center p-5 mt-3 border-0 shadow-sm">
          <p className="text-muted">
            Aún no tienes un perfil de belleza creado.
          </p>
          <p className="small">Sasha lo creará por vos en tu próxima visita.</p>
        </Card>
      )}
    </div>
  );
};

export default PerfilBelleza;
