import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import customCalendar from '@/styles/calendar.module.css';
import Navbar from '@/components/Navbar';
import Step from '@/commons/Step';
import ReservePanelForm from '@/components/ReservePanelForm';
import { postReserve } from '@/services/appointments';

const ReservePanel = () => {
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [countDown, setCountDown] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postReserve(date, branch, time, name, phone, email);
  };

  const formatTime = (mss: number): string => {
    const minutesOperation = (mss % (1000 * 60 * 60)) / (1000 * 60);
    const secondsOperation = (mss % (1000 * 60)) / 1000;
    const minutes = parseInt(minutesOperation.toString());
    const seconds = parseInt(secondsOperation.toString());

    return `Quedan ${minutes}:${seconds}`;
  };

  useEffect(() => {
    const expirationDate = new Date().getTime() + 300000; // 5 minutes
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = expirationDate - now.getTime();
      const count = formatTime(difference);
      setCountDown(count);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='h-screen bg-cruceBackground'>
      <Navbar />
      <div className='flex flex-col lg:mx-32 2xl:mx-44'>
        <div className='mt-12 mb-6 flex justify-around lg:justify-between'>
          <div className='w-3/6'>
            <h1 className='font-bold text-xb'>Hacer una Reserva</h1>
          </div>
          <div className='w-2/6'></div>
        </div>
        <div className='flex justify-around lg:justify-between'>
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
            <ReservePanelForm
              handleSubmit={handleSubmit}
              branch={branch}
              setBranch={setBranch}
              selectedDate={selectedDate}
              time={time}
              setTime={setTime}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              date={date}
            />
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
        {selectedDate === true ? (
          <div className='flex w-full justify-end'>
            <div className='rounded-lg h-11 bg-cruceHover p-3 text-lb font-bold text-white w-30 shadow-timer'>
              {countDown}
            </div>
          </div>
        ) : (
          <div className='flex w-full justify-end mt-62'>
            <div className='rounded-lg h-11 bg-cruceHover p-3 text-lb font-bold text-white w-30 shadow-timer'>
              {countDown}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservePanel;
