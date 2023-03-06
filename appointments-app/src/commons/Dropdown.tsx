import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import editIcon from '../../public/icons/edit.svg';
import { cancelReserv, confirmReserve } from '@/services/appointments';
import Modal from '@/components/Modal';
import rightCheckbox from '../../public/icons/rightCheckbox.svg';
import wrongCheckbox from '../../public/icons/wrongCheckbox.svg';

interface Props {
  reserveId: string;
  view: string;
}

const Dropdown: React.FC<Props> = ({ reserveId, view }) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(0);
  const router = useRouter();

  const confirm = () => {
    confirmReserve(reserveId)
      .then(() => {
        setType(1);
        setIsOpen(true);
      })
      .catch((e) => {
        setType(3);
        setIsOpen(true);
      });
  };

  const finish = () => {
    cancelReserv(reserveId)
      .then(() => {
        setType(2);
        setIsOpen(true);
      })
      .catch((e) => {
        setType(3);
        setIsOpen(true);
      });
  };

  useEffect(() => {
    if ((type === 1 && isOpen === false) || (type === 2 && isOpen === false)) {
      router.reload();
    }
  }, [isOpen]);

  return (
    <div className='relative'>
      <button
        className={`bg-grey1 hover:bg-grey2 text-cruce font-semibold text-lb rounded-lg ${
          view === 'user'
            ? 'w-[100px]'
            : view === 'operator'
            ? 'w-[150px]'
            : null
        } h-12 flex justify-center items-center active:shadow-active relative z-10`}
        onClick={() => setOpen(!open)}
      >
        <div className='ml-2 mr-3 font-semibold text-[15px]'>
          {view === 'user'
            ? 'Editar'
            : view === 'operator'
            ? 'Confirmación'
            : null}
        </div>
        <Image src={editIcon} alt='editIcon' className='w-4 h-4 mr-1'></Image>
      </button>

      {open ? (
        <>
          <button
            className='fixed w-full h-full inset-0 cursor-default'
            onClick={() => setOpen(false)}
          ></button>
          <ul className='absolute z-20 left-0 py-1.5 w-32 mt-2 border rounded-lg bg-white shadow-xl'>
            {view === 'user' ? (
              <>
                <Link href={`./reservePanel/edit/${reserveId}`}>
                  <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                    Editar
                  </li>
                </Link>
                <Link href={`./reservePanel/cancel/${reserveId}`}>
                  <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                    Cancelar
                  </li>
                </Link>
              </>
            ) : view === 'operator' ? (
              <>
                <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                  <button onClick={confirm}>Confirmar</button>
                </li>
                <li className='py-1.5 px-4 hover:bg-cruceHover hover:text-white rounded-lg text-sm font-semibold'>
                  <button onClick={finish}>Finalizar</button>
                </li>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                  <div className='flex flex-col items-center'>
                    {type === 1 ? (
                      <>
                        <Image
                          src={rightCheckbox}
                          alt='confirmed'
                          className='w-10 h-10 mb-7'
                        />
                        <h1 className='text-ln font-bold'>
                          Turno confirmado con éxito
                        </h1>
                      </>
                    ) : type === 2 ? (
                      <>
                        <Image
                          src={rightCheckbox}
                          alt='finished'
                          className='w-10 h-10 mb-7'
                        />
                        <h1 className='text-ln font-bold'>Turno finalizado</h1>
                      </>
                    ) : type === 3 ? (
                      <>
                        <Image
                          src={wrongCheckbox}
                          alt='error'
                          className='w-10 h-10 mb-7'
                        />
                        <h1 className='text-ln font-bold'>
                          Ha ocurrido un error
                        </h1>
                        <p className='text-sm font-normal mt-1'>
                          Vuelve a intentarlo más tarde
                        </p>
                      </>
                    ) : null}
                  </div>
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
