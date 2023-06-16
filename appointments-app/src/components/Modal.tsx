import Image from 'next/image';
import React from 'react';

import wrongCheckbox from '@/assets/icons/wrongCheckbox.svg';
import rightCheckbox from '@/assets/icons/rightCheckbox.svg';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  errors?: CustomError[];
  deleteFunc?: () => void;
  type: number;
  deleteMessage?: string;
  type3Message?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  errors,
  deleteFunc,
  type,
  deleteMessage,
  type3Message,
}) => {
  if (!open) return null;
  return (
    <>
      <div className='fixed inset-0 bg-black/[.75] z-50' />
      <div className='text-center fixed top-2/4 lgMax:left-3 lgMax:right-3 lg:left-2/4 -translate-y-2/4 lg:-translate-x-2/4 bg-white p-8 z-50 rounded-md font-semibold text-ln flex flex-col items-center'>
        {type === 1 ? (
          <>
            <Image
              src={rightCheckbox}
              alt='success'
              className='w-12 h-12 mb-7'
            />
            {children}
          </>
        ) : type === 2 ? (
          <>
            <Image src={wrongCheckbox} alt='error' className='w-12 h-12 mb-7' />
            <ul className='text-start list-disc ml-4'>
              {errors?.map((err, index) => (
                <li key={index}>
                  <h1>{err.message.split(/[.:]/)[0]}</h1>
                  <p className='text-sm font-normal mt-1'>
                    {err.message.split(/[.:]/)[1]}
                  </p>
                  {err.message.split(/[.:]/)[2] && (
                    <p className='text-sm font-normal mt-1'>
                      {err.message.split(/[.:]/)[2]}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : type === 3 ? (
          <>
            <Image
              src={rightCheckbox}
              alt='success'
              className='w-12 h-12 mb-7'
            />
            <h1>{type3Message}</h1>
          </>
        ) : type === 4 ? (
          <>
            <p className='text-lb font-normal mt-1'>{deleteMessage}</p>
            <div className='flex gap-5 justify-center mt-6'>
              <button
                className='border flex items-center text-lb p-4 rounded-md w-fit bg-cruce text-white h-10 hover:bg-cruceHover active:shadow-active transition-colors'
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className='border flex items-center text-lb p-4 rounded-md w-fit bg-redLogout text-white h-10 hover:bg-redLogout/[.9] active:shadow-active transition-colors'
                onClick={deleteFunc}
              >
                Confirmar
              </button>
            </div>
          </>
        ) : null}
        {type !== 4 ? (
          <button
            className='mt-6 border rounded-md w-full bg-cruce text-white h-10 hover:bg-cruceHover active:shadow-active transition-colors'
            onClick={onClose}
          >
            Cerrar
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Modal;
