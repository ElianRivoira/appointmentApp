import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { getOneReserve } from '@/services/appointments';
import Navbar from '@/components/Navbar';
import bigCheck from '../../../public/icons/bigCheck.svg';
import llaveInglesa from '../../../public/icons/llaveInglesa.svg';
import cruzRoja from '../../../public/icons/cruzRoja.svg';

interface MyPageProps {
  query: {
    [key: string]: string | string[];
  };
}

const confirmedReserve = ({ query }: MyPageProps) => {
  const [reserve, setReserve] = useState<reserveUser>();
  const [creationDate, setCreationDate] = useState<string[]>([]);
  const [reserveDate, setReserveDate] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getReserve = async () => {
      if (query.id) {
        const idString = Array.isArray(query.id) ? query.id.join('') : query.id;
        const reserva = await getOneReserve(idString);
        setReserve(reserva);
      }
    };
    getReserve();
  }, []);

  useEffect(() => {
    if (reserve?.creationDate) {
      let currentDate: string = new Date(reserve.creationDate).toLocaleString(
        'en-GB',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }
      );
      let todayArray: string[] = currentDate.split(',');
      setCreationDate(todayArray);
    }

    if (reserve?.date) {
      let newDate = new Date(reserve.date).toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      let newDateArray: string[] = newDate?.split(',');
      setReserveDate(newDateArray);
    }
  }, [reserve]);

  return (
    <div className='h-screen'>
      <Navbar />
      <div className='mx-24'>
        <div className='flex flex-col items-center mt-9 mb-14'>
          <div className='mb-7'>
            <Image src={bigCheck} alt='bigCheck'></Image>
          </div>
          <div className='font-semibold text-2xl text-cruce mb-6'>
            !Gracias por tu reserva!
          </div>
          <div className='flex flex-col items-center text-[#505050] mb-6 font-normal text-sm'>
            <p>
              En hasta 5 minutos, recibirás un correo electrónico en
              {' ' + reserve?.email} con todos los detalles de tu reservación.{' '}
            </p>
            <p>Recordá revisar tu buzón de correo no deseado o promociones.</p>
          </div>
          <div>
            <button className=' bg-cruce hover:bg-cruceHover text-white w-96 font-semibold rounded-lg h-11'>
              ¿Quéres imprimir tu comprobante?
            </button>
          </div>
        </div>
        <hr className='mb-8' />
        <div className='flex w-full'>
          <div className='flex flex-col w-1/2'>
            <p
              className='font-semibold text-2xl mb-3
            '
            >
              Reserva <span className='text-cruce'>{'#' + reserve?.id}</span>
            </p>
            <div className='font-semibold text-[#505050] text-sm mb-16'>
              Hecho el{' '}
              {creationDate[0] +
                ' a las' +
                creationDate[1] +
                ' hs para el ' +
                reserveDate[0] +
                ' a las' +
                reserveDate[1] +
                ' hs'}
            </div>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <p
                  className='font-semibold text-base mb-3
                '
                >
                  {reserve?.name}
                </p>
                <p className='text-sm text-[#505050] mb-1'>
                  <span className='font-medium'>Mail: </span>
                  {reserve?.email}
                </p>
                <p className='text-sm text-[#505050]'>
                  <span className='font-medium'>Teléfono: </span>
                  {reserve?.phone}
                </p>
              </div>
              <div className='flex flex-col 2xl:mr-32'>
                <p
                  className='font-semibold text-base mb-3
                '
                >
                  Reserva
                </p>
                <p className='text-sm text-[#505050] mb-1'>
                  <span className='font-medium'>Sucursal: </span>
                  {reserve?.branch?.name}
                </p>
                <p className='text-sm text-[#505050]'>
                  <span className='font-medium'>Horario: </span>
                  {reserveDate[1]}
                </p>
              </div>
            </div>
          </div>
          <div className='flex w-1/2 items-end flex-col'>
            <button
              className='bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-{186} px-8 h-11 mb-2 flex items-center'
              onClick={() =>
                router.push({
                  pathname: `/reservePanel/edit/${reserve?._id}`,
                })
              }
            >
              <Image
                src={llaveInglesa}
                alt='llaveInglesa'
                className='mr-1.5'
              ></Image>
              Editar Reserva
            </button>
            <button
              className='bg-[#F5F5F5] hover:bg-cruceSecondaryHover text-red-500 font-semibold text-lb rounded-lg w-{186} px-[26px] h-11 flex items-center'
              onClick={() => {
                router.push({
                  pathname: `/reservePanel/cancel/${reserve?._id}`,
                });
              }}
            >
              <Image src={cruzRoja} alt='cruzRoja' className='mr-1.5'></Image>
              Cancelar reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

confirmedReserve.getInitialProps = async ({
  query,
}: NextPageContext): Promise<MyPageProps> => {
  const castedQuery = query as unknown as MyPageProps['query'];
  return { query: castedQuery };
};

export default confirmedReserve;
