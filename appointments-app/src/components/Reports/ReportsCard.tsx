import React from 'react';
import Image from 'next/image';

interface Props {
  children: React.ReactNode;
  svgIcon: any;
  dataNumber: number | undefined;
}

const ReportsCard: React.FC<Props> = ({children, svgIcon, dataNumber}) => {
  return (
    <div className='w-1/3 h-[166px]'>
      <div className='w-full h-[125px] p-5 bg-cruceHover rounded-t-lg flex'>
        <div className='w-2/3'>
          <p className='text-4.5xl font-bold text-white'>{dataNumber ? dataNumber : 0}</p>
          <p className='text-lm font-semibold text-white mt-2'>
            {children}
          </p>
        </div>
        <div className='w-1/3 flex justify-end'>
          <Image src={svgIcon} alt='icon' />
        </div>
      </div>
      <div className='w-full h-10 bg-cruce rounded-b-lg'></div>
    </div>
  );
};

export default ReportsCard;
