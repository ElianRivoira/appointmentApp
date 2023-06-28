import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { login } from '../services/users';
import Modal from '@/components/General/Modal';
import { fetchUser } from '@/store/slices/userSlice';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [calledPush, setCalledPush] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const loginUser = useMutation({
    mutationFn: login,
    onSuccess: async user => {
      await dispatch(fetchUser());
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginUser.mutate({ email, password });
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
  };

  useEffect(() => {
    if (type === 1 && open === false) {
      redirect();
    }
  }, [open]);

  return (
    <div className='min-h-screen'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-sm h-3/5 mt-32 px-8 pt-10 pb-8 border rounded-xl shadow-xg bg-white'>
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
        </div>
        <Modal type={type} open={open} errors={errors} onClose={() => setOpen(false)}>
          <p>Inicio de sesión satisfactorio</p>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
