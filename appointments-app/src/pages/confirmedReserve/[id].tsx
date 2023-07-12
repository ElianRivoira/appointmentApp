import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';

import { getOneReserve, printProof } from '@/services/appointments';
import bigCheck from '@/assets/icons/bigCheck.svg';
import llaveInglesa from '@/assets/icons/llaveInglesa.svg';
import cruzRoja from '@/assets/icons/cruzRoja.svg';
import Modal from '@/commons/Modal';
import { checkLocalStorage } from '@/utils/localStorage';
import Button from '@/commons/Button';
import useMediaQuery from '@/hooks/useMediaQuery';
import Head from 'next/head';

const confirmedReserve = ({ query }: MyPageProps) => {
  const [creationDate, setCreationDate] = useState<string[]>([]);
  const [reserveDate, setReserveDate] = useState<string[]>([]);
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

  useEffect(() => {
    if (reserve.data?.creationDate) {
      let currentDate = new Date(reserve.data.creationDate).toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      let todayArray = currentDate.split(',');
      setCreationDate(todayArray);
    }

    if (reserve.data?.date) {
      let newDate = new Date(reserve.data.date).toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      let newDateArray = newDate?.split(',');
      setReserveDate(newDateArray);
    }
  }, [reserve.isSuccess, reserve.isRefetching]);

  return (
    <>
      <Head>
        <title>Appointments - Confirmación</title>
      </Head>
      <div className=''>
        <div className='md:px-24 px-4'>
          <div className='flex flex-col w-full items-center mt-9 mb-14'>
            <div className='mb-7'>
              <Image src={bigCheck} alt='bigCheck'></Image>
            </div>
            <h1 className='font-semibold text-2xl text-cruce mb-6'>¡Gracias por tu reserva!</h1>
            <div className='text-[#505050] mb-6 font-normal text-sm text-center'>
              <p className=''>
                En hasta 5 minutos, recibirás un correo electrónico en
                {' ' + reserve.data?.email} con todos los detalles de tu reservación.{' '}
              </p>
              <p className=''>Recordá revisar tu buzón de correo no deseado o promociones.</p>
            </div>
            <div>
              <Button type='button' onClick={() => printProof(reserve.data)} style='px-6'>
                ¿Querés imprimir tu comprobante?
              </Button>
            </div>
          </div>
          <hr className='mb-8 border-grey4' />
          <div className='flex w-full justify-between'>
            <div className='flex flex-col w-full sm:w-fit md:w-1/2 smMax:items-center smMax:px-3'>
              <h3 className='font-semibold text-2xl mb-3 text-center'>
                Reserva <span className='text-cruce'>{'#' + reserve.data?.id}</span>
              </h3>
              <p className='font-semibold text-[#505050] text-sm mb-8 md:mb-16 text-center'>
                Hecho el{' '}
                {creationDate[0] +
                  ' a las' +
                  creationDate[1] +
                  ' hs para el ' +
                  reserveDate[0] +
                  ' a las' +
                  reserveDate[1] +
                  ' hs'}
              </p>
              <div className='flex smMax:justify-around justify-between w-full'>
                <div className='flex flex-col'>
                  <p className='font-semibold text-base mb-3'>{reserve.data?.name}</p>
                  <p className='text-sm text-[#505050] mb-1'>
                    <span className='font-medium'>Mail: </span>
                    {reserve.data?.email}
                  </p>
                  <p className='text-sm text-[#505050]'>
                    <span className='font-medium'>Teléfono: </span>
                    {reserve.data?.phone}
                  </p>
                </div>
                <div className='flex flex-col 2xl:mr-32'>
                  <p className='font-semibold text-base mb-3'>Reserva</p>
                  <p className='text-sm text-[#505050] mb-1'>
                    <span className='font-medium'>Sucursal: </span>
                    {reserve.data?.branch?.name}
                  </p>
                  <p className='text-sm text-[#505050]'>
                    <span className='font-medium'>Horario: </span>
                    {reserveDate[1]}
                  </p>
                </div>
              </div>
            </div>
            {!useMediaQuery(660) ? (
              <div className='flex md:w-1/2 w-fit items-end flex-col'>
                <button
                  className='bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-{186} px-8 h-11 mb-2 flex items-center'
                  onClick={() =>
                    router.push({
                      pathname: `/reservePanel/edit/${reserve.data?._id}`,
                    })
                  }
                >
                  <Image src={llaveInglesa} alt='llaveInglesa' className='mr-1.5'></Image>
                  Editar Reserva
                </button>
                <button
                  className='bg-[#F5F5F5] hover:bg-cruceSecondaryHover text-red-500 font-semibold text-lb rounded-lg w-{186} px-[26px] h-11 flex items-center'
                  onClick={() => {
                    router.push({
                      pathname: `/reservePanel/cancel/${reserve.data?._id}`,
                    });
                  }}
                >
                  <Image src={cruzRoja} alt='cruzRoja' className='mr-1.5'></Image>
                  Cancelar reserva
                </button>
              </div>
            ) : null}
          </div>
          {useMediaQuery(660) ? (
            <div className='flex justify-center gap-6 mt-10'>
              <button
                className='bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-ss rounded-lg w-{186} px-4 md:px-8 h-11 mb-2 flex items-center'
                onClick={() =>
                  router.push({
                    pathname: `/reservePanel/edit/${reserve.data?._id}`,
                  })
                }
              >
                <Image src={llaveInglesa} alt='llaveInglesa' className='mr-1.5'></Image>
                Editar Reserva
              </button>
              <button
                className='bg-white hover:bg-cruceSecondaryHover text-red-500 font-semibold text-ss rounded-lg w-{186} px-[13px] md:px-[26px] h-11 flex items-center'
                onClick={() => {
                  router.push({
                    pathname: `/reservePanel/cancel/${reserve.data?._id}`,
                  });
                }}
              >
                <Image src={cruzRoja} alt='cruzRoja' className='mr-1.5'></Image>
                Cancelar reserva
              </button>
            </div>
          ) : null}
          <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
};

interface MyPageProps {
  query: {
    [key: string]: string;
  };
}

confirmedReserve.getInitialProps = async ({ query }: NextPageContext): Promise<MyPageProps> => {
  const castedQuery = query as unknown as MyPageProps['query'];
  return { query: castedQuery };
};

export default confirmedReserve;
