import React from 'react';
import Image from 'next/image';
import misReservasIcon from '../../public/icons/misReservas.svg';
import miCuentaIcon from '../../public/icons/miCuenta.svg';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='flex justify-center shadow-navbar bg-white'>
      <nav className='flex flex-row justify-between w-11/12 md:max-w-screen-2xl h-20 items-center'>
        <Link href={'reservePanel'} className='w-36 h-11'>
          <button className='bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-36 h-11'>
            Reservar
          </button>
        </Link>
        <div className='flex justify-between'>
          <Link href={'reserves'} className='mr-8'>
            <button className='text-ss font-bold flex hover:text-cruceHover'>
              Mis Reservas
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mis reservas'
                src={misReservasIcon}
              ></Image>
            </button>
          </Link>
          <Link href={'myData'}>
            <button className='text-ss font-bold flex hover:text-cruceHover'>
              Mi Cuenta
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mi cuenta'
                src={miCuentaIcon}
              ></Image>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
