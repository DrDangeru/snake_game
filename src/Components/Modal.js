import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, score, highScore }) => {
  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    zIndex: 1000
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '15px'
  };

  const scoreStyle = {
    marginBottom: '15px'
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Game Over!</h2>
        <div style={scoreStyle}>
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>
        <button style={buttonStyle} onClick={onClose}>
          Play Again
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired
};

export default Modal;
