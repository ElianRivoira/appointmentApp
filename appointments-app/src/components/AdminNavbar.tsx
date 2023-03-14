import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import miCuentaIcon from '../../public/icons/miCuenta.svg';
import sucursal from '../../public/icons/sucursal.svg';
import sucursalActiva from '../../public/icons/sucursalActiva.svg';
import operadorActivo from '../../public/icons/operadorActivo.svg';
import reporteActivo from '../../public/icons/reporteActivo.svg';
import miCuentaActivo from '../../public/icons/miCuentaActivo.svg';
import operadores from '../../public/icons/operadores.svg';
import reportes from '../../public/icons/reportes.svg';
import logoutIcon from '../../public/icons/logout.svg';

const AdminNavbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    setActiveLink(router.pathname);
    const t = localStorage.getItem('token')
    if (t) setToken(t)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push({
      pathname: '/login'
    })
  }

  return (
    <div className='flex justify-center shadow-navbar bg-white'>
      <nav className='flex flex-row justify-between w-11/12 md:max-w-screen-2xl h-20 items-center'>
        <div className='flex'>
          <Link href={'/admin/branches/create'} className='w-36 h-11 mr-3.5'>
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
        <div className='flex justify-between items-center'>
          <Link href={'/admin/branches'} className='mr-8'>
            <button
              className={`text-ss font-bold flex hover:text-cruceHover ${
                activeLink === '/admin/branches' ? 'text-cruce' : ''
              }`}
            >
              Sucursales
              <Image
                className='w-4 h-3.5 ml-1'
                alt='branches'
                src={activeLink === '/admin/branches' ? sucursalActiva : sucursal}
              ></Image>
            </button>
          </Link>
          <Link href={'/admin/operators'} className='mr-8'>
            <button
              className={`text-ss font-bold flex hover:text-cruceHover ${
                activeLink === '/admin/operators' ? 'text-cruce' : ''
              }`}
            >
              Operadores
              <Image
                className='w-4 h-3.5 ml-1'
                alt='operators'
                src={activeLink === '/admin/operators' ? operadorActivo : operadores}
              ></Image>
            </button>
          </Link>
          <Link href={'/admin/reports'} className='mr-8'>
            <button
              className={`text-ss font-bold flex hover:text-cruceHover ${
                activeLink === '/admin/reports' ? 'text-cruce' : ''
              }`}
            >
              Reportes
              <Image
                className='w-4 h-3.5 ml-1'
                alt='reports'
                src={activeLink === '/admin/reports' ? reporteActivo : reportes}
              ></Image>
            </button>
          </Link>
          <Link href={'/admin/myData'}>
            <button
              className={`text-ss font-bold flex hover:text-cruceHover ${
                activeLink === '/admin/myData' ? 'text-cruce' : ''
              }`}
            >
              Mi Cuenta
              <Image
                className='w-4 h-3.5 ml-1'
                alt='my account'
                src={activeLink === '/admin/myData' ? miCuentaActivo : miCuentaIcon}
              ></Image>
            </button>
          </Link>
          {token ? (
            <button className={`text-ss font-bold flex hover:text-cruceHover ml-8`} onClick={handleLogout}>
              Cerrar Sesión
              <Image
                className='w-4 h-4 ml-1'
                alt='logout'
                src={logoutIcon}
              ></Image>
            </button>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
