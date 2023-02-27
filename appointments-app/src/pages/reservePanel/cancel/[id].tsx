import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar';
import flechitaIzq from '../../../../public/icons/flechitaIzq.svg';
import CancelOption from '@/components/CancelOption';
import { getOneReserve, cancelReserv } from '@/services/appointments';
import Modal from '@/components/Modal';
import rightCheckbox from '../../../../public/icons/rightCheckbox.svg';
import wrongCheckbox from '../../../../public/icons/wrongCheckbox.svg';

const cancelReserve = () => {
  const [reserve, setReserve] = useState<reserveUser>();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const router = useRouter();
  const reserveId = router.query.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reserveId && typeof reserveId === 'string') {
      cancelReserv(reserveId)
      .then(() => {
        setType(1)
        setOpen(true)
      })
      .catch((e) => {
        setType(2)
        setOpen(true)
      })
    }
  };

  useEffect(() => {
    if (type === 1 && open === false) {
      router.push({
        pathname: `/reserves`,
      });
    }
  }, [open]);

  useEffect(() => {
    const getReserve = async () => {
      if (reserveId && typeof reserveId === 'string') {
        const reserv = await getOneReserve(reserveId);
        setReserve(reserv);
      }
    };
    getReserve();
  }, []);

  return (
    <div className='h-screen'>
      <Navbar />
      <div className='flex mx-24 mt-6'>
        <div className='w-2/3'>
          <div className='flex w-full text-cruce font-semibold text-ss items-center'>
            <Link href={'login'} className='flex items-center'>
              <Image
                src={flechitaIzq}
                alt='flechitaIzq'
                className='w-3 h-3 mr-1.5'
              ></Image>
              <p className='flex'>Atrás</p>
            </Link>
          </div>
          <h1 className='mt-2.5 font-bold text-2xl'>Cancelar Reserva</h1>
          <p className='mt-8 font-normal text-ss'>Hola {reserve?.name}</p>
          <p className='mt-3 mb-6 font-semibold text-lb'>
            ¿Por qué desea cancelar su reserva?
          </p>
          <form onSubmit={handleSubmit}>
            <CancelOption id='1'>Ya no quiero ir</CancelOption>
            <CancelOption id='2'>Me equivoqué de horario</CancelOption>
            <CancelOption id='3'>Encontré un lugar mejor</CancelOption>
            <CancelOption id='4'>Me cancelaron</CancelOption>
            <CancelOption id='5'>Otro</CancelOption>
          </form>
        </div>
        <div className='w-1/3 ml-[115px] mt-6'>
          <p className='text-xm'>Informacion de la reserva</p>
          <h1 className='mt-2 mb-4 font-bold text-lx'>{reserve?.name}</h1>
          <p className='text-ss font-semibold'>
            Día:{' '}
            {reserve ? (
              <span className='font-normal'>
                {new Date(reserve.date).toLocaleString().split(',')[0]}
              </span>
            ) : null}
          </p>
          <p className='text-ss font-semibold my-2'>
            Horario:{' '}
            {reserve ? (
              <span className='font-normal'>
                {new Date(reserve.date).toLocaleString().split(',')[1]}
              </span>
            ) : null}
          </p>
          <p className='text-ss font-semibold'>
            Sucursal: <span className='font-normal'>{reserve?.branch}</span>
          </p>
          <hr className='mt-4' />
        </div>
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
              <h1 className='text-ln font-bold'>Turno eliminado con éxito</h1>
              <p className='text-sm font-normal mt-1'>Esperamos recibirlo en otra oportunidad</p>
            </>
          ) : type === 2 ? (
            <>
              <Image
                src={wrongCheckbox}
                alt='error'
                className='w-10 h-10 mb-7'
              />
              <>
                <h1 className='text-ln font-bold'>No se pudo eliminar el turno</h1>
                <p className='text-sm font-normal mt-1'>
                  Vuelve a intentarlo más tarde
                </p>
              </>
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default cancelReserve;
