import React from 'react';

import Dropdown from '@/commons/Dropdown';

interface Props {
  data: reserveUser;
  operatorView: boolean;
}

const Reserve: React.FC<Props> = ({ data, operatorView }) => {
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
              <div className='text-sm font-semibold'>
                {fecha + ',' + hora + ':' + minutos + ' hs'}
              </div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>Día de la reserva</div>
              <div className='text-sm font-semibold'>
                {new Date(data.creationDate).toLocaleString().split(',')[0]}
              </div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>N° de la reserva</div>
              <div className='text-sm font-semibold'>{data.id}</div>
            </div>
          </div>
          <div className='w-1/6 flex justify-end'>
            <Dropdown reserveId={data._id} view={'operator'} />
          </div>
        </>
      ) : (
        <>
          <div className='w-5/6 flex py-1.5'>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>
                {operatorView ? 'operator' : 'Nombre y apellido'}
              </div>
              <div className='text-sm font-semibold'>{data.name}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs'>Reserva</div>
              <div className='text-sm font-semibold'>
                {fecha + ',' + hora + ':' + minutos + ' hs'}
              </div>
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
            <Dropdown reserveId={data._id} view={'user'} />
          </div>
        </>
      )}
    </div>
  );
};

export default Reserve;
