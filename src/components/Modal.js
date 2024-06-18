import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>כל הכבוד!</h2>
        <p>ברכות! סיימת את הסרטון האינטראקטיבי.</p>
        <button onClick={onClose}>סגור</button>
      </div>
    </div>
  );
};

export default Modal;
