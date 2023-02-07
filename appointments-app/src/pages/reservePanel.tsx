import React, { useReducer, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import customCalendar from '@/styles/calendar.module.css';
import Navbar from '@/components/Navbar';
import Step from '@/commons/Step';

const ReservePanel = () => {
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: any) => {

  }

  return (
    <div className='h-screen bg-cruceBackground'>
      <Navbar />
      <div className='flex flex-col lg:mx-24'>
        <div className='mt-12 mb-6 flex justify-around'>
          <div className='w-3/6'>
            <h1 className='font-bold text-xb'>Hacer una Reserva</h1>
          </div>
          <div className='w-2/6'></div>
        </div>
        <div className='flex justify-around'>
          <div className='w-3/6 px-10 py-8 rounded-lg bg-white'>
            <h3 className='text-ln font-bold mb-1'>Reserva</h3>
            <p className='text-sm font-semibold'>
              Seleccioná el día en el calendario
            </p>
            <div className='flex flex-col'>
              <div className='h-26 flex flex-row items-center'>
                {!branch ? (
                  <>
                    <Step
                      icon='1'
                      text='Elegí tu sucursal'
                      bgColor='bg-cruce'
                      textColor='text-cruce'
                    />
                    <Step
                      icon='2'
                      text='Seleccioná el día'
                      bgColor='bg-grey4'
                      textColor='text-grey4'
                    />
                    <Step
                      icon='3'
                      text='Completá el formulario'
                      bgColor='bg-grey4'
                      textColor='text-grey4'
                    />
                  </>
                ) : selectedDate === true ? (
                  <>
                    <Step icon='check' text='Elegí tu sucursal' />
                    <Step icon='check' text='Seleccioná el día' />
                    <Step
                      icon='3'
                      text='Completá el formulario'
                      bgColor='bg-cruce'
                      textColor='text-cruce'
                    />
                  </>
                ) : (
                  <>
                    <Step icon='check' text='Elegí tu sucursal' />
                    <Step
                      icon='2'
                      text='Seleccioná el día'
                      bgColor='bg-cruce'
                      textColor='text-cruce'
                    />
                    <Step
                      icon='3'
                      text='Completá el formulario'
                      bgColor='bg-grey4'
                      textColor='text-grey4'
                    />
                  </>
                )}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor='branch' className='text-sm font-semibold'>
                Sucursal
              </label>
              <select
                name='branch'
                id='branch'
                className='w-full rounded-lg text-sm font-semibold h-11 mb-4 p-3 border border-grey3 hover:border-grey5 focus:border-cruce outline-none'
                onChange={e => {
                  setBranch(e.target.value);
                }}
              >
                <option value=''></option>
                <option value='Villa Crespo'>Villa Crespo</option>
              </select>
              {selectedDate === true ? (
                <>
                  <label htmlFor='time' className='text-sm font-semibold'>
                    Horario
                  </label>
                  <select
                    name='time'
                    id='time'
                    className='w-full rounded-lg text-sm font-semibold h-11 mb-4 p-3 border border-grey3 hover:border-grey5 focus:border-cruce outline-none'
                    onChange={e => setTime(e.target.value)}
                  >
                    <option value=''></option>
                    <option value='1017'>De 10:00 a 17:00hs</option>
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
                        onChange={e => setName(e.target.value)}
                        className='border text-sm font-semibold w-full h-11 rounded-lg p-3 border-grey3 hover:border-grey5 focus:border-cruce outline-none'
                      />
                    </div>
                    <div className='w-1/2'>
                      <label htmlFor='phone' className='text-sm font-semibold'>
                        Teléfono
                      </label>
                      <input
                        type='number'
                        name='phone'
                        id='phone'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
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
                    onChange={e => setEmail(e.target.value)}
                    className='border w-full text-sm font-semibold rounded-lg h-11 p-3 border-grey3 hover:border-grey5 focus:border-cruce outline-none'
                  />
                </>
              ) : null}
              {name && phone && email && date && time && branch ? (
                <button className='bg-cruce rounded-lg h-11 w-44 mt-8.5 font-semibold text-lb text-white hover:bg-cruceHover' type='submit'>
                  Confirmar Reserva
                </button>
              ) : (
                <button className='bg-grey3 rounded-lg h-11 w-44 mt-8.5 font-semibold text-lb text-grey6'>
                  Confirmar Reserva
                </button>
              )}
            </form>
          </div>
          <div className='w-2/6'>
            <Calendar
              calendarType={'US'}
              defaultView={'month'}
              locale={'es-ES'}
              value={date}
              onChange={(e: Date) => {
                setDate(e);
                console.log(date);
                setSelectedDate(true);
              }}
              className={customCalendar.customCalendar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservePanel;