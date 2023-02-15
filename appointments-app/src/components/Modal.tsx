import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/[.75] z-50' />
      <div className='text-center fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 bg-white p-8 z-50 rounded-md font-semibold text-ln'>
        {children}
        <button
          className='mt-6 border rounded-md w-full bg-cruce border-cruce text-white h-11 hover:bg-cruceHover active:shadow-active'
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </>
  );
};

export default Modal;
