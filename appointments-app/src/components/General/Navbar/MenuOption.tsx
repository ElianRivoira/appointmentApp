import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import rightArrow from '@/assets/icons/rightArrow.svg';

interface MenuProps {
  children?: React.ReactNode;
  href?: string;
  logo?: any;
  setIsOpen: (x: boolean) => void;
}

const MenuOption: React.FC<MenuProps> = ({ children, href, logo, setIsOpen }) => {
  return (
    <li className='block' onClick={() => setIsOpen(false)}>
      <Link
        href={href ? href : ''}
        className={`flex h-16 font-semibold items-center text-xg text-black hover:bg-cruceHover rounded`}
      >
        <div className='filter hover:invert flex justify-between w-full h-full px-3'>
          <div className='flex items-center'>
            {logo ? <Image src={logo} alt='logo' className='mr-2.5 ' /> : null}
            {children}
          </div>
          <Image src={rightArrow} alt='link' />
        </div>
      </Link>
    </li>
  );
};

export default MenuOption;
