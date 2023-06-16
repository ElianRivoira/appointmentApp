import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import editIcon from '@/assets/icons/edit.svg';
import { cancelReserv, confirmReserve } from '@/services/appointments';
import Modal from '@/components/Modal';
import { useMutation } from '@tanstack/react-query';

interface Props {
  reserveId: string;
  view: string;
}

const Dropdown: React.FC<Props> = ({ reserveId, view }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const confirm = useMutation({
    mutationFn: confirmReserve,
    onSuccess: user => {
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const finish = useMutation({
    mutationFn: cancelReserv,
    onSuccess: user => {
      setMessage('Turno finalizado');
      setType(3);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  useEffect(() => {
    if ((type === 1 && open === false) || (type === 2 && open === false)) {
      router.reload();
    }
  }, [open]);

  return (
    <div className='relative'>
      <button
        className={`bg-grey1 hover:bg-grey2 text-cruce font-semibold text-lb rounded-lg ${
          view === 'user' ? 'w-[100px]' : view === 'operator' ? 'w-[150px]' : null
        } h-12 flex justify-center items-center active:shadow-active relative z-10`}
        onClick={() => setOpen(!open)}
      >
        <div className='ml-2 mr-3 font-semibold text-[15px]'>
          {view === 'user' ? 'Editar' : view === 'operator' ? 'Confirmación' : null}
        </div>
        <Image src={editIcon} alt='editIcon' className='w-4 h-4 mr-1'></Image>
      </button>

      {open ? (
        <>
          <button className='fixed w-full h-full inset-0 cursor-default' onClick={() => setOpen(false)}></button>
          <ul className='absolute z-20 left-0 w-32 mt-2 border rounded-lg bg-white shadow-xl'>
            {view === 'user' ? (
              <>
                <Link href={`./reservePanel/edit/${reserveId}`}>
                  <li className='py-2.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                    Editar
                  </li>
                </Link>
                <Link href={`./reservePanel/cancel/${reserveId}`}>
                  <li className='py-2.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                    Cancelar
                  </li>
                </Link>
              </>
            ) : view === 'operator' ? (
              <>
                <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                  <button onClick={() => confirm.mutate(reserveId)}>Confirmar</button>
                </li>
                <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                  <button onClick={() => finish.mutate(reserveId)}>Finalizar</button>
                </li>
                <Modal type={type} type3Message={message} errors={errors} open={open} onClose={() => setOpen(false)}>
                  <h1>Turno confirmado con éxito</h1>
                </Modal>
              </>
            ) : null}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default Dropdown;
