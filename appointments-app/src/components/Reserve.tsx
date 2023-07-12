import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import Dropdown from '@/commons/Dropdown';
import ReserveData from '@/commons/ReserveData';

interface Props {
  data: reserveUser;
  operatorView: boolean;
  refetchFunc: UseQueryResult<any, any>;
}

const Reserve: React.FC<Props> = ({ data, operatorView, refetchFunc }) => {
  const date = new Date(data.date);
  const [fecha, time] = date.toLocaleString().split(',');
  const [hora, minutos] = time.split(':');

  return (
    <div className='flex w-full mb-4 border-2 rounded-xl p-2.5 sm:p-6 bg-white'>
      {operatorView ? (
        <>
          <div className='w-5/6 flex lgMax:flex-col py-1.5'>
            <div className='flex lg:w-1/2'>
              <ReserveData label='Nombre y apellido' data={data.name} />
              <ReserveData label='Reserva' data={fecha + ',' + hora + ':' + minutos + ' hs'} />
            </div>
            <div className='flex lg:w-1/2'>
              <ReserveData
                label='Día de la reserva'
                data={new Date(data.creationDate).toLocaleString().split(',')[0]}
              />
              <ReserveData label='N° de la reserva' data={data.id} />
            </div>
          </div>
          <div className='w-1/6 flex justify-center sm:justify-end items-center'>
            <Dropdown reserveId={data._id} view={'operator'} refetchFunc={refetchFunc} />
          </div>
        </>
      ) : (
        <>
          <div className='w-5/6 flex lgMax:flex-col gap-3 py-1.5'>
            <div className='flex lg:w-1/2'>
              <ReserveData label='Nombre y apellido' data={data.name} />
              <ReserveData label='Reserva' data={fecha + ',' + hora + ':' + minutos + ' hs'} />
            </div>
            <div className='flex lg:w-1/2'>
              <ReserveData label='Sucursal' data={data.branch.name} />
              <ReserveData label='Id de la reserva' data={data.id} />
            </div>
          </div>
          <div className='w-1/6 flex justify-center sm:justify-end items-center'>
            <Dropdown reserveId={data._id} view={'user'} refetchFunc={refetchFunc} />
          </div>
        </>
      )}
    </div>
  );
};

export default Reserve;
