import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
  CalendarContainer,
  CalendarContainerDisabled,
} from '@/components/Calendar';
import Navbar from '@/components/Navbar';
import Step from '@/commons/Step';
import ReservePanelForm from '@/components/ReservePanelForm';
import { editReserve, getOneReserve } from '@/services/appointments';
import { AppDispatch } from '@/store';
import CountDown from '@/components/CountDown';
import { fetchUser } from '@/store/slices/userSlice';
import Modal from '@/components/Modal';
import rightCheckbox from '../../../../public/icons/rightCheckbox.svg';
import wrongCheckbox from '../../../../public/icons/wrongCheckbox.svg';
import { getBranchByName } from '@/services/branches';

const ReservePanel = () => {
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState(false);
  const [shifts, setShifts] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [countDown, setCountDown] = useState('');
  const [start, setStart] = useState(false);
  const [reload, setReload] = useState(false);
  const [reserve, setReserve] = useState<reserveUser>();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const reserveId = router.query.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [hours, minutes] = time.split(':');
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    if (reserveId && typeof reserveId === 'string') {
      editReserve(date, branch, name, phone, email, reserveId)
        .then(() => {
          setType(1);
          setOpen(true);
        })
        .catch(e => {
          setType(2);
          setOpen(true);
        });
    }
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
    if (type === 1 && open === false) {
      if (reserveId && typeof reserveId === 'string') {
        router.push({
          pathname: `/confirmedReserve/${reserveId}`,
        });
      }
    }
  }, [open]);

  useEffect(() => {
    if (branch) {
      setStart(true)
      const branchByName = async () => {
        let branchByName = await getBranchByName(branch);
        setShifts(branchByName.shifts[date.toLocaleDateString()]);
      };
      branchByName();
    };
  }, [branch]);

  useEffect(() => {
    if (reload) router.reload();
  }, [reload]);

  useEffect(() => {
    if (reserve) {
      const datee = new Date(reserve.date);
      setBranch(reserve.branch.name);
      setSelectedDate(true);
      setDate(datee);
      setEmail(reserve.email);
      setPhone(reserve.phone.toString());
      setName(reserve.name);
      setTime(`${datee.getHours()}:${datee.getMinutes()}`);
    }
  }, [reserve]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('login');
    dispatch(fetchUser());
    const getReserve = async () => {
      if (reserveId && typeof reserveId === 'string') {
        const reserv = await getOneReserve(reserveId);
        setReserve(reserv);
      }
    };
    getReserve();
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
            {!branch ? (
              <>
                <p className='text-sm font-semibold'>Seleccioná una sucursal</p>
                <div className='flex flex-col'>
                  <div className='h-26 flex flex-row items-center'>
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
                  </div>
                </div>
              </>
            ) : selectedDate === true ? (
              <>
                <p className='text-sm font-semibold'>Completá el formulario</p>
                <div className='flex flex-col'>
                  <div className='h-26 flex flex-row items-center'>
                    <Step icon='check' text='Elegí tu sucursal' />
                    <Step icon='check' text='Seleccioná el día' />
                    <Step
                      icon='3'
                      text='Completá el formulario'
                      bgColor='bg-cruce'
                      textColor='text-cruce'
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className='text-sm font-semibold'>
                  Seleccioná el día en el calendario
                </p>
                <div className='flex flex-col'>
                  <div className='h-26 flex flex-row items-center'>
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
                  </div>
                </div>
              </>
            )}
              <ReservePanelForm
                handleSubmit={handleSubmit}
                branch={branch}
                setBranch={setBranch}
                shifts={shifts}
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
                edit={true}
              />
          </div>
          {branch ? (
            <CalendarContainer>
              <Calendar
                calendarType={'US'}
                defaultView={'month'}
                locale={'es-ES'}
                value={date}
                onClickDay={(e: Date) => {
                  setDate(e);
                  setSelectedDate(true);
                }}
              />
            </CalendarContainer>
          ) : (
            <CalendarContainerDisabled>
              <Calendar
                calendarType={'US'}
                defaultView={'month'}
                locale={'es-ES'}
                value={date}
                onClickDay={(e: Date) => {
                  setDate(e);
                  setSelectedDate(true);
                }}
              />
            </CalendarContainerDisabled>
          )}
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='flex flex-col items-center'>
          {type === 1 ? (
            <>
              <Image
                src={rightCheckbox}
                alt='success'
                className='w-10 h-10 mb-7'
              />
              <h1 className='text-ln font-bold'>Turno modificado con éxito</h1>
              <p className='text-sm font-normal mt-1'>Gracias por confiar en nuestro servicio</p>
            </>
          ) : type === 2 ? (
            <>
              <Image
                src={wrongCheckbox}
                alt='error'
                className='w-10 h-10 mb-7'
              />
              <>
                <h1 className='text-ln font-bold'>No se pudo realizar el cambio</h1>
                <p className='text-sm font-normal mt-1'>
                  Este turno ya fue ocupado, vuelve a intentarlo más tarde o
                  modificando algún parámetro
                </p>
              </>
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default ReservePanel;
