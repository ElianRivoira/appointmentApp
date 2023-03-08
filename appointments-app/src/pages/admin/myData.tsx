import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';

import AdminNavbar from '@/components/AdminNavbar';
import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';
import { sendPassEmail, updateUser } from '@/services/users';
import Modal from '@/components/Modal';
import rightCheckbox from '../../../public/icons/rightCheckbox.svg';

const myData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState(0);
  const [phone, setPhone] = useState(0);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const res = await updateUser(user._id, {
        name,
        email,
        dni,
        phone,
      });
      setType(1);
      setOpen(true);
      console.log(res);
    }
  };

  const changePassword = () => {
    if (user) {
      sendPassEmail(user?._id, email);
      setType(2);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setDni(user.dni);
      setEmail(user.email);
      if (user.phone) setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('login');
    dispatch(fetchUser());
  }, []);

  return (
    <div className='h-screen bg-cruceBackground'>
      <AdminNavbar />
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Mis Datos</p>
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
            <div className='flex justify-start mt-2'>
              <button
                type='button'
                className='font-semibold text-ss text-cruce hover:text-cruceHover'
                onClick={changePassword}
              >
                Editar contraseña
              </button>
            </div>
            <div className='flex mt-4'>
              <button
                type='submit'
                className=' bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'
                onClick={() => {}}
              >
                Aceptar
              </button>
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
                  <p>Sus datos se han actualizado correctamente</p>
                </>
              ) : type === 2 ? (
                <>
                  <Image
                    src={rightCheckbox}
                    alt='success'
                    className='w-10 h-10 mb-7'
                  />
                  <p>Se le ha enviado un correo para cambiar su contraseña</p>
                </>
              ) : null}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default myData;
