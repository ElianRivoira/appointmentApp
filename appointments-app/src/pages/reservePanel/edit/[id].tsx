import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';

import { CalendarContainer, CalendarContainerDisabled } from '@/components/ReservePanel/Calendar';
import Step from '@/components/ReservePanel/Step';
import ReservePanelForm from '@/components/ReservePanel/ReservePanelForm';
import { editReserve, getOneReserve } from '@/services/appointments';
import CountDown from '@/components/ReservePanel/CountDown';
import Modal from '@/commons/Modal';
import { getBranchByName, getBranches } from '@/services/branches';
import formatTime from '@/utils/formatTime';
import { checkLocalStorage } from '@/utils/localStorage';

const ReservePanel = ({ query }: MyPageProps) => {
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
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const router = useRouter();
  const reserveId = query.id;

  const reserve = useQuery({
    queryFn: () => getOneReserve(reserveId),
    queryKey: ['reserve', reserveId],
    enabled: checkLocalStorage('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const putReserve = useMutation({
    mutationFn: editReserve,
    onSuccess: reserve => {
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const branches = useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
    enabled: checkLocalStorage('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [hours, minutes] = time.split(':');
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    putReserve.mutate({ date, branch, name, phone, email, reserveId });
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
        branchByName && setShifts(branchByName.shifts[date.toLocaleDateString()]);
      };
      branchByName();
    }
  }, [branch]);

  useEffect(() => {
    if (reserve.data) {
      const formatedDate = new Date(reserve.data.date);
      setBranch(reserve.data.branch.name);
      setSelectedDate(true);
      setDate(formatedDate);
      setEmail(reserve.data.email);
      setPhone(reserve.data.phone.toString());
      setName(reserve.data.name);
      setTime(`${formatedDate.getHours()}:${formatedDate.getMinutes() === 0 ? '00' : formatedDate.getMinutes()}`);
    }
  }, [reserve.isSuccess, reserve.isRefetching]);

  return (
    <>
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
      <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)}>
        <h1 className='text-ln font-bold'>Turno modificado con éxito</h1>
        <p className='text-sm font-normal mt-1'>Gracias por confiar en nuestro servicio</p>
      </Modal>
    </>
  );
};

export default ReservePanel;

interface MyPageProps {
  query: {
    [key: string]: string;
  };
}

ReservePanel.getInitialProps = async ({ query }: NextPageContext): Promise<MyPageProps> => {
  const castedQuery = query as unknown as MyPageProps['query'];
  return { query: castedQuery };
};
