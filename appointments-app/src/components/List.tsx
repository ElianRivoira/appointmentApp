import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  branch?: Branch;
  user?: User;
}

const List: React.FC<Props> = ({ branch, user }) => {
  const [activeLink, setActiveLink] = useState('');

  const router = useRouter();
  useEffect(() => {
    setActiveLink(router.pathname);
  }, []);

  return (
    <div className='flex mb-4 border-2 rounded-xl p-6'>
      <div className='w-5/6 flex py-1.5'>
        {activeLink === '/admin/branches' ? (
          <>
            <div className='flex flex-col flex-1'>
              <div className='text-xs mb-1'>Nombre</div>
              <div className='text-sm font-semibold'>{branch?.name}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs mb-1'>Mail</div>
              <div className='text-sm font-semibold'>{branch?.email}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs mb-1'>Capacidad máxima</div>
              <div className='text-sm font-semibold'>{branch?.capacity}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs mb-1'>Horario de Inicio y Cierre</div>
              <div className='text-sm font-semibold'>
                {branch?.openHour + ' - ' + branch?.closeHour + ' hs'}
              </div>
            </div>
          </>
        ) : activeLink === '/admin/operators' ? (
          <>
            <div className='flex flex-col flex-1'>
              <div className='text-xs mb-1'>Nombre</div>
              <div className='text-sm font-semibold'>{user?.name}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs mb-1'>Mail</div>
              <div className='text-sm font-semibold'>{user?.email}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs mb-1'>Sucursal</div>
              <div className='text-sm font-semibold'>{user?.branch?.name}</div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='text-xs mb-1'>Teléfono</div>
              <div className='text-sm font-semibold'>{user?.phone ? user.phone : 'No ha registrado su teléfono'}</div>
            </div>
          </>
        ) : null}
      </div>
      <div className='w-1/6 flex justify-end'>
        <button
          className={`bg-grey1 hover:bg-grey2 text-cruce font-semibold text-ls rounded-lg h-12 w-[88px] flex justify-center items-center active:shadow-active`}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default List;
