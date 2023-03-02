import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import misReservasIcon from '../../public/icons/misReservas.svg';
import miCuentaIcon from '../../public/icons/miCuenta.svg';
import misReservasIconActivo from '../../public/icons/misReservasActivo.svg';
import miCuentaIconActivo from '../../public/icons/miCuentaActivo.svg';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const router = useRouter();

  useEffect(() => {
    setActiveLink(router.pathname);
  }, []);

  return (
    <div className='flex justify-center shadow-navbar bg-white'>
      <nav className='flex flex-row justify-between w-11/12 md:max-w-screen-2xl h-20 items-center'>
        <Link href={'/reservePanel'} className='w-36 h-11'>
          <button className='active:shadow-active bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-36 h-11'>
            Reservar
          </button>
        </Link>
        <div className='flex justify-between'>
          <Link href={'/reserves'} className='mr-8'>
            <button className={`text-ss font-bold flex hover:text-cruceHover ${ activeLink === '/reserves' ? 'text-cruce' : null }`}>
              Mis Reservas
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mis reservas'
                src={activeLink === '/reserves' ? misReservasIconActivo : misReservasIcon}
              ></Image>
            </button>
          </Link>
          <Link href={'/myData'}>
            <button className={`text-ss font-bold flex hover:text-cruceHover ${ activeLink === '/myData' ? 'text-cruce' : null }`}>
              Mi Cuenta
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mi cuenta'
                src={activeLink === '/myData' ? miCuentaIconActivo : miCuentaIcon}
              ></Image>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
