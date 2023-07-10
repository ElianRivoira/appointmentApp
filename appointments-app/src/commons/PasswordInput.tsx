import React, { useState } from 'react';
import Image from 'next/image';

import openEye from '@/assets/icons/openEye.svg';

interface PasswordInputProps {
  label: string;
  name: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, name, id, value, onChange, required }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <label htmlFor={id} className='text-sm font-medium'>
        {label}
      </label>
      <div className='relative'>
        <input
          type={visible ? 'text' : 'password'}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 outline-none p-3'
        />
        <div className='absolute inset-y-0 right-2 pl-3 flex items-center'>
          <button type='button' className='h-5 w-5 object-cover' onClick={() => setVisible(!visible)}>
            <Image src={openEye} alt='ojito' className='w-4 h-4'></Image>
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
