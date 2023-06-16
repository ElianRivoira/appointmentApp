import Image from 'next/image';
import React, { useState } from 'react';

import openEye from '@/assets/icons/openEye.svg';

interface OperatorFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  branches: Branch[] | undefined;
  branch: string;
  setBranch: (state: string) => void;
  name: string;
  setName: (state: string) => void;
  phone: number;
  setPhone: (state: number) => void;
  email: string;
  setEmail: (state: string) => void;
  dni: number;
  setDni: (state: number) => void;
  password: string;
  setPassword: (state: string) => void;
  edit: boolean;
}

const OperatorsForm: React.FC<OperatorFormProps> = ({
  handleSubmit,
  branches,
  branch,
  setBranch,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  dni,
  setDni,
  password,
  setPassword,
  edit,
}) => {
  const [visibleOne, setVisibleOne] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='username' className='text-sm font-medium'>
        Nombre
      </label>
      <input
        type='text'
        name='username'
        id='username'
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
      />
      <label htmlFor='email' className='text-sm font-medium'>
        Correo electrónico
      </label>
      <input
        type='email'
        name='email'
        id='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
      />
      <label htmlFor='phone' className='text-sm font-medium'>
        Teléfono
      </label>
      <input
        type='tel'
        name='phone'
        id='phone'
        value={phone}
        onChange={e => setPhone(Number(e.target.value))}
        required
        className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
      />
      <div className='flex mb-3'>
        <div className='w-1/2 mr-4'>
          <label htmlFor='dni' className='text-sm font-medium'>
            DNI
          </label>
          <input
            type='tel'
            name='dni'
            id='dni'
            value={dni}
            onChange={e => setDni(Number(e.target.value))}
            required
            className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
          />
        </div>
        <div className='w-1/2'>
          <label htmlFor='phone' className='text-sm font-medium'>
            Sucursal
          </label>
          <select
            name='branch'
            id='branch'
            className='w-full rounded-lg text-sm font-semibold h-11 p-3 border border-grey3 hover:border-grey5 focus:border-cruce outline-none'
            value={branch}
            required
            onChange={e => {
              setBranch(e.target.value);
            }}
          >
            {branches?.map(branchOffice => (
              <option value={branchOffice.name} key={branchOffice._id} hidden={branchOffice.name === ''}>
                {branchOffice.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!edit ? (
        <>
          <div className='flex mb-3'>
            <div className='w-1/2 mr-4'>
              <label htmlFor='password' className='text-sm font-medium'>
                Contraseña
              </label>
              <div className='relative'>
                <input
                  type={visibleOne ? 'text' : 'password'}
                  name='password'
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
                <div className='absolute inset-y-0 right-2 pl-3 flex items-center'>
                  <button type='button' className='h-5 w-5 object-cover' onClick={() => setVisibleOne(!visibleOne)}>
                    <Image src={openEye} alt='ojito' className='w-4 h-4'></Image>
                  </button>
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              <label htmlFor='password2' className='text-sm font-medium'>
                Repetir Contraseña
              </label>
              <div className='relative'>
                <input
                  type={visibleTwo ? 'text' : 'password'}
                  name='password2'
                  id='password2'
                  value={repeatPassword}
                  onChange={e => setRepeatPassword(e.target.value)}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
                <div className='absolute inset-y-0 right-2 pl-3 flex items-center'>
                  <button type='button' className='h-5 w-5 object-cover' onClick={() => setVisibleTwo(!visibleTwo)}>
                    <Image src={openEye} alt='ojito' className='w-4 h-4'></Image>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex mt-4'>
            {name &&
            email &&
            dni &&
            branch &&
            password &&
            repeatPassword &&
            password === repeatPassword &&
            password.length >= 8 ? (
              <button
                type='submit'
                className=' bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'
              >
                Enviar
              </button>
            ) : (
              <button
                type='submit'
                className='bg-grey3 text-grey6 font-semibold text-lb rounded-lg h-11 w-full'
                disabled
              >
                Enviar
              </button>
            )}
          </div>
        </>
      ) : (
        <div className='flex mt-4'>
          {name && email && dni && branch ? (
            <button
              type='submit'
              className=' bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'
            >
              Enviar
            </button>
          ) : (
            <button type='submit' className='bg-grey3 text-grey6 font-semibold text-lb rounded-lg h-11 w-full' disabled>
              Enviar
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default OperatorsForm;
