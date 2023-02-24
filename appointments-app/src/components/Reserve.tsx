import React from 'react';

import Dropdown from '@/commons/Dropdown';

interface Props {
  data: {
    _id: string;
    id: string;
    date: Date;
    branch: string;
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
          <div className='text-sm font-semibold'>{data.id}</div>
        </div>
      </div>
      <div className='w-1/6 flex justify-end'>
        <Dropdown reserveId={data._id} />
      </div>
    </div>
  );
};

export default Reserve;
