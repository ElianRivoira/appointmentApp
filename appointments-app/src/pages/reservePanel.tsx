import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// import 'react-calendar/dist/Calendar.css';
import customCalendar from '@/styles/calendar.module.css';
import Navbar from '@/components/Navbar';
import Step from '@/commons/Step';
import ReservePanelForm from '@/components/ReservePanelForm';
import { postReserve } from '@/services/appointments';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import CountDown from '@/components/CountDown';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/store/slices/userSlice';

const ReservePanel = () => {
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [countDown, setCountDown] = useState('');
  const [start, setStart] = useState(false);
  const [reload, setReload] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user ? user.id : 'null';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postReserve(date, branch, time, name, phone, email, userId);
  };

  const formatTime = (mss: number): string => {
    const minutesOperation = (mss % (1000 * 60 * 60)) / (1000 * 60);
    const secondsOperation = (mss % (1000 * 60)) / 1000;
    const minutes = parseInt(minutesOperation.toString());
    const seconds = parseInt(secondsOperation.toString());

    if (minutes === 0 && seconds === 0) setReload(true);

    return seconds < 10
      ? `Quedan ${minutes}:0${seconds}`
      : `Quedan ${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (branch) setStart(true);
  }, [branch]);

  useEffect(() => {
    if (reload) router.reload();
  }, [reload]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('login');
    dispatch(fetchUser());
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
          <CalendarContainer>
            <Calendar
              calendarType={'US'}
              defaultView={'month'}
              locale={'es-ES'}
              value={date}
              onClickDay={(e: Date) => {
                setDate(e);
                console.log(date);
                setSelectedDate(true);
              }}
              activeStartDate={new Date()}
            />
          </CalendarContainer>
        </div>
        {selectedDate === true ? (
          <CountDown
            start={start}
            countDown={countDown}
            setCountDown={setCountDown}
            formatTime={formatTime}
            margin={false}
          />
        ) : (
          <CountDown
            start={start}
            countDown={countDown}
            setCountDown={setCountDown}
            formatTime={formatTime}
            margin={true}
          />
        )}
      </div>
    </div>
  );
};

export default ReservePanel;

const CalendarContainer = styled.div`
/* ~~~ container styles ~~~ */
width: 40%;
height: 362px;
max-width: 500px;
padding: 32px;
border-radius: 8px;
background-color: white;
text-transform: capitalize;

/* ~~~ calendar styles ~~~ */
.react-calendar__navigation {
  display: flex;
  margin-bottom: 26px;
  
  .react-calendar__navigation__label {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    text-transform: capitalize;
}

.react-calendar__navigation__arrow {
  flex-grow: 0.333;
}
}

/* ~~~ label styles ~~~ */
.react-calendar__month-view__weekdays {
  text-align: center;
  margin-bottom: 16px;
}

/* ~~~ button styles ~~~ */
button {
  background-color: white;
  border-radius: 4px;
  color: #282828;
  padding: 8px 18px !important;
  text-align: center !important;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  &:hover {
    background-color: #C8C8C8;
    color: #A442F1;
  }
  
  &:active {
    background-color: #A442F1;
    color: white;
  }
}

/* ~~~ neighboring month & weekend styles ~~~ */
.react-calendar__month-view__days__day--neighboringMonth {
  color: #C8C8C8;
  pointer-events: none;
}
.react-calendar__month-view__days__day--weekend {
  color: #C8C8C8;
  pointer-events: none;
}

/* ~~~ active day styles ~~~ */
.react-calendar__tile--range {
  background-color: #A442F1;
  color: white;
  pointer-events: none;
}
`