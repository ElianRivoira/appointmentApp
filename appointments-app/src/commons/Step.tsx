import React from 'react';
import Image from 'next/image';
import check from '@/assets/icons/check.svg';
import error from '@/assets/icons/error.svg';

interface stepValue {
  icon: string;
  text: string;
  bgColor?: string;
  textColor?: string;
}

const Step: React.FC<stepValue> = ({ icon, text, bgColor, textColor }) => {
  return (
    <div className='flex flex-col w-2/6'>
      {icon === 'check' ? (
        <>
          <div className='flex items-center justify-center'>
            <hr className='w-5/12 h-0.5 border-none bg-exito' />
            <Image alt='check' src={check} className='w-8 h-8' />
            <hr className='w-5/12 h-0.5 border-none bg-exito' />
          </div>
          <p
            className='block text-center text-sb font-normal mt-2 h-12 text-exito'
          >
            {text}
          </p>
        </>
      ) : icon === 'error' ? (
        <>
          <div className='flex items-center justify-center'>
            <hr className='w-5/12 h-0.5 border-none bg-error' />
            <Image alt='error' src={error} className='w-8 h-8' />
            <hr className='w-5/12 h-0.5 border-none bg-error' />
          </div>
          <p
            className='block text-center text-sb font-normal mt-2 h-12 text-error'
          >
            {text}
          </p>
        </>
      ) : (
        <>
          <div className='flex items-center justify-center'>
            <hr className={`w-5/12 h-0.5 border-none ${bgColor}`} />
            <div
              className={`w-8 h-8 text-center border rounded-lg ${bgColor} text-white font-semibold text-sb p-1.5 pt-1`}
            >
              {icon}
            </div>
            <hr className={`w-5/12 h-0.5 border-none ${bgColor}`} />
          </div>
          <p
            className={`block text-center text-sb font-normal mt-2 ${textColor} h-12`}
          >
            {text}
          </p>
        </>
      )}
    </div>
  );
};

export default Step;
