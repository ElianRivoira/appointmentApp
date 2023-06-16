import React, { useState } from 'react';
import { postBranch } from '@/services/branches';
import { useMutation } from '@tanstack/react-query';
import Modal from '@/components/Modal';

const createBranch = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [phone, setPhone] = useState(0);
  const [openHour, setOpenHour] = useState('');
  const [closeHour, setCloseHour] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);

  const postBranchOffice = useMutation({
    mutationFn: postBranch,
    onSuccess: branch => {
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postBranchOffice.mutate({ name, email, phone, capacity, openHour, closeHour });
  };

  return (
    <div className='h-screen bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Creación de sucursales</p>
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
            <div className='flex mb-3'>
              <div className='w-1/2 mr-4'>
                <label htmlFor='phone' className='text-sm font-medium'>
                  Teléfono
                </label>
                <input
                  type='tel'
                  name='phone'
                  id='phone'
                  value={phone}
                  onChange={e => setPhone(Number(e.target.value))}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
              <div className='w-1/2'>
                <label htmlFor='capacity' className='text-sm font-medium'>
                  Capacidad máxima
                </label>
                <input
                  type='number'
                  name='capacity'
                  id='capacity'
                  value={capacity}
                  onChange={e => setCapacity(Number(e.target.value))}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
            </div>
            <div className='flex mb-3'>
              <div className='w-1/2 mr-4'>
                <label htmlFor='openHour' className='text-sm font-medium'>
                  Horario de Inicio
                </label>
                <input
                  type='string'
                  name='openHour'
                  id='openHour'
                  value={openHour}
                  pattern='^(?:[0-5][0-9]):[0-5][0-9]$'
                  placeholder='08:00'
                  onChange={e => setOpenHour(e.target.value)}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
              <div className='w-1/2'>
                <label htmlFor='closeHour' className='text-sm font-medium'>
                  Horario de Cierre
                </label>
                <input
                  type='string'
                  name='closeHour'
                  id='closeHour'
                  value={closeHour}
                  pattern='^(?:[0-5][0-9]):[0-5][0-9]$'
                  placeholder='17:00'
                  onChange={e => setCloseHour(e.target.value)}
                  required
                  className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
            </div>
            <div className='flex mt-4'>
              <button
                type='submit'
                className=' bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'
                onClick={() => {}}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)}>
        <h1>Sucursal creada con éxito</h1>
      </Modal>
    </div>
  );
};

export default createBranch;
