import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getBranch, updateBranch } from '@/services/branches';

const editBranch = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [phone, setPhone] = useState(0);
  const [openHour, setOpenHour] = useState('');
  const [closeHour, setCloseHour] = useState('');
  const [thisBranch, setThisBranch] = useState<Branch>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (thisBranch) {
      updateBranch({
        id: thisBranch._id,
        name,
        email,
        capacity,
        phone,
        openHour,
        closeHour,
      });
    }
    return;
  };

  useEffect(() => {
    let idBranch = router.query.id;
    const branch = async () => {
      if (typeof idBranch === 'string') {
        let branch = await getBranch(idBranch);
        setThisBranch(branch);
      }
    };
    branch();
  }, []);

  useEffect(() => {
    if (thisBranch) {
      setName(thisBranch.name);
      setEmail(thisBranch.email);
      setCapacity(thisBranch.capacity);
      setPhone(thisBranch.phone);
      setOpenHour(thisBranch.openHour);
      setCloseHour(thisBranch.closeHour);
    }
  }, [thisBranch]);

  return (
    <div className='h-screen bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Editar sucursal</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username' className='text-sm font-medium'>
              Nombre
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
            />
            <label htmlFor='email' className='text-sm font-medium'>
              Correo electrónico
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
            />
            <div className='flex mb-3'>
              <div className='w-1/2 mr-4'>
                <label htmlFor='phone' className='text-sm font-medium'>
                  Teléfono
                </label>
                <input
                  type='tel'
                  name='phone'
                  id='phone'
                  value={phone}
                  onChange={(e) => setPhone(Number(e.target.value))}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
              <div className='w-1/2'>
                <label htmlFor='capacity' className='text-sm font-medium'>
                  Capacidad máxima
                </label>
                <input
                  type='number'
                  name='capacity'
                  id='capacity'
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
            </div>
            <div className='flex mb-3'>
              <div className='w-1/2 mr-4'>
                <label htmlFor='openHour' className='text-sm font-medium'>
                  Horario de Inicio
                </label>
                <input
                  type='string'
                  name='openHour'
                  id='openHour'
                  value={openHour}
                  pattern='^(?:[0-5][0-9]):[0-5][0-9]$'
                  onChange={(e) => setOpenHour(e.target.value)}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
              <div className='w-1/2'>
                <label htmlFor='closeHour' className='text-sm font-medium'>
                  Horario de Cierre
                </label>
                <input
                  type='string'
                  name='closeHour'
                  id='closeHour'
                  value={closeHour}
                  pattern='^(?:[0-5][0-9]):[0-5][0-9]$'
                  onChange={(e) => setCloseHour(e.target.value)}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
            </div>

            <div className='flex mt-4'>
              <button
                type='submit'
                className=' bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'
                onClick={() => {}}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default editBranch;
