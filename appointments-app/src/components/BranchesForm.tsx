import React from 'react';
import Button from '../commons/Button';

interface BranchesFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: number;
  setPhone: React.Dispatch<React.SetStateAction<number>>;
  capacity: number;
  setCapacity: React.Dispatch<React.SetStateAction<number>>;
  openHour: string;
  setOpenHour: React.Dispatch<React.SetStateAction<string>>;
  closeHour: string;
  setCloseHour: React.Dispatch<React.SetStateAction<string>>;
}

const BranchesForm: React.FC<BranchesFormProps> = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  capacity,
  setCapacity,
  phone,
  setPhone,
  openHour,
  setOpenHour,
  closeHour,
  setCloseHour,
}) => {
  return (
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
        className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
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
        className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
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
            className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 outline-none p-3'
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
            className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 outline-none p-3'
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
            className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 outline-none p-3'
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
            className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 outline-none p-3'
          />
        </div>
      </div>
      <div className='flex mt-4'>
        {name && email && phone && capacity && openHour && closeHour ? (
          <Button type='submit'>Enviar</Button>
        ) : (
          <Button type='submit' style='bg-grey3 text-grey6' disabled>
            Enviar
          </Button>
        )}
      </div>
    </form>
  );
};

export default BranchesForm;
