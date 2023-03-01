import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import editIcon from '../../public/icons/edit.svg';

interface Props {
  reserveId: string;
  view: string;
}

const Dropdown: React.FC<Props> = ({ reserveId, view }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        className={`bg-grey1 hover:bg-grey2 text-cruce font-semibold text-lb rounded-lg ${view === 'user' ? 'w-[100px]' : view === 'operator' ? 'w-[150px]' : null} h-12 flex justify-center items-center active:shadow-active relative z-10`}
        onClick={() => setOpen(!open)}
      >
        <div className='ml-2 mr-3 font-semibold text-[15px]'>{view === 'user' ? 'Editar' : view === 'operator' ? 'Confirmación' : null}</div>
        <Image src={editIcon} alt='editIcon' className='w-4 h-4 mr-1'></Image>
      </button>
      {open ? (
        <>
          <button className='fixed w-full h-full inset-0 cursor-default' onClick={() => setOpen(false)}></button>
          <ul className='absolute z-20 left-0 py-1.5 w-32 mt-2 border rounded-lg bg-white shadow-xl'>
            <Link href={`./reservePanel/edit/${reserveId}`}>
              <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
              {view === 'user' ? 'Editar' : view === 'operator' ? 'Confirmar' : null}
              </li>
            </Link>
            <Link href={`./reservePanel/cancel/${reserveId}`}>
              <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
              {view === 'user' ? 'Cancelar' : view === 'operator' ? 'Finalizar' : null}
              </li>
            </Link>
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default Dropdown;
