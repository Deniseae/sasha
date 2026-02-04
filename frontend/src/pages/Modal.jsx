import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, children, onSave, title }) => {
  if (!isOpen) return null;

  // Cerrar al hacer clic en el fondo
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay-sasha") {
      onClose();
    }
  };

  return (
    <div className="modal-overlay-sasha" onClick={handleOverlayClick}>
      <div className="modal-content-sasha fade-in-scale">
        {title && <h3 className="modal-title-sasha">{title}</h3>}

        <div className="modal-body-sasha">{children}</div>

        <div className="modal-buttons-sasha">
          <button className="btn-modal-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-modal-save" onClick={onSave}>
            Confirmar Turno
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
