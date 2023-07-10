import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { login } from '../services/users';
import Modal from '@/commons/Modal';
import { useMutation } from '@tanstack/react-query';
import Button from '@/commons/Button';
import PasswordInput from '@/commons/PasswordInput';
import Input from '@/commons/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [calledPush, setCalledPush] = useState(false);
  const router = useRouter();

  const loginUser = useMutation({
    mutationFn: login,
    onSuccess: async user => {
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
    if (loginUser.data?.role === 'user') {
      setCalledPush(true);
      router.push('reservePanel');
    } else if (loginUser.data?.role === 'operator') {
      setCalledPush(true);
      router.push('operator/reserves');
    } else if (loginUser.data?.role === 'admin') {
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
            <Input
              label='Email'
              type='email'
              name='email'
              id='email'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label='Contraseña'
              name='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className='flex justify-center mt-6'>
              <button className='font-bold text-ss mb-5 text-cruce hover:text-cruceHover'>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className='flex flex-col justify-center'>
              {email && password.length >= 8 ? (
                <Button type='submit'>Ingresar</Button>
              ) : (
                <Button type='submit' disabled>
                  Ingresar
                </Button>
              )}
              <hr className='border-grey3' />
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
