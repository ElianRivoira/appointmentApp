import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import miCuentaIcon from '../../public/icons/miCuenta.svg';
import sucursal from '../../public/icons/sucursal.svg';
import sucursalActiva from '../../public/icons/sucursalActiva.svg';
import operadorActivo from '../../public/icons/operadorActivo.svg';
import reporteActivo from '../../public/icons/reporteActivo.svg';
import miCuentaActivo from '../../public/icons/miCuentaActivo.svg';
import operadores from '../../public/icons/operadores.svg';
import reportes from '../../public/icons/reportes.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminNavbar = () => {
  const [activeLink, setActiveLink] = useState('');

  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
    setActiveLink(router.pathname);
  }, []);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className='flex justify-center shadow-navbar bg-white'>
      <nav className='flex flex-row justify-between w-11/12 md:max-w-screen-2xl h-20 items-center'>
        <div className='flex'>
          <Link href={'/admin/createBranch'} className='w-36 h-11 mr-3.5'>
            <button className='active:shadow-active bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-36 h-11'>
              Crear Sucursal
            </button>
          </Link>
          <Link href={'/admin/operators/create'} className='w-36 h-11'>
            <button className='active:shadow-active bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-36 h-11'>
              Crear Operador
            </button>
          </Link>
        </div>
        <div className='flex justify-between'>
          <Link href={'/sucursales'} className='mr-8'>
            <button
              className={`text-ss font-bold flex hover:text-cruceHover ${
                activeLink === '/sucursales' ? 'text-cruce' : ''
              }`}
            >
              Sucursales
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mis reservas'
                src={activeLink === '/sucursales' ? sucursalActiva : sucursal}
              ></Image>
            </button>
          </Link>
          <Link href={'/admin'} className='mr-8'>
            <button
              className={`text-ss font-bold flex hover:text-cruceHover ${
                activeLink === 'operadores' ? 'text-cruce' : ''
              }`}
              onClick={() => handleLinkClick('operadores')}
            >
              Operadores
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mis reservas'
                src={activeLink === 'operadores' ? operadorActivo : operadores}
              ></Image>
            </button>
          </Link>
          <Link href={'/admin'} className='mr-8'>
            <button
              className={`text-ss font-bold flex hover:text-cruceHover ${
                activeLink === 'reportes' ? 'text-cruce' : ''
              }`}
              onClick={() => handleLinkClick('reportes')}
            >
              Reportes
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mis reservas'
                src={activeLink === 'reportes' ? reporteActivo : reportes}
              ></Image>
            </button>
          </Link>
          <Link href={'/admin'}>
            <button
              className={`text-ss font-bold flex hover:text-cruceHover ${
                activeLink === 'miCuenta' ? 'text-cruce' : ''
              }`}
              onClick={() => handleLinkClick('miCuenta')}
            >
              Mi Cuenta
              <Image
                className='w-4 h-3.5 ml-1'
                alt='mi cuenta'
                src={activeLink === 'miCuenta' ? miCuentaActivo : miCuentaIcon}
              ></Image>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
