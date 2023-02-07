import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import openEye from '../../public/icons/openEye.svg';
import flechitaIzq from '../../public/icons/flechitaIzq.svg';

const Register = () => {
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [visibleOne, setVisibleOne] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);
  const [mayus, setMayus] = useState(0);
  const [minus, setMinus] = useState(0);
  const [numb, setNumb] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const hasUppercase = (str: string) => {
      return /[A-Z]/.test(str);
    };
    const hasLowercase = (str: string) => {
      return /[a-z]/.test(str);
    };
    const hasNumber = (str: string) => {
      return /\d/.test(str);
    };
    const enoughLength = (str: string) => {
      return str.length >= 8;
    };
    if (password.length === 0) {
      setMayus(0);
      setMinus(0);
      setNumb(0);
      setLength(0);
    }
    if (password.length > 0) {
      if (hasUppercase(password)) {
        setMayus(2);
      } else {
        setMayus(1);
      }
      if (hasLowercase(password)) {
        setMinus(2);
      } else {
        setMinus(1);
      }
      if (hasNumber(password)) {
        setNumb(2);
      } else {
        setNumb(1);
      }
      if (enoughLength(password)) {
        setLength(2);
      } else {
        setLength(1);
      }
    }
  }, [password]);

  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleDni = (e: any) => {
    setDni(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handlePasswordTwo = (e: any) => {
    setPasswordTwo(e.target.value);
  };

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col p-8 w-3/4 max-w-screen-sm h-3/5 border-2 mt-20 rounded-xl shadow-xg'>
        <div className='flex w-full ml-5 text-cruce font-semibold'>
          <button className='flex'>
            <Image
              src={flechitaIzq}
              alt='flechitaIzq'
              className='w-4 h-4 mr-1'
            ></Image>
            <p className='flex -mt-1'>Atrás</p>
          </button>
        </div>
        <div className='flex justify-center mt-1'>
          <h3 className='font-semibold text-2xl mb-5'>Crear cuenta</h3>
        </div>

        <form>
          <div className='flex justify-center mb-3'>
            <div className='flex flex-col mr-4'>
              <label htmlFor='username'>Nombre y Apellido</label>
              <input
                onChange={handleName}
                type='text'
                id='username'
                value={name}
                className='pl-2 w-64 h-11 rounded-md border border-solid border-[#E1E1E1]'
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='dni '>DNI</label>
              <input
                onChange={handleDni}
                type='number'
                id='dni'
                value={dni}
                min='0'
                className='pl-2 w-64 h-11 rounded-md border border-solid border-[#E1E1E1]'
                required
              />
            </div>
          </div>
          <div className='flex flex-col ml-5 mb-3'>
            <label htmlFor='email'>Mail</label>
            <input
              onChange={handleEmail}
              type='email'
              id='email'
              value={email}
              pattern='.+@\.com'
              className='pl-2 w-95 h-11 rounded-md border border-solid border-[#E1E1E1] mr-5'
              required
            ></input>
          </div>
          <div className='flex justify-center mb-3'>
            <div className='flex flex-col mr-4'>
              <label htmlFor='password'>Contraseña</label>
              <div className='relative'>
                <input
                  onChange={handlePassword}
                  type={visibleOne ? 'text' : 'password'}
                  id='password'
                  value={password}
                  className='pl-2 w-64 h-11 rounded-md border border-solid border-[#E1E1E1]'
                  required
                ></input>
                <div className='absolute inset-y-0 right-2 pl-3 flex items-center'>
                  <button
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
            <div>
              <label htmlFor='passwordTwo'>Repetir contraseña</label>
              <div className='relative'>
                <input
                  onChange={handlePasswordTwo}
                  type={visibleTwo ? 'text' : 'password'}
                  id='passwordTwo'
                  value={passwordTwo}
                  className='pl-2 w-64 h-11 rounded-md border border-solid border-[#E1E1E1]'
                  required
                ></input>
                <div className='absolute inset-y-0 right-2 pl-3 flex items-center'>
                  <button
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
        </form>
        <div className='flex flex-col ml-5 bg-[#F5F5F5] py-4 px-5 rounded-lg mr-5 mb-5'>
          <div className='font-medium text-xs mb-3'>
            <p className='mb-0.5'>La contraseña debe contener:</p>
            <hr />
          </div>
          <div>
            <div className='flex text-xs'>
              {mayus === 0 ? (
                <p className='mr-28 mb-2'>ABC Una letra mayúscula</p>
              ) : mayus === 2 ? (
                <p className='mr-28 mb-2 text-green-500'>
                  ABC Una letra mayúscula
                </p>
              ) : (
                <p className='mr-28 mb-2 text-red-500'>
                  ABC Una letra mayúscula
                </p>
              )}
              {minus === 0 ? (
                <p className='mr-28 mb-2'>abc Una letra minúscula</p>
              ) : minus === 2 ? (
                <p className='mr-28 mb-2 text-green-500'>
                  abc Una letra minúscula
                </p>
              ) : (
                <p className='mr-28 mb-2 text-red-500'>
                  abc Una letra minúscula
                </p>
              )}
            </div>
            <div className='flex text-xs'>
              {numb === 0 ? (
                <p className='mr-40'>123 Un número</p>
              ) : numb === 2 ? (
                <p className='mr-40 text-green-500'>123 Un número</p>
              ) : (
                <p className='mr-40 text-red-500'>123 Un número</p>
              )}
              {length === 0 ? (
                <p>*** Mínimo 8 caracteres</p>
              ) : length === 2 ? (
                <p className=' text-green-500'>*** Mínimo 8 caracteres</p>
              ) : (
                <p className=' text-red-500'>*** Mínimo 8 caracteres</p>
              )}
            </div>
          </div>
        </div>
        <button className='bg-cruce h-11 text-white  hover:bg-cruceHover font-semibold rounded-lg mb-5 mx-5'>
          Registrarme
        </button>
        <hr className='mx-4 mb-5' />
        <button className=' bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold rounded-lg mb-5 mx-5 h-11'>
          ¿Ya tenés cuenta? Iniciá Sesión
        </button>
      </div>
    </div>
  );
};

export default Register;