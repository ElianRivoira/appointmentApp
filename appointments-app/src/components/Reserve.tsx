import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import Dropdown from '@/commons/Dropdown';

interface Props {
  data: reserveUser;
  operatorView: boolean;
  refetchFunc: UseQueryResult<any, any>;
}

const Reserve: React.FC<Props> = ({ data, operatorView, refetchFunc }) => {
  let date = new Date(data.date);
  let [fecha, hora] = date.toLocaleString().split(',');
  let minutos;
  [hora, minutos] = hora.split(':');
  return (
    <div className='flex mb-4 border-2 rounded-xl p-6'>
      {operatorView ? (
        <>
          <div className='w-5/6 flex py-1.5'>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>Nombre y apellido</div>
              <div className='text-sm font-semibold'>{data.name}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>Reserva</div>
              <div className='text-sm font-semibold'>{fecha + ',' + hora + ':' + minutos + ' hs'}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>Día de la reserva</div>
              <div className='text-sm font-semibold'>{new Date(data.creationDate).toLocaleString().split(',')[0]}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>N° de la reserva</div>
              <div className='text-sm font-semibold'>{data.id}</div>
            </div>
          </div>
          <div className='w-1/6 flex justify-end'>
            <Dropdown reserveId={data._id} view={'operator'} refetchFunc={refetchFunc} />
          </div>
        </>
      ) : (
        <>
          <div className='w-5/6 flex py-1.5'>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>Nombre y apellido</div>
              <div className='text-sm font-semibold'>{data.name}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>Reserva</div>
              <div className='text-sm font-semibold'>{fecha + ',' + hora + ':' + minutos + ' hs'}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>Sucursal</div>
              <div className='text-sm font-semibold'>{data.branch.name}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>Id de la reserva</div>
              <div className='text-sm font-semibold'>{data.id}</div>
            </div>
          </div>
          <div className='w-1/6 flex justify-end'>
            <Dropdown reserveId={data._id} view={'user'} refetchFunc={refetchFunc} />
          </div>
        </>
      )}
    </div>
  );
};

export default Reserve;
