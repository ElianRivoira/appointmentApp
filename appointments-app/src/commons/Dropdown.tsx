import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import editIcon from '../../public/icons/edit.svg';

interface Props {
  reserveId: string;
}

const Dropdown: React.FC<Props> = ({ reserveId }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        className='bg-grey1 hover:bg-grey2 text-cruce font-semibold text-lb rounded-lg w-24 h-12 flex justify-center items-center active:shadow-active relative z-10'
        onClick={() => setOpen(!open)}
      >
        <div className='ml-2 mr-3 font-semibold text-[15px]'>Editar</div>
        <Image src={editIcon} alt='editIcon' className='w-4 h-4 mr-1'></Image>
      </button>
      {open ? (
        <>
          <button className='fixed w-full h-full inset-0 cursor-default' onClick={() => setOpen(false)}></button>
          <ul className='absolute z-20 left-0 py-1.5 w-32 mt-2 border rounded-lg bg-white shadow-xl'>
            <Link href={`./reservePanel/edit/${reserveId}`}>
              <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                Editar
              </li>
            </Link>
            <Link href={`./reservePanel/cancel/${reserveId}`}>
              <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                Cancelar
              </li>
            </Link>
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default Dropdown;
