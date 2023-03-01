import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import misReservasIcon from '../../public/icons/misReservas.svg';
import misReservasIconActivo from '../../public/icons/misReservasActivo.svg';
import miCuentaIcon from '../../public/icons/miCuenta.svg';
import miCuentaIconActivo from '../../public/icons/miCuentaActivo.svg';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const router = useRouter();

  useEffect(() => {
    setActiveLink(router.pathname);
  }, []);
  
  return (
    <div className='flex justify-center shadow-navbar bg-white'>
      <nav className='flex flex-row justify-end w-11/12 md:max-w-screen-2xl h-20 items-center'>
        <div className='flex justify-between'>
          <Link href={'/reserves'} className='mr-8'>
            <button className={`text-ss font-bold flex hover:text-cruceHover ${ activeLink === '/operator/reserves' ? 'text-cruce' : null }`}>
              Reservas
              <Image
                className='w-4 h-3.5 ml-1'
                alt='reservas'
                src={activeLink === '/operator/reserves' ? misReservasIconActivo : misReservasIcon}
              ></Image>
            </button>
          </Link>
          <Link href={'/myData'}>
            <button className={`text-ss font-bold flex hover:text-cruceHover ${ activeLink === '/operator/myData' ? 'text-cruce' : null }`}>
              Mi Cuenta
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mi cuenta'
                src={activeLink === '/operator/myData' ? miCuentaIconActivo : miCuentaIcon}
              ></Image>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
