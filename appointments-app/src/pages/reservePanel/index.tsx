import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';

import { CalendarContainer, CalendarContainerDisabled } from '@/components/Calendar';
import Step from '@/commons/Step';
import ReservePanelForm from '@/components/ReservePanelForm';
import { postReserve } from '@/services/appointments';
import CountDown from '@/components/CountDown';
import Modal from '@/components/Modal';
import { getBranchByName, getBranches } from '@/services/branches';
import { getLoggedUser } from '@/services/users';
import formatTime from '@/utils/formatTime';

const ReservePanel = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(false);
  const [branch, setBranch] = useState('');
  const [branchObject, setBranchObject] = useState<Branch>();
  const [name, setName] = useState('');
  const [shifts, setShifts] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [countDown, setCountDown] = useState('');
  const [start, setStart] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [reserveId, setReserveId] = useState('');
  const router = useRouter();

  const loggedUser = useQuery({
    queryKey: ['loggedUser'],
    enabled: hasCookie('session'),
    queryFn: getLoggedUser,
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const branches = useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
    enabled: hasCookie('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const createReserve = useMutation({
    mutationFn: postReserve,
    onSuccess: reserve => {
      setReserveId(reserve._id);
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    loggedUser.data && createReserve.mutate({ date, branch, name, phone, email, userId: loggedUser.data._id });
  };

  useEffect(() => {
    if (type === 1 && open === false) {
      router.push({
        pathname: `/confirmedReserve/${reserveId}`,
      });
    }
  }, [open]);

  useEffect(() => {
    if (branch) {
      setStart(true);
      const branchByName = async () => {
        let branchByName = await getBranchByName(branch);
        setBranchObject(branchByName);
      };
      branchByName();
    }
  }, [branch]);

  useEffect(() => {
    let findDate = date.toLocaleDateString();
    if (branchObject) {
      // console.log(branchObject)
      // console.log(findDate)
      // console.log(branchObject.shifts[findDate])
      setShifts(branchObject.shifts[findDate]);
    }
  }, [date]);

  return (
    <div className='h-screen bg-cruceBackground'>
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
                    <Step icon='1' text='Elegí tu sucursal' bgColor='bg-cruce' textColor='text-cruce' />
                    <Step icon='2' text='Seleccioná el día' bgColor='bg-grey4' textColor='text-grey4' />
                    <Step icon='3' text='Completá el formulario' bgColor='bg-grey4' textColor='text-grey4' />
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
                    <Step icon='3' text='Completá el formulario' bgColor='bg-cruce' textColor='text-cruce' />
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className='text-sm font-semibold'>Seleccioná el día en el calendario</p>
                <div className='flex flex-col'>
                  <div className='h-26 flex flex-row items-center'>
                    <Step icon='check' text='Elegí tu sucursal' />
                    <Step icon='2' text='Seleccioná el día' bgColor='bg-cruce' textColor='text-cruce' />
                    <Step icon='3' text='Completá el formulario' bgColor='bg-grey4' textColor='text-grey4' />
                  </div>
                </div>
              </>
            )}
            <ReservePanelForm
              handleSubmit={handleSubmit}
              branches={branches.data}
              branch={branch}
              shifts={shifts}
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
              edit={false}
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
      <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)}>
        <h1 className='text-ln font-bold'>Turno reservado con éxito</h1>
        <p className='text-sm font-normal mt-1'>Gracias por confiar en nuestro servicio</p>
      </Modal>
    </div>
  );
};

export default ReservePanel;
