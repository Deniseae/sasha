// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("usuario");
    const savedToken = sessionStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        setUsuario(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (error) {
        console.error("Error parsing user data", error);
        sessionStorage.clear();
      }
    }
    // Un pequeño delay para que la transición no sea brusca (opcional)
    setTimeout(() => setCargando(false), 500);
  }, []);

  const login = (usuarioData, tokenData) => {
    setUsuario(usuarioData);
    setToken(tokenData);
    sessionStorage.setItem("usuario", JSON.stringify(usuarioData));
    sessionStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    sessionStorage.clear();
  };

  if (cargando) {
    // Pantalla de carga con la estética de Sasha
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fdfdfd",
        }}
      >
        <div
          className="spinner-border text-pink"
          role="status"
          style={{ color: "#ad1457" }}
        >
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p
          style={{
            marginTop: "15px",
            color: "#ad1457",
            fontWeight: "500",
            letterSpacing: "1px",
          }}
        >
          PREPARANDO TU EXPERIENCIA...
        </p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
