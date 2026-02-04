// ... (mismos imports arriba)

const Login = () => {
  // ... (mismos estados y funciones handleSubmit/handleGoogleSuccess)

  return (
    <div className="login-page">
      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>

      <div className="login-card">
        <div className="login-header">
          {/* Reemplazamos el emoji por tu logo */}
          <img src="/SB-logo.png" alt="Logo Sasha" className="login-logo-img" />
          <h2>Bienvenida</h2>
          <p>Ingresa a tu cuenta de Estética Sasha</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ... resto del formulario igual ... */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Tu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Tu Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setMostrarPassword(!mostrarPassword)}
            >
              {mostrarPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" className="btn-login-submit">
            INGRESAR
          </button>
        </form>

        <div className="separator">
          <div></div>
          <span>O continúa con</span>
          <div></div>
        </div>

        <div className="google-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login Failed")}
            theme="outline"
            shape="pill"
            width="100%"
          />
        </div>

        <p className="footer-text">
          ¿Aún no te cuidas con nosotros?{" "}
          <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
