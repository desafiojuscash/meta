import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "@aws-amplify/ui-react";

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '80%',
  maxWidth: '500px',
  position: 'relative',
  overflow: 'auto',
  maxHeight: '800px',
};

const Modal = ({ isOpen, children, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyles} onClick={onClose}>
      <div
        style={modalStyles}
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <Button position="absolute" top="0px" right="0px" onClick={onClose}>X</Button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
