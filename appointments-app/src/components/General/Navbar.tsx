import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { hasCookie, deleteCookie } from 'cookies-next';
import { useQuery } from '@tanstack/react-query';

import misReservasIcon from '@/assets/icons/misReservas.svg';
import miCuentaIcon from '@/assets/icons/miCuenta.svg';
import misReservasIconActivo from '@/assets/icons/misReservasActivo.svg';
import miCuentaIconActivo from '@/assets/icons/miCuentaActivo.svg';
import logoutIcon from '@/assets/icons/logOut.svg';
import sucursal from '@/assets/icons/sucursal.svg';
import sucursalActiva from '@/assets/icons/sucursalActiva.svg';
import operadorActivo from '@/assets/icons/operadorActivo.svg';
import reporteActivo from '@/assets/icons/reporteActivo.svg';
import operadores from '@/assets/icons/operadores.svg';
import reportes from '@/assets/icons/reportes.svg';
import { getLoggedUser } from '@/services/users';
import Modal from '../../commons/Modal';

const Navbar = () => {
  const router = useRouter();
  const [cookieError, setCookieError] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);

  const loggedUser = useQuery({
    queryKey: ['loggedUser'],
    retry: 1,
    enabled: router.pathname !== '/login' && router.pathname !== '/register',
    queryFn: getLoggedUser,
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
      setCookieError(true);
    },
  });

  const handleLogout = () => {
    deleteCookie('session');
    router.push({
      pathname: '/login',
    });
  };

  useEffect(() => {
    if (!open && type === 2 && cookieError)
      router.push({
        pathname: '/login',
      });
  }, [open]);

  return (
    <>
      {router.pathname !== '/login' && router.pathname !== '/register' && router.pathname !== '/' && (
        <div className='fixed z-20 top-0 right-0 w-full flex justify-center h-20 shadow-navbar bg-white'>
          <nav className='flex flex-row justify-between w-11/12 md:max-w-screen-2xl h-20 items-center'>
            {loggedUser.data?.role === 'user' ? (
              <>
                <Link href={'/reservePanel'} className='w-36 h-11'>
                  <button className='active:shadow-active bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-36 h-11'>
                    Reservar
                  </button>
                </Link>
                <div className='flex justify-between items-center'>
                  <Link href={'/reserves'} className='mr-8'>
                    <button
                      className={`text-ss font-bold flex hover:text-cruceHover ${
                        router.pathname === '/reserves' ? 'text-cruce' : null
                      }`}
                    >
                      Mis Reservas
                      <Image
                        className='w-4 h-3.5 ml-1'
                        alt='mis reservas'
                        src={router.pathname === '/reserves' ? misReservasIconActivo : misReservasIcon}
                      ></Image>
                    </button>
                  </Link>
                  <Link href={'/myData'}>
                    <button
                      className={`text-ss font-bold flex hover:text-cruceHover ${
                        router.pathname === '/myData' ? 'text-cruce' : null
                      }`}
                    >
                      Mi Cuenta
                      <Image
                        className='w-4 h-3.5 ml-1'
                        alt='mi cuenta'
                        src={router.pathname === '/myData' ? miCuentaIconActivo : miCuentaIcon}
                      ></Image>
                    </button>
                  </Link>
                  {hasCookie('session') ? (
                    <button className={`text-ss font-bold flex hover:text-cruceHover ml-8`} onClick={handleLogout}>
                      Cerrar Sesión
                      <Image className='w-4 h-4 ml-1' alt='logout' src={logoutIcon}></Image>
                    </button>
                  ) : null}
                </div>
              </>
            ) : loggedUser.data?.role === 'admin' ? (
              <>
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
                        router.pathname === '/admin/branches' ? 'text-cruce' : ''
                      }`}
                    >
                      Sucursales
                      <Image
                        className='w-4 h-3.5 ml-1'
                        alt='branches'
                        src={router.pathname === '/admin/branches' ? sucursalActiva : sucursal}
                      ></Image>
                    </button>
                  </Link>
                  <Link href={'/admin/operators'} className='mr-8'>
                    <button
                      className={`text-ss font-bold flex hover:text-cruceHover ${
                        router.pathname === '/admin/operators' ? 'text-cruce' : ''
                      }`}
                    >
                      Operadores
                      <Image
                        className='w-4 h-3.5 ml-1'
                        alt='operators'
                        src={router.pathname === '/admin/operators' ? operadorActivo : operadores}
                      ></Image>
                    </button>
                  </Link>
                  <Link href={'/admin/reports'} className='mr-8'>
                    <button
                      className={`text-ss font-bold flex hover:text-cruceHover ${
                        router.pathname === '/admin/reports' ? 'text-cruce' : ''
                      }`}
                    >
                      Reportes
                      <Image
                        className='w-4 h-3.5 ml-1'
                        alt='reports'
                        src={router.pathname === '/admin/reports' ? reporteActivo : reportes}
                      ></Image>
                    </button>
                  </Link>
                  <Link href={'/admin/myData'}>
                    <button
                      className={`text-ss font-bold flex hover:text-cruceHover ${
                        router.pathname === '/admin/myData' ? 'text-cruce' : ''
                      }`}
                    >
                      Mi Cuenta
                      <Image
                        className='w-4 h-3.5 ml-1'
                        alt='my account'
                        src={router.pathname === '/admin/myData' ? miCuentaIconActivo : miCuentaIcon}
                      ></Image>
                    </button>
                  </Link>
                  {hasCookie('session') ? (
                    <button className={`text-ss font-bold flex hover:text-cruceHover ml-8`} onClick={handleLogout}>
                      Cerrar Sesión
                      <Image className='w-4 h-4 ml-1' alt='logout' src={logoutIcon}></Image>
                    </button>
                  ) : null}
                </div>
              </>
            ) : loggedUser.data?.role === 'operator' ? (
              <div className='flex justify-end w-full'>
                <div className='flex justify-between'>
                  <Link href={'/operator/reserves'} className='mr-8'>
                    <button
                      className={`text-ss font-bold flex hover:text-cruceHover ${
                        router.pathname === '/operator/reserves' ? 'text-cruce' : null
                      }`}
                    >
                      Reservas
                      <Image
                        className='w-4 h-3.5 ml-1'
                        alt='reservas'
                        src={router.pathname === '/operator/reserves' ? misReservasIconActivo : misReservasIcon}
                      ></Image>
                    </button>
                  </Link>
                  <Link href={'/operator/myData'}>
                    <button
                      className={`text-ss font-bold flex hover:text-cruceHover ${
                        router.pathname === '/operator/myData' ? 'text-cruce' : null
                      }`}
                    >
                      Mi Cuenta
                      <Image
                        className='w-4 h-3.5 ml-1'
                        alt='mi cuenta'
                        src={router.pathname === '/operator/myData' ? miCuentaIconActivo : miCuentaIcon}
                      ></Image>
                    </button>
                  </Link>
                  {hasCookie('session') ? (
                    <button className={`text-ss font-bold flex hover:text-cruceHover ml-8`} onClick={handleLogout}>
                      Cerrar Sesión
                      <Image className='w-4 h-4 ml-1' alt='logout' src={logoutIcon}></Image>
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </nav>
        </div>
      )}
      <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
