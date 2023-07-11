import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { forgotPassword, getLoggedUser, updateUser } from '@/services/users';
import Modal from '@/commons/Modal';
import { checkLocalStorage } from '@/utils/localStorage';
import Input from '@/commons/Input';
import Button from '@/commons/Button';
import Spinner2 from '@/components/General/Spinner2';

const myData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState(0);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [message, setMessage] = useState('');

  const loggedUser = useQuery({
    queryKey: ['loggedUser'],
    enabled: checkLocalStorage('session'),
    queryFn: getLoggedUser,
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
    onSuccess: user => {
      if (user) {
        setName(user.name);
        setDni(user.dni);
        setEmail(user.email);
      }
    },
  });

  const putUser = useMutation({
    mutationFn: updateUser,
    onSuccess: operator => {
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const sendEmail = useMutation({
    mutationFn: forgotPassword,
    onSuccess: response => {
      setMessage('Se le ha enviado un correo para cambiar su contraseña');
      setType(3);
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
    if (loggedUser.data) {
      putUser.mutate({
        id: loggedUser.data._id,
        name,
        email,
        dni,
      });
    }
  };

  if (loggedUser.isLoading || !name) return <Spinner2 />;

  return (
    <div className='bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Mis Datos</p>
          <form onSubmit={handleSubmit}>
            <Input
              label='Nombre'
              type='text'
              name='username'
              id='username'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <Input
              label='Correo electrónico'
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              label='DNI'
              type='tel'
              name='dni'
              id='dni'
              value={dni}
              onChange={e => setDni(Number(e.target.value))}
              required
            />
            <div className='flex justify-start mt-2'>
              <button
                type='button'
                className='font-semibold text-ss text-cruce hover:text-cruceHover'
                onClick={() => {
                  loggedUser.data && sendEmail.mutate(email);
                }}
              >
                Editar contraseña
              </button>
            </div>
            <div className='flex mt-4'>
              <Button type='submit'>Aceptar</Button>
            </div>
          </form>
        </div>
        <Modal type={type} errors={errors} open={open} type3Message={message} onClose={() => setOpen(false)}>
          <h1>Sus datos se han actualizado correctamente</h1>
        </Modal>
      </div>
    </div>
  );
};

export default myData;
