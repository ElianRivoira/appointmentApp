import Button from '@/commons/Button';
import Input from '@/commons/Input';
import Select from '@/commons/Select';
import React from 'react';

interface ReservePanelProps {
  handleSubmit: (e: React.FormEvent) => void;
  branches: Branch[] | undefined;
  branch: string;
  shifts: string[];
  setBranch: (state: string) => void;
  selectedDate: boolean;
  time: string;
  setTime: (state: string) => void;
  name: string;
  setName: (state: string) => void;
  phone: string;
  setPhone: (state: string) => void;
  email: string;
  setEmail: (state: string) => void;
  date: Date;
  edit: boolean;
}

const ReservePanelForm: React.FC<ReservePanelProps> = ({
  handleSubmit,
  branches,
  branch,
  shifts,
  setBranch,
  selectedDate,
  time,
  setTime,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  date,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Select
        label='Sucursal'
        name='branch'
        id='branch'
        value={branch}
        onChange={e => {
          setBranch(e.target.value);
        }}
        required
        data={branches}
        dataType='object'
        width='full'
        style='mb-4'
      />
      {selectedDate === true ? (
        <>
          <Select
            label='Horario'
            name='time'
            id='time'
            value={time}
            onChange={e => {
              setTime(e.target.value);
            }}
            data={shifts}
            width='full'
            style='mb-4'
          />
          <div className='flex mb-4'>
            <div className='w-1/2 mr-4'>
              <Input
                label='Nombre y Apellido'
                type='text'
                name='name'
                id='name'
                placeholder='Juan Perez'
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className='w-1/2'>
              <Input
                label='Teléfono'
                type='tel'
                name='phone'
                id='phone'
                placeholder='Juan Perez'
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <Input
            label='Mail'
            type='text'
            name='email'
            id='email'
            placeholder='Juan Perez'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </>
      ) : null}
      {name && phone && email && date && time && branch ? (
        <Button type='submit' style='mt-8.5'>
          {edit ? 'Confirmar Edición' : 'Confirmar Reserva'}
        </Button>
      ) : (
        <Button type='submit' style='mt-8.5' disabled>
          {edit ? 'Confirmar Edición' : 'Confirmar Reserva'}
        </Button>
      )}
    </form>
  );
};

export default ReservePanelForm;
