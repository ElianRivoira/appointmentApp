import Image from 'next/image';
import React from 'react';

import x from '@/assets/icons/x.svg';
import MenuOption from './MenuOption';
import reservasIcon from '@/assets/icons/misReservas.svg';
import logout from '@/assets/icons/logout-white.svg';
import miCuentaIcon from '@/assets/icons/miCuenta.svg';

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  handleLogout: () => void;
  type: string;
}

const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen, handleLogout, type }) => {
  return (
    <>
      {isOpen ? (
        <button
          className='fixed w-full h-full inset-0 cursor-default bg-black/[.75] z-30'
          onClick={() => setIsOpen(false)}
        ></button>
      ) : null}
      <nav
        className={`fixed flex flex-col justify-between px-4 pt-2.5 pb-6 right-0 top-0 w-64 h-full bg-background z-40 transition-transform duration-300 ease-in-out transform bg-white ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className='flex justify-end items-center mb-5'>
            <Image src={x} alt='aidam' className='h-6 w-6 cursor-pointer' onClick={() => setIsOpen(false)} />
          </div>
          <hr className='w-full border-black03' />
          <ul className='flex flex-col'>
            {type === 'user' ? (
              <>
                <MenuOption href='/reserves' logo={reservasIcon} setIsOpen={setIsOpen}>
                  Mis Reservas
                </MenuOption>
                <MenuOption href='/myData' logo={miCuentaIcon} setIsOpen={setIsOpen}>
                  Mi Cuenta
                </MenuOption>
              </>
            ) : type === 'operator' ? (
              <>
                <MenuOption href='/operator/reserves' logo={reservasIcon} setIsOpen={setIsOpen}>
                  Reservas
                </MenuOption>
                <MenuOption href='/operator/myData' logo={miCuentaIcon} setIsOpen={setIsOpen}>
                  Mi Cuenta
                </MenuOption>
              </>
            ) : null}
          </ul>
        </div>
        <div className='flex px-4 w-full justify-center'>
          <button
            className='flex bg-error hover:bg-errorHover w-full text-white h-8 items-center justify-center rounded-lg text-sm'
            onClick={handleLogout}
          >
            <Image src={logout} alt='logout' className='mr-1' />
            Cerrar Sesión
          </button>
        </div>
      </nav>
    </>
  );
};

export default Menu;
