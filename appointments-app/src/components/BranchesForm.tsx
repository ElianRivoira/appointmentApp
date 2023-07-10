import React from 'react';
import Button from '../commons/Button';
import Input from '@/commons/Input';

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
      <div className='flex mb-3'>
        <div className='w-1/2 mr-4'>
          <Input
            label='Teléfono'
            type='tel'
            name='phone'
            id='phone'
            value={phone}
            onChange={e => setPhone(Number(e.target.value))}
            required
          />
        </div>
        <div className='w-1/2'>
          <Input
            label='Capacidad máxima'
            type='number'
            name='capacity'
            id='capacity'
            value={capacity}
            onChange={e => setCapacity(Number(e.target.value))}
            required
          />
        </div>
      </div>
      <div className='flex mb-3'>
        <div className='w-1/2 mr-4'>
          <Input
            label='Horario de Inicio'
            type='text'
            name='openHour'
            id='openHour'
            value={openHour}
            placeholder='08:00'
            pattern='^(?:[0-5][0-9]):[0-5][0-9]$'
            onChange={e => setOpenHour(e.target.value)}
            required
          />
        </div>
        <div className='w-1/2'>
          <Input
            label='Horario de Cierre'
            type='text'
            name='closeHour'
            id='closeHour'
            value={closeHour}
            placeholder='17:00'
            pattern='^(?:[0-5][0-9]):[0-5][0-9]$'
            onChange={e => setCloseHour(e.target.value)}
            required
          />
        </div>
      </div>
      <div className='flex mt-4'>
        {name && email && phone && capacity && openHour && closeHour ? (
          <Button type='submit'>Enviar</Button>
        ) : (
          <Button type='submit' disabled>
            Enviar
          </Button>
        )}
      </div>
    </form>
  );
};

export default BranchesForm;
