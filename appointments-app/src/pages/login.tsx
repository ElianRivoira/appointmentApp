import React, { useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import { login } from '../services/users';
import { fetchUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      if (!res) {
        setType(2);
        setIsOpen(true);
      } else {
        setType(1);
        setIsOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => {
    async function func() {
      if(type === 1 && isOpen === false){
        await dispatch(fetchUser());
        router.push('reservePanel');
      }
    }
    func()
  }, [isOpen])

  return (
    <div className='h-screen bg-cruceBackground'>
      <Navbar />
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-sm h-3/5 mt-12 px-8 pt-10 pb-8 border rounded-xl shadow-xg bg-white'>
          <p className='text-center mb-8 font-bold text-2xl'>Iniciar Sesión</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username' className='text-sm font-medium'>
              Usuario
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={handleUsername}
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
              onChange={handlePassword}
              required
              className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 mb-6 outline-none p-3'
            />
            <div className='flex justify-center'>
              <button className='font-bold text-ss mb-5 text-cruce hover:text-cruceHover'>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className='flex flex-col justify-center'>
              {username && password.length >= 8 ? (
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
              <p>Login successfully</p>
            ) : type === 2 ? (
              <p>The data introduced is incorrect</p>
            ) : null
            }
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Login;
