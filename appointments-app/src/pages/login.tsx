import React from 'react';
import Image from 'next/image';
import misReservasIcon from '../../public/icons/misReservas.svg';
import miCuentaIcon from '../../public/icons/miCuenta.svg';

const login = () => {
  return (
    <div className='h-screen'>
      <div className='flex justify-center shadow-navbar'>
        <nav className='flex flex-row justify-between w-11/12 md:max-w-screen-lg h-20 items-center'>
          <button className='bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-36 h-11'>
            Reservar
          </button>
          <div className='flex justify-between'>
            <button className='mr-8 text-ss font-bold flex hover:text-cruceHover'>
              Mis Reservas
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mis reservas'
                src={misReservasIcon}
              ></Image>
            </button>
            <button className='text-ss font-bold flex hover:text-cruceHover'>
              Mi Cuenta
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mi cuenta'
                src={miCuentaIcon}
              ></Image>
            </button>
          </div>
        </nav>
      </div>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-sm h-3/5 mt-12 px-8 pt-10 pb-8 border rounded-xl shadow-xg'>
          <p className='text-center mb-8 font-bold text-2xl'>
            Iniciar Sesión
          </p>
          <form>
            <label htmlFor='username' className='text-sm font-medium'>
              Usuario
            </label>
            <input
              type='text'
              name='username'
              id='username'
              className='w-full border border-solid border-grey-500 focus:border-cruce rounded-md h-10 mb-3 outline-none'
            />
            <label htmlFor='password' className='text-sm font-medium'>
              Contraseña
            </label>
            <input
              type='password'
              name='password'
              id='password'
              className='w-full border border-solid border-grey-500 focus:border-cruce rounded-md h-10 mb-6 outline-none'
            />
            <div className='flex justify-center'>
              <button className='font-bold text-ss mb-5 text-cruce hover:text-cruceHover'>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className='flex flex-col justify-center'>
              <button className='mb-5 bg-cruce text-white h-11 rounded-lg font-semibold text-lb hover:bg-cruceHover'>
                Ingresar
              </button>
              <hr />
              <button className='mt-5 bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg h-11'>
                ¿No tenés cuenta? Registrate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
