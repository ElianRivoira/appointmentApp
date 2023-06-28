import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { hasCookie } from 'cookies-next';
import { useMutation, useQuery } from '@tanstack/react-query';

import flechitaIzq from '@/assets/icons/flechitaIzq.svg';
import CancelOption from '@/components/CancelOption';
import { getOneReserve, cancelReserv } from '@/services/appointments';
import Modal from '@/components/General/Modal';
import cancelReasons from '@/utils/cancelReasons';

const cancelReserve = ({ query }: MyPageProps) => {
  const [cancelReason, setCancelReason] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const router = useRouter();
  const reserveId = query.id;

  const cancelReserve = useMutation({
    mutationFn: cancelReserv,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cancelReserve.mutate({ id: reserveId, cancelReason });
  };

  useEffect(() => {
    if (type === 1 && open === false) {
      router.push({
        pathname: `/reserves`,
      });
    }
  }, [open]);

  const reserve = useQuery({
    queryFn: () => getOneReserve(reserveId),
    queryKey: ['reserve', reserveId],
    enabled: hasCookie('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  return (
    <>
      <div className='flex mx-24 mt-6'>
        <div className='w-2/3'>
          <div className='flex w-full text-cruce font-semibold text-ss items-center'>
            <Link href={'/reserves'} className='flex items-center'>
              <Image src={flechitaIzq} alt='flechitaIzq' className='w-3 h-3 mr-1.5' />
              <p className='flex'>Atrás</p>
            </Link>
          </div>
          <h1 className='mt-2.5 font-bold text-2xl'>Cancelar Reserva</h1>
          <p className='mt-8 font-normal text-ss'>Hola {reserve.data?.name}</p>
          <p className='mt-3 mb-6 font-semibold text-lb'>¿Por qué desea cancelar su reserva?</p>
          <form onSubmit={handleSubmit}>
            <fieldset>
              {cancelReasons.map((reason, index) => (
                <CancelOption
                  key={index}
                  id={index.toString()}
                  cancelReason={cancelReason}
                  setCancelReason={setCancelReason}
                  label={reason}
                />
              ))}
            </fieldset>
          </form>
        </div>
        <div className='w-1/3 ml-[115px] mt-6'>
          <p className='text-xm'>Información de la reserva</p>
          <h1 className='mt-2 mb-4 font-bold text-lx'>{reserve.data?.name}</h1>
          <p className='text-ss font-semibold'>
            Día:{' '}
            {reserve.data ? (
              <span className='font-normal'>{new Date(reserve.data.date).toLocaleString().split(',')[0]}</span>
            ) : null}
          </p>
          <p className='text-ss font-semibold my-2'>
            Horario:{' '}
            {reserve.data ? (
              <span className='font-normal'>{new Date(reserve.data.date).toLocaleString().split(',')[1]}</span>
            ) : null}
          </p>
          <p className='text-ss font-semibold'>
            Sucursal: <span className='font-normal'>{reserve.data?.branch.name}</span>
          </p>
          <hr className='mt-4' />
        </div>
        {/* <div className='flex items-center justify-center'> */}
        {/* </div> */}
      </div>
      <Modal type={type} open={open} errors={errors} onClose={() => setOpen(false)}>
        <h1 className='text-ln font-bold'>Turno eliminado con éxito</h1>
        <p className='text-sm font-normal mt-1'>Esperamos recibirlo en otra oportunidad</p>
      </Modal>
    </>
  );
};

export default cancelReserve;

interface MyPageProps {
  query: {
    [key: string]: string;
  };
}

cancelReserve.getInitialProps = async ({ query }: NextPageContext): Promise<MyPageProps> => {
  const castedQuery = query as unknown as MyPageProps['query'];
  return { query: castedQuery };
};
