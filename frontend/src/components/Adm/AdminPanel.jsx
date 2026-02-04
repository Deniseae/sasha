import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../services/products";
import FormularioProducto from "./FormularioProducto";
import Swal from "sweetalert2";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [servicios, setServicios] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [servicioAEditar, setServicioAEditar] = useState(null);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      const data = await getProducts();
      setServicios(data);
    } catch (error) {
      console.error("Error al cargar servicios");
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás segura?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ad1457",
      cancelButtonColor: "#777",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await deleteProduct(id);
        Swal.fire("Eliminado", "El servicio ha sido quitado.", "success");
        cargarServicios();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el servicio.", "error");
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Gestión de Servicios</h1>
        <button
          className="btn-nuevo"
          onClick={() => {
            setServicioAEditar(null);
            setMostrarForm(true);
          }}
        >
          + NUEVO SERVICIO
        </button>
      </div>

      {mostrarForm && (
        <div className="modal-overlay">
          <div className="modal-sasha">
            <button
              className="btn-cerrar"
              onClick={() => setMostrarForm(false)}
            >
              X
            </button>
            <FormularioProducto
              actualizarLista={cargarServicios}
              cerrarForm={() => setMostrarForm(false)}
              servicioEditando={servicioAEditar}
            />
          </div>
        </div>
      )}

      <div className="tabla-servicios">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s._id}>
                <td>
                  <img src={s.image} alt={s.name} className="img-miniatura" />
                </td>
                <td>{s.name}</td>
                <td>${s.price}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setServicioAEditar(s);
                      setMostrarForm(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleEliminar(s._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
