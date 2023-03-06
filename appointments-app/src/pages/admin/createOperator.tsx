import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import AdminNavbar from '@/components/AdminNavbar';
import Modal from '@/components/Modal';
import rightCheckbox from '../../../public/icons/rightCheckbox.svg';
import wrongCheckbox from '../../../public/icons/wrongCheckbox.svg';
import { createOperator } from '@/services/operators';
import { getBranches } from '@/services/branches';
import openEye from '../../../public/icons/openEye.svg';

const CreateOperators = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [branch, setBranch] = useState('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState(0);
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [visibleOne, setVisibleOne] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const operator = await createOperator(name, email, dni, password, branch, phone);
      console.log(operator);
      setType(1);
      setOpen(true);
    } catch (e) {
      console.log(e)
      setType(3);
      setOpen(true);
    }
  };

  useEffect(() => {
    const func = async () => {
      const branches = await getBranches();
      setBranches(branches);
    };
    func();
  }, []);

  return (
    <div className='h-screen bg-cruceBackground'>
      <AdminNavbar />
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Creación de operadores</p>
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
                  defaultValue=''
                  required
                  onChange={e => {
                    setBranch(e.target.value);
                  }}
                >
                  {branches?.map(branchOffice => (
                    <option value={branchOffice.name} key={branchOffice._id}>
                      {branchOffice.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
                    <button
                      type='button'
                      className='h-5 w-5 object-cover'
                      onClick={() => setVisibleOne(!visibleOne)}
                    >
                      <Image
                        src={openEye}
                        alt='ojito'
                        className='w-4 h-4'
                      ></Image>
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
                    <button
                      type='button'
                      className='h-5 w-5 object-cover'
                      onClick={() => setVisibleTwo(!visibleTwo)}
                    >
                      <Image
                        src={openEye}
                        alt='ojito'
                        className='w-4 h-4'
                      ></Image>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex mt-4'>
              {name && email && dni && branch && password && repeatPassword && password === repeatPassword && password.length >= 8 ? (
                <button
                  type='submit'
                  className=' bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'
                  onClick={() => {}}
                >
                  Enviar
                </button>
              ) : (
                <button
                  type='submit'
                  className=' bg-grey3 text-grey6 font-semibold text-lb rounded-lg h-11 w-full'
                  onClick={() => {}}
                  disabled
                >
                  Enviar
                </button>
              )}
            </div>
          </form>
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className='flex flex-col items-center'>
              {type === 1 ? (
                <>
                  <Image
                    src={rightCheckbox}
                    alt='success'
                    className='w-10 h-10 mb-7'
                  />
                  <h1 className='text-ln font-bold'>
                    Operador creado con éxito
                  </h1>
                </>
              ) : type === 2 ? (
                <>
                  <Image
                    src={wrongCheckbox}
                    alt='error'
                    className='w-10 h-10 mb-7'
                  />
                  <h1 className='text-ln font-bold'>Algo salió mal</h1>
                  <p className='text-sm font-normal mt-1'>
                    Ha ocurrido un error al crear el operador. Inténtelo más
                    tarde
                  </p>
                </>
              ) : type === 3 ? (
                <>
                  <Image
                    src={wrongCheckbox}
                    alt='error'
                    className='w-10 h-10 mb-7'
                  />
                  <h1 className='text-ln font-bold'>Ha ocurrido un error</h1>
                  <p className='text-sm font-normal mt-1'>
                    Ya existe un operador registrado con este correo electrónico 
                  </p>
                </>
              ) : null}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateOperators;
