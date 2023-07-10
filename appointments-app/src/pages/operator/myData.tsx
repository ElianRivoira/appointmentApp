import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';

import { getLoggedUser, sendPassEmail, updateUser } from '@/services/users';
import Modal from '@/commons/Modal';
import { checkLocalStorage } from '@/utils/localStorage';
import Input from '@/commons/Input';
import Button from '@/commons/Button';

const myData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState(0);
  const [branch, setBranch] = useState('');
  const [phone, setPhone] = useState(0);
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
  });

  const putUser = useMutation({
    mutationFn: updateUser,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loggedUser.data) {
      putUser.mutate({
        id: loggedUser.data._id,
        name,
        email,
        dni,
        branch,
        phone,
      });
    }
  };

  const changePassword = () => {
    if (loggedUser.data) {
      sendPassEmail({ id: loggedUser.data._id, email });
      setMessage('Se le ha enviado un correo para cambiar su contraseña');
      setType(3);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (loggedUser.data) {
      setName(loggedUser.data.name);
      setDni(loggedUser.data.dni);
      setEmail(loggedUser.data.email);
      if (typeof loggedUser.data.branch === 'object') setBranch(loggedUser.data.branch.name);
      if (loggedUser.data.phone) setPhone(loggedUser.data.phone);
    }
  }, [loggedUser.isSuccess, loggedUser.isRefetching]);

  return (
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
            label='Teléfono'
            type='tel'
            name='phone'
            id='phone'
            value={phone}
            onChange={e => setPhone(Number(e.target.value))}
            required
          />
          <div className='flex mb-3'>
            <div className='w-1/2 mr-4'>
              <Input
                label='DNI'
                type='tel'
                name='dni'
                id='dni'
                value={dni}
                onChange={e => setDni(Number(e.target.value))}
                required
              />
            </div>
            <div className='w-1/2'>
              <Input
                label='Sucursal'
                type='text'
                name='branch'
                id='branch'
                value={branch}
                onChange={e => setBranch(e.target.value)}
                disabled
              />
              {/* <label htmlFor='branch' className='text-sm font-medium'>
                Sucursal
              </label>
              <input
                type='tex'
                name='branch'
                id='branch'
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3 text-grey5'
                disabled
              /> */}
            </div>
          </div>
          <div className='flex justify-start'>
            <button
              type='button'
              className='font-semibold text-ss text-cruce hover:text-cruceHover'
              onClick={changePassword}
            >
              Editar contraseña
            </button>
          </div>
          <div className='flex mt-4'>
            <Button type='submit'>Aceptar</Button>
          </div>
        </form>
        <Modal type={type} errors={errors} type3Message={message} open={open} onClose={() => setOpen(false)}>
          <h1>Sus datos se han actualizado correctamente</h1>
        </Modal>
      </div>
    </div>
  );
};

export default myData;
