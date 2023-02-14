import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/store/slices/userSlice';
import { updateUser } from '@/services/users';

const myData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState(0);
  const [phone, setPhone] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const res = await updateUser({
        id: user.id,
        name,
        email,
        dni,
        phone,
      });
      console.log(res);
    }
  };

  useEffect(() => {
    if(user){
      setName(user.name)
      setDni(user.dni)
      setEmail(user.email)
      setPhone(user.phone)
    }
  }, [user])

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className='h-screen bg-cruceBackground'>
      <Navbar />
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Mis Datos</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username' className='text-sm font-medium'>
              Usuario
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
              Mail
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
            <div className='flex mb-3'>
              <div className='w-1/2 mr-4'>
                <label htmlFor='dni' className='text-sm font-medium'>
                  DNI
                </label>
                <input
                  type='number'
                  name='dni'
                  id='dni'
                  value={dni}
                  onChange={e => setDni(Number(e.target.value))}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
              <div className='w-1/2'>
                <label htmlFor='phone' className='text-sm font-medium'>
                  Teléfono
                </label>
                <input
                  type='number'
                  name='phone'
                  id='phone'
                  value={phone}
                  onChange={e => setPhone(Number(e.target.value))}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
            </div>
            <div className='flex justify-start'>
              <button
                type='button'
                className='font-semibold text-ss text-cruce hover:text-cruceHover'
              >
                Editar contraseña
              </button>
            </div>
            <div className='flex mt-4'>
              <button
                type='submit'
                className=' bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default myData;
