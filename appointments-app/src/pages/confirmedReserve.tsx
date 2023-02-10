import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import bigCheck from '../../public/icons/bigCheck.svg';
import llaveInglesa from '../../public/icons/llaveInglesa.svg';
import cruzRoja from '../../public/icons/cruzRoja.svg';

const confirmedReserve = () => {
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
              rober@e-cruce.com con todos los detalles de tu reservación.{' '}
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
              Reserva <span className='text-cruce'>#1043812955480-01</span>
            </p>
            <div className='font-semibold text-[#505050] text-sm mb-16'>
              Hecho el 10/03/2023 a las 11:35 hs para el 9/12/2023 a las 13:00
              hs
            </div>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <p
                  className='font-semibold text-base mb-3
                '
                >
                  Roberto Fonseca
                </p>
                <p className='text-sm text-[#505050] mb-1'>
                  <span className='font-medium'>Mail: </span>rober@e-cruce.com
                </p>
                <p className='text-sm text-[#505050]'>
                  <span className='font-medium'>Teléfono: </span>911
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
                  <span className='font-medium'>Sucursal: </span>Las Heras
                </p>
                <p className='text-sm text-[#505050]'>
                  <span className='font-medium'>Horario: </span>13:00 hs
                </p>
              </div>
            </div>
          </div>
          <div className='flex w-1/2 items-end flex-col'>
            <button className='bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg w-{186} px-8 h-11 mb-2 flex items-center'>
              <Image
                src={llaveInglesa}
                alt='llaveInglesa'
                className='mr-1.5'
              ></Image>
              Editar Reserva
            </button>
            <button className='bg-[#F5F5F5] hover:bg-cruceSecondaryHover text-red-500 font-semibold text-lb rounded-lg w-{186} px-[26px] h-11 flex items-center'>
              <Image
                src={cruzRoja}
                alt='cruzRoja'
                className='mr-1.5'
              ></Image>
              Cancelar reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default confirmedReserve;
