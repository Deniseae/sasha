import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      {/* --- SECCIÓN HERO --- */}
      <div className="hero-section container-fluid">
        <div className="row align-items-center justify-content-center min-vh-100">
          
          {/* COLUMNA IZQUIERDA (Fotos Estéticas) */}
          <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 side-gallery text-lg-end pe-4">
             <div className="spa-frame tilt-left ms-auto"><img src="/spa1.jpg" alt="Tratamiento 1" className="side-img" /></div>
             <div className="spa-frame tilt-right ms-auto"><img src="/spa2.jpg" alt="Tratamiento 2" className="side-img" /></div>
          </div>

          {/* COLUMNA CENTRAL */}
          <div className="col-lg-6 text-center">
             <div className="main-welcome-box">
                <span className="welcome-tag">BIENVENIDA A TU MOMENTO</span>
                <h1 className="display-1 mb-2 sasha-title">Estética <span className="highlight">Sasha</span></h1>
                <h3 className="sasha-subtitle">BELLEZA & BIENESTAR</h3>
                
                <div className="main-image-container mt-4">
                  <img src="/hero-sasha.png" alt="Estética y Relax" className="main-hero-img" />
                </div>

                <p className="sasha-lead mt-4 mb-5">
                  Realza tu belleza natural con tratamientos de vanguardia. Un espacio diseñado exclusivamente para tu cuidado personal.
                </p>

                <button className="btn-sasha-cta" onClick={() => navigate("/agendar")}>
                  RESERVAR MI TURNO
                </button>
             </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 side-gallery text-lg-start ps-4">
             <div className="spa-frame tilt-right me-auto"><img src="/spa3.jpg" alt="Tratamiento 3" className="side-img" /></div>
             <div className="spa-frame tilt-left me-auto"><img src="/spa4.jpg" alt="Tratamiento 4" className="side-img" /></div>
          </div>

        </div>
      </div>

      {/* --- SECCIÓN SERVICIOS --- */}
      <div className="container my-5 py-5">
        <h2 className="text-center section-title mb-5">NUESTROS SERVICIOS</h2>
        <div className="row g-4">
           <div className="col-md-3"><div className="spa-card"><div className="icon">✨</div><h4>FACIALES</h4><p>Limpieza profunda e hidratación para una piel radiante.</p></div></div>
           <div className="col-md-3"><div className="spa-card"><div className="icon">💆‍♀️</div><h4>MASAJES</h4><p>Relajación total para liberar el estrés diario.</p></div></div>
           <div className="col-md-3"><div className="spa-card"><div className="icon">💅</div><h4>MANICURÍA</h4><p>Cuidado y diseño profesional para tus manos.</p></div></div>
           <div className="col-md-3"><div className="spa-card"><div className="icon">🌸</div><h4>CORRECCIÓN</h4><p>Perfilado de cejas y tratamientos específicos.</p></div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;