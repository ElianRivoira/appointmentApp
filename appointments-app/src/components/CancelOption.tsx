import React, { useState } from 'react';
import styles from '../styles/CancelReserve.module.css';

interface Props {
  children: React.ReactNode;
  id: string;
}

const CancelOption: React.FC<Props> = ({ children, id }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <hr />
      <div className='my-6.5 flex items-center relative'>
        <input
          type='checkbox'
          name={id}
          id={id}
          className={styles.csscheckbox}
          onClick={() => setChecked(!checked)}
        />
        <label
          htmlFor={id}
          className='text-grey8 hover:text-black cursor-pointer ml-1.5'
        >
          {children}
        </label>
      </div>
      {checked ? (
        <div className='p-6 bg-grey1 mb-6.5 rounded-lg'>
          <p className='text-ss font-semibold'>Su reserva actual será cancelada</p>
          <p className='my-3 text-ss font-semibold'>La cancelación no puede ser revertida</p>
          <button type='submit' className='h-11 px-6 py-3 rounded-lg bg-error font-semibold text-ls text-white active:shadow-active hover:bg-errorHover'>Confirmar cancelación</button>
        </div>
      ) : null}
    </>
  );
};

export default CancelOption;
