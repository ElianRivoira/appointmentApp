import React from 'react';
import styles from '../styles/CancelReserve.module.css';
import Button from '@/commons/Button';

interface Props {
  label: string;
  id: string;
  cancelReason: string;
  setCancelReason: React.Dispatch<React.SetStateAction<string>>;
}

const CancelOption: React.FC<Props> = ({ label, id, cancelReason, setCancelReason }) => {
  return (
    <>
      <hr className='border-grey4' />
      <div className='my-6.5 flex items-center relative'>
        <input
          type='radio'
          name={id}
          id={id}
          className={styles.csscheckbox}
          onChange={() => setCancelReason(label)}
          checked={cancelReason === label}
        />
        <label htmlFor={id} className='text-grey8 hover:text-black cursor-pointer ml-1.5'>
          {label}
        </label>
      </div>
      {cancelReason === label ? (
        <div className='p-6 bg-white mb-6.5 rounded-lg mdMax:flex mdMax:flex-col mdMax:items-center'>
          <p className='text-ss font-semibold'>Su reserva actual será cancelada</p>
          <p className='my-3 text-ss font-semibold'>La cancelación no puede ser revertida</p>
          <Button type='submit' style='w-fit px-6 h-11 bg-error hover:bg-errorHover'>
            Confirmar cancelación
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default CancelOption;
