import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import Navbar from '../components/Navbar';
import { login } from '../services/users';
import Modal from '@/components/Modal';
import wrongCheckbox from '../../public/icons/wrongCheckbox.svg';
import rightCheckbox from '../../public/icons/rightCheckbox.svg';
import { fetchUser } from '@/store/slices/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(0);
  const [calledPush, setCalledPush] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (!user) {
        setType(2);
        setIsOpen(true);
      } else {
        await dispatch(fetchUser())
        setType(1);
        setIsOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const redirect = () => {
    if (calledPush) return;
    if (user?.role === 'user') {
      setCalledPush(true);
      router.push('reservePanel');
    } else if (user?.role === 'operator') {
      setCalledPush(true);
      router.push('operator/reserves');
    } else if (user?.role === 'admin') {
      setCalledPush(true);
      router.push('admin/operators');
    }
  }

  useEffect(() => {
    if (type === 1 && isOpen === false) {
      redirect()
    }
  }, [isOpen]);

  // useEffect(() => {
  //   const func = async (): Promise<void> => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       await dispatch(fetchUser());
  //       redirect();
  //     };
  //   };
  //   func();
  // }, []);

  return (
    <div className='h-screen bg-cruceBackground'>
      <Navbar />
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-sm h-3/5 mt-12 px-8 pt-10 pb-8 border rounded-xl shadow-xg bg-white'>
          <p className='text-center mb-8 font-bold text-2xl'>Iniciar Sesión</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email' className='text-sm font-medium'>
              Email
            </label>
            <input
              type='text'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
            />
            <label htmlFor='password' className='text-sm font-medium'>
              Contraseña
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-6 outline-none p-3'
            />
            <div className='flex justify-center'>
              <button className='font-bold text-ss mb-5 text-cruce hover:text-cruceHover'>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className='flex flex-col justify-center'>
              {email && password.length >= 8 ? (
                <button
                  type='submit'
                  className='mb-5 bg-cruce text-white h-11 rounded-lg font-semibold text-lb hover:bg-cruceHover active:shadow-active'
                >
                  Ingresar
                </button>
              ) : (
                <button
                  type='submit'
                  className='mb-5 bg-grey3 text-grey6 h-11 rounded-lg font-semibold text-lb'
                  disabled
                >
                  Ingresar
                </button>
              )}
              <hr />
              <Link href={'register'} className='mt-5 '>
                <button className=' bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg h-11 w-full active:shadow-active'>
                  ¿No tenés cuenta? Registrate
                </button>
              </Link>
            </div>
          </form>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            {type === 1 ? (
              <div className='flex flex-col items-center'>
                <Image
                  src={rightCheckbox}
                  alt='success'
                  className='w-10 h-10 mb-7'
                />
                <p className='text-ln font-bold'>Inicio de sesión satisfactorio</p>
              </div>
            ) : type === 2 ? (
              <div className='flex flex-col items-center'>
                <Image
                  src={wrongCheckbox}
                  alt='error'
                  className='w-10 h-10 mb-7'
                />
                <p className='text-ln font-bold'>La información introducida es incorrecta</p>
              </div>
            ) : null}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Login;
