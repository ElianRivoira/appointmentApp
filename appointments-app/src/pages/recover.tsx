import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/services/users';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Input from '@/commons/Input';
import Modal from '@/commons/Modal';
import Button from '@/commons/Button';

const Recover = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendEmail.mutate(email);
  };

  const sendEmail = useMutation({
    mutationFn: forgotPassword,
    onSuccess: response => {
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  useEffect(() => {
    if (type === 1 && !open) router.push('/login');
  }, [open]);

  return (
    <>
      <Head>
        <title>Appointments - Recuperar contraseña</title>
      </Head>
      <div className='flex justify-center items-center'>
        <div className='flex flex-col items-center w-[90%] shadow-xg mt-10 rounded-xl p-3.5 pb-5 max-w-lg bg-white'>
          <form onSubmit={handleSubmit} className='flex w-full px-4 flex-col items-center'>
            <div className='mt-3 mb-5'>
              <h1 className='font-bold text-ln'>Recuperar Contraseña</h1>
            </div>
            <div className='w-full mb-3'>
              <Input
                label='Ingresa tu correo electronico'
                type='email'
                id='email'
                name='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className='flex flex-col mb-4 w-full'>
              {email ? (
                <Button type='submit'>Recuperar contraseña</Button>
              ) : (
                <Button type='submit' disabled>
                  Recuperar contraseña
                </Button>
              )}
            </div>
            <Link href={'/login'} className='text-cruce hover:text-cruceHover font-bold text-ss'>
              Volver al login
            </Link>
          </form>
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            type={type}
            errors={errors}
          >
            <h1>Hemos enviado un correo a la dirección proporcionada</h1>
            <p className='text-sm font-normal mt-1'>Tenga en cuenta revisar su bandeja de spam</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Recover;
