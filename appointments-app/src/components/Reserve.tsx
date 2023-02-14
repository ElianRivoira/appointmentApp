import React from 'react';
import editIcon from '../../public/icons/edit.svg';
import Image from 'next/image';

interface Props {
  data: {
    _id: string;
    date: Date;
    branch: string;
    time: string;
    name: string;
    email: string;
  };
}

const Reserve: React.FC<Props> = ({ data }) => {
  let date = new Date(data.date);
  return (
    <div className='flex mb-4 border-2 rounded-xl p-6'>
      <div className='w-5/6 flex py-1.5'>
        <div className='flex flex-col flex-1'>
          <div className='text-xs'>Nombre y apellido</div>
          <div className='text-sm font-semibold'>{data.name}</div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='text-xs'>Reserva</div>
          <div className='text-sm font-semibold'>{date.toLocaleString()}</div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='text-xs'>Sucursal</div>
          <div className='text-sm font-semibold'>{data.branch}</div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='text-xs'>Id de la reserva</div>
          <div className='text-sm font-semibold'>{data._id}</div>
        </div>
      </div>
      <div className='w-1/6 flex justify-end'>
        <button className='bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-24 h-12 flex justify-center items-center'>
          <div className='ml-2 mr-3 font-semibold text-[15px]'>Editar</div>
          <Image src={editIcon} alt='editIcon' className='w-4 h-4 mr-1'></Image>
        </button>
      </div>
    </div>
  );
};

export default Reserve;
