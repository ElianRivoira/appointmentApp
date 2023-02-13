import Navbar from '@/components/Navbar';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const myData = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const handleSubmit = (e: React.FormEvent) => {}
  const handleUsername = (e: React.FormEvent) => {}



  return (
    <div className='h-screen bg-cruceBackground'>
      <Navbar />
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Mis Datos</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username' className='text-sm font-medium'>
              Usuario
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={user?.name}
              onChange={handleUsername}
              required
              className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
            />
            <label htmlFor='email' className='text-sm font-medium'>
              Mail
            </label>
            <input
              type='text'
              name='email'
              id='email'
              value={user?.email}
              onChange={handleUsername}
              required
              className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
            />
            <div className='flex mb-3'>
              <div className='w-1/2 mr-4'>
                <label htmlFor='dni' className='text-sm font-medium'>
                  DNI
                </label>
                <input
                  type='text'
                  name='dni'
                  id='dni'
                  value={user?.dni}
                  onChange={handleUsername}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
              <div className='w-1/2'>
                <label htmlFor='phone' className='text-sm font-medium'>
                  Teléfono
                </label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  value={user?.phone}
                  onChange={handleUsername}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
            </div>
            <div className='flex justify-start'>
              <button className='font-bold text-ss text-cruce hover:text-cruceHover'>
                Editar contraseña
              </button>
            </div>
            <div className='flex mt-4'>
              <button className=' bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'>
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default myData;
