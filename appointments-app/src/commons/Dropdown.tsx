import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UseQueryResult, useMutation } from '@tanstack/react-query';

import editIcon from '@/assets/icons/edit.svg';
import { cancelReserv, confirmReserve } from '@/services/appointments';
import Modal from '@/components/General/Modal';
import Spinner from '@/components/General/Spinner';
import Spinner3 from '@/components/Spinner3';
import Spinner2 from '@/components/Spinner2';

interface Props {
  reserveId: string;
  view: string;
  refetchFunc: UseQueryResult<Branch, any>;
}

const Dropdown: React.FC<Props> = ({ reserveId, view, refetchFunc }) => {
  const [openDrop, setOpenDrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [message, setMessage] = useState('');

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
    if ((type === 1 && open === false) || (type === 3 && open === false)) {
      refetchFunc.refetch();
    }
  }, [open]);

  if (finish.isLoading || confirm.isLoading)
    return (
      <>
        <div className='fixed inset-0 bg-black/[.75] z-50' />
        <div className='fixed top-2/4 lgMax:left-3 lgMax:right-3 lg:left-2/4 -translate-y-2/4 lg:-translate-x-2/4 z-50'>
          <Spinner2 />
        </div>
      </>
    );

  return (
    <div className='relative'>
      <button
        className={`bg-grey1 hover:bg-grey2 text-cruce font-semibold text-lb rounded-lg ${
          view === 'user' ? 'w-[100px]' : view === 'operator' ? 'w-[150px]' : null
        } h-12 flex justify-center items-center active:shadow-active relative z-10`}
        onClick={() => setOpenDrop(!openDrop)}
      >
        <div className='ml-2 mr-3 font-semibold text-[15px]'>
          {view === 'user' ? 'Editar' : view === 'operator' ? 'Confirmación' : null}
        </div>
        <Image src={editIcon} alt='editIcon' className='w-4 h-4 mr-1'></Image>
      </button>

      {openDrop ? (
        <>
          <button
            className='fixed w-full h-full inset-0 cursor-default z-20'
            onClick={() => setOpenDrop(false)}
          ></button>
          <ul className='absolute z-20 left-0 w-32 mt-2 mb-10 border rounded-lg bg-white shadow-xl'>
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
                <li className='py-2.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold cursor-pointer'>
                  <button onClick={() => confirm.mutate(reserveId)}>Confirmar</button>
                </li>
                <li className='py-2.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold cursor-pointer'>
                  <button onClick={() => finish.mutate({ id: reserveId, cancelReason: 'Finished by an operator' })}>
                    Finalizar
                  </button>
                </li>
              </>
            ) : null}
          </ul>
          <Modal type={type} type3Message={message} errors={errors} open={open} onClose={() => setOpen(false)}>
            <h1>Turno confirmado con éxito</h1>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

export default Dropdown;
