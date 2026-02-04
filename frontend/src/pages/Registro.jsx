import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    rol: "usuario", // Forzamos el rol para que no sea admin por error
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos el formData que ya incluye el rol: "usuario"
      await api.post("/registro", formData);

      await Swal.fire({
        title: "¡Bienvenida, Bella!",
        text: "Tu cuenta en Estética Sasha ha sido creada. Ya puedes iniciar sesión.",
        icon: "success",
        background: "#ffffff",
        color: "#ad1457",
        confirmButtonColor: "#ad1457",
      });
      navigate("/login");
    } catch (err) {
      Swal.fire({
        title: "Ups! Algo salió mal",
        text:
          err.response?.data?.message ||
          "No se pudo completar el registro. Revisa los datos.",
        icon: "error",
        background: "#ffffff",
        color: "#ad1457",
        confirmButtonColor: "#f06292",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>

      <div className="login-card" style={{ maxWidth: "600px" }}>
        <div className="login-header">
          <span className="login-icon">✨</span>
          <h2>Unite a Sasha</h2>
          <p>Tu espacio de belleza y cuidado personal te espera.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label label-sasha">Nombre/s</label>
              <input
                type="text"
                name="nombres"
                className="form-control input-sasha" // Agregué form-control para Bootstrap
                value={formData.nombres}
                onChange={handleChange}
                placeholder="Ej: María"
                required
              />
            </div>
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label label-sasha">Apellido/s</label>
              <input
                type="text"
                name="apellidos"
                className="form-control input-sasha"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Ej: García"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label label-sasha">DNI (Opcional)</label>
              <input
                type="text"
                name="dni"
                className="form-control input-sasha"
                value={formData.dni}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label label-sasha">Teléfono</label>
              <input
                type="text"
                name="telefono"
                className="form-control input-sasha"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="11 1234 5678"
                required
              />
            </div>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label label-sasha">Dirección</label>
            <input
              type="text"
              name="direccion"
              className="form-control input-sasha"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Calle y número"
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label label-sasha">Email</label>
            <input
              type="email"
              name="email"
              className="form-control input-sasha"
              value={formData.email}
              onChange={handleChange}
              placeholder="hola@ejemplo.com"
              required
            />
          </div>

          <div className="mb-4 text-start">
            <label className="form-label label-sasha">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control input-sasha"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login-sasha w-100 py-3">
            CREAR MI CUENTA ✨
          </button>
        </form>

        <p className="footer-text mt-4">
          ¿Ya eres parte de la comunidad?{" "}
          <Link to="/login" className="text-pink-sasha">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
