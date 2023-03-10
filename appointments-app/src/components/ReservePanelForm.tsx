import { getBranches } from '@/services/branches';
import React, { useEffect, useState } from 'react';

interface ReservePanelProps {
  selectedTime?: string;
  handleSubmit: (e: React.FormEvent) => void;
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
  selectedTime,
  handleSubmit,
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
  
  const dbTimes = shifts;
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const func = async () => {
      const branches = await getBranches();
      setBranches(branches);
    };
    func();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='branch' className='text-sm font-semibold'>
        Sucursal
      </label>
      {!edit ? (
        <select
          name='branch'
          id='branch'
          className='w-full rounded-lg text-sm font-semibold h-11 p-3 border border-grey3 hover:border-grey5 focus:border-cruce outline-none'
          defaultValue=''
          onChange={(e) => {
            setBranch(e.target.value);
          }}
        >
          {branches?.map((branchOffice) => (
            <option value={branchOffice.name} key={branchOffice._id}>
              {branchOffice.name}
            </option>
          ))}
        </select>
      ) : branch ? (
        <select
          name='branch'
          id='branch'
          className='w-full rounded-lg text-sm font-semibold h-11 p-3 border border-grey3 hover:border-grey5 focus:border-cruce outline-none'
          value={branch}
          onChange={e => {
            setBranch(e.target.value);
          }}
        >
          {branches?.map((branchOffice) => (
            <option value={branchOffice.name} key={branchOffice._id}>
              {branchOffice.name}
            </option>
          ))}
        </select>
      ) : null}
      {selectedDate === true ? (
        <>
          <label htmlFor='time' className='text-sm font-semibold mt-4 block'>
            Horario
          </label>
          <select
            name='time'
            id='time'
            className='w-full rounded-lg text-sm font-semibold h-11 mb-4 p-3 border border-grey3 hover:border-grey5 focus:border-cruce outline-none'
            defaultValue={selectedTime}
            onChange={(e) => setTime(e.target.value)}
          >
            {dbTimes?.map((dbTime) => (
              <option value={dbTime} key={dbTime}>
                {dbTime}
              </option>
            ))}
          </select>
          <div className='flex mb-4'>
            <div className='w-1/2 mr-4'>
              <label htmlFor='name' className='text-sm font-semibold'>
                Nombre y Apellido
              </label>
              <input
                type='text'
                name='name'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border text-sm font-semibold w-full h-11 rounded-lg p-3 border-grey3 hover:border-grey5 focus:border-cruce outline-none'
              />
            </div>
            <div className='w-1/2'>
              <label htmlFor='phone' className='text-sm font-semibold'>
                Teléfono
              </label>
              <input
                type='tel'
                name='phone'
                id='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='border text-sm font-semibold w-full h-11 rounded-lg p-3 border-grey3 hover:border-grey5 focus:border-cruce outline-none'
              />
            </div>
          </div>
          <label htmlFor='email' className='text-sm font-semibold'>
            Mail
          </label>
          <input
            type='text'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border w-full text-sm font-semibold rounded-lg h-11 p-3 border-grey3 hover:border-grey5 focus:border-cruce outline-none'
          />
        </>
      ) : null}
      {name && phone && email && date && time && branch ? (
        <button
          className='bg-cruce rounded-lg h-11 w-44 mt-8.5 font-semibold text-lb text-white hover:bg-cruceHover active:shadow-active'
          type='submit'
        >
          {edit ? 'Confirmar Edición' : 'Confirmar Reserva'}
        </button>
      ) : (
        <button
          className='bg-grey3 rounded-lg h-11 w-44 mt-8.5 font-semibold text-lb text-grey6'
          disabled
        >
          {edit ? 'Confirmar Edición' : 'Confirmar Reserva'}
        </button>
      )}
    </form>
  );
};

export default ReservePanelForm;
