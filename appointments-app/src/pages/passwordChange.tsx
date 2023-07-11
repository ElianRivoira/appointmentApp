import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useMutation } from '@tanstack/react-query';

import { changePassword, sendToken } from '@/services/users';
import Modal from '@/commons/Modal';
import PasswordInput from '@/commons/PasswordInput';
import Button from '@/commons/Button';

const passwordChange = () => {
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();
  const { token } = router.query;
  const tokenString = Array.isArray(token) ? token[0] : token;

  const changePass = useMutation({
    mutationFn: changePassword,
    onSuccess: user => {
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const checkToken = useMutation({
    mutationFn: sendToken,
    onSuccess: email => {
      setEmail(email)
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass1 === pass2) {
      changePass.mutate({ password: pass1, email, id: '' });
    } else {
      setMessage('Las contraseñas deben coincidir');
      setType(3);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (type === 1 && !open) router.push('/login');
    else if (type === 2 && !open) router.push('/login');
  }, [open]);

  useEffect(() => {
    tokenString && checkToken.mutate(tokenString);
  }, [tokenString]);

  return (
    <>
      <Head>
        <title>Appointments - Cambiar contraseña</title>
      </Head>
      <div className='flex justify-center'>
        <div className='flex flex-col w-[90%] max-w-lg mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <h1 className='mb-4 font-bold text-xb'>Cambiar contraseña</h1>
          <form onSubmit={handleSubmit}>
            <PasswordInput
              label='Contraseña'
              name='pass1'
              id='pass1'
              value={pass1}
              onChange={e => setPass1(e.target.value)}
              required
            />
            <PasswordInput
              label='Repetir contraseña'
              name='pass2'
              id='pass2'
              value={pass2}
              onChange={e => setPass2(e.target.value)}
              required
            />
            <div className='flex mt-4'>
              {pass1.length >= 8 && pass2.length >= 8 ? (
                <Button type='submit'>Aceptar</Button>
              ) : (
                <Button type='submit' disabled>
                  Aceptar
                </Button>
              )}
            </div>
          </form>
          <Modal
            type={type}
            errors={errors}
            open={open}
            type3Img='error'
            type3Message={message}
            onClose={() => setOpen(false)}
          >
            <h1>Su contraseña ha sido actualizada correctamente</h1>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default passwordChange;
