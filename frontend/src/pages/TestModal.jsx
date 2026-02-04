import React, { useState } from "react";
import Modal from "./Modal";

const TestModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        padding: "5rem",
        textAlign: "center",
        backgroundColor: "#fdfdfd",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-4">Panel de Pruebas de UI</h3>
      <button onClick={() => setIsOpen(true)} className="btn-save-sasha">
        Probar Modal de Sasha
      </button>

      <Modal
        isOpen={isOpen}
        title="✨ Prueba de Interfaz"
        onClose={() => setIsOpen(false)}
        onSave={() => {
          alert("¡Funciona perfecto!");
          setIsOpen(false);
        }}
      >
        <p className="text-center">
          Si ves esto, el componente Modal está correctamente configurado y
          listo para recibir los formularios de turnos.
        </p>
      </Modal>
    </div>
  );
};

export default TestModal;
