import React, { useState, useEffect } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";
import { uploadToCloudinary } from "../services/uploadImage";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const GaleriaAdmin = () => {
  const [fotos, setFotos] = useState([]);
  const [nuevaFoto, setNuevaFoto] = useState({ titulo: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargarFotos = async () => {
    try {
      const res = await api.get("/fotos");
      setFotos(res.data);
    } catch (error) {
      console.error("Error al cargar fotos:", error);
    }
  };

  useEffect(() => {
    cargarFotos();
  }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!file) {
      return Swal.fire({
        title: "Selecciona una imagen",
        icon: "warning",
        confirmButtonColor: "#ad1457",
      });
    }

    try {
      setLoading(true);
      Swal.fire({
        title: "Subiendo obra de arte...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // 1) Subir imagen a Cloudinary usando tu servicio
      const imageUrl = await uploadToCloudinary(file);

      // 2) Guardar en tu backend
      await api.post("/fotos", {
        titulo: nuevaFoto.titulo,
        url: imageUrl,
      });

      Swal.fire({
        title: "¡Lista!",
        text: "La foto ya está en tu galería",
        icon: "success",
        confirmButtonColor: "#ad1457",
      });

      setNuevaFoto({ titulo: "" });
      setFile(null);
      // Resetear el input de archivo manualmente
      e.target.reset();
      cargarFotos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo subir la foto",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Borrar de la galería?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ad1457",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/fotos/${id}`);
        cargarFotos();
        Swal.fire("Eliminada", "La foto ha sido quitada", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  return (
    <div className="admin-container fade-in">
      <div className="admin-header-flex">
        <div>
          <h2 className="admin-title-sasha">Portfolio de Trabajos</h2>
          <p className="admin-subtitle-sasha">
            Sube fotos de tus uñas, tratamientos y sesiones
          </p>
        </div>
      </div>

      {/* FORMULARIO ESTILIZADO */}
      <Card className="sasha-card mb-5 shadow-sm border-0">
        <Card.Body className="p-4">
          <Form onSubmit={handleAgregar}>
            <Row className="align-items-end">
              <Col md={5}>
                <Form.Group>
                  <Form.Label className="fw-bold text-pink">
                    Título / Descripción
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Esculpidas Soft Gel"
                    value={nuevaFoto.titulo}
                    onChange={(e) =>
                      setNuevaFoto({ ...nuevaFoto, titulo: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fw-bold text-pink">Imagen</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Button
                  type="submit"
                  className="btn-save-sasha w-100"
                  disabled={loading}
                >
                  {loading ? "Subiendo..." : "Añadir a Galería"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* GRILLA DE FOTOS */}
      <Row>
        {fotos.length > 0 ? (
          fotos.map((f) => (
            <Col key={f._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div className="sasha-gallery-item-admin">
                <img src={f.url} alt={f.titulo} className="img-fluid" />
                <div className="sasha-gallery-overlay">
                  <span className="text-white small fw-bold mb-2">
                    {f.titulo}
                  </span>
                  <button
                    className="btn-action delete"
                    onClick={() => handleEliminar(f._id)}
                    title="Eliminar foto"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <p className="text-muted">No hay fotos en la galería aún.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default GaleriaAdmin;
