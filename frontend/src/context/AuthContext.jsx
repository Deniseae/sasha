import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Creamos el contexto con un nombre que no choque con el archivo
export const AuthDataContext = createContext();

// 2. El Hook para usarlo
export const useAuth = () => {
  const context = useContext(AuthDataContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// 3. El Proveedor que envuelve la app
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        setUsuario(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (error) {
        localStorage.clear();
      }
    }
    setCargando(false);
  }, []);

  // ESTO ES LO QUE TE FALTABA Y POR ESO DABA ERROR:
  const login = (userData, tokenData) => {
    setUsuario(userData);
    setToken(tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthDataContext.Provider value={{ usuario, token, login, logout }}>
      {!cargando && children}
    </AuthDataContext.Provider>
  );
};
