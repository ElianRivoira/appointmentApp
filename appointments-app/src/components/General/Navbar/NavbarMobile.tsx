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
import { getLoggedUser } from '@/services/users';
import Modal from '../../../commons/Modal';
import { checkLocalStorage } from '@/utils/localStorage';
import Menu from './Menu';
import hamburMenu from '@/assets/icons/hamburMenu.svg';
import { checkPathname } from '@/utils/checkPathname';

const NavbarMobile = () => {
  const router = useRouter();
  const [cookieError, setCookieError] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const loggedUser = useQuery({
    queryKey: ['loggedUser'],
    retry: 1,
    enabled: checkPathname(router.pathname),
    queryFn: getLoggedUser,
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
      setCookieError(true);
    },
  });

  const handleLogout = () => {
    // deleteCookie('session');
    if (typeof window !== 'undefined') localStorage.removeItem('session');
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
      {checkPathname(router.pathname) && (
        <div className='fixed z-20 top-0 right-0 w-full flex justify-center h-20 shadow-navbar bg-white'>
          <nav className='flex flex-row justify-between w-11/12 md:max-w-screen-2xl h-20 items-center'>
            {loggedUser.data?.role === 'user' ? (
              <>
                <Link href={'/reservePanel'} className='w-36 h-11'>
                  <button className='active:shadow-active bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-36 h-11'>
                    Reservar
                  </button>
                </Link>
                <button onClick={() => setIsOpen(true)}>
                  <Image src={hamburMenu} alt='menu' />
                </button>
                <Menu isOpen={isOpen} setIsOpen={setIsOpen} handleLogout={handleLogout} type='user' />
              </>
            ) : loggedUser.data?.role === 'operator' ? (
              <div className='flex justify-end w-full'>
                <div className='flex justify-between'>
                  <Menu isOpen={isOpen} setIsOpen={setIsOpen} handleLogout={handleLogout} type='operator' />
                  {/* {checkLocalStorage('session') ? (
                    <button className={`text-ss font-bold flex hover:text-cruceHover ml-8`} onClick={handleLogout}>
                      Cerrar Sesión
                      <Image className='w-4 h-4 ml-1' alt='logout' src={logoutIcon}></Image>
                    </button>
                  ) : null} */}
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

export default NavbarMobile;
