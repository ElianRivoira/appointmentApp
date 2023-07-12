import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';

import { getReserves } from '@/services/appointments';
import Reserve from '@/components/Reserve';
import { getLoggedUser } from '@/services/users';
import Modal from '@/commons/Modal';
import { checkLocalStorage } from '@/utils/localStorage';
import Spinner2 from '@/components/General/Spinner2';
import Head from 'next/head';

const Reserves = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);

  const loggedUser = useQuery({
    queryKey: ['loggedUser'],
    enabled: checkLocalStorage('session'),
    queryFn: getLoggedUser,
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const reserves = useQuery({
    queryKey: ['reserves user'],
    queryFn: () => getReserves(loggedUser.data?._id),
    enabled: loggedUser.isSuccess,
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  if (loggedUser.isLoading || reserves.isLoading) return <Spinner2 />;

  return (
    <>
      <Head>
        <title>Appointments - Reservas</title>
      </Head>
      <div className='pt-12 px-3 sm:px-12 lg:px-24 pb-16'>
        <div className='font-semibold text-xl mb-6'>Reservas</div>
        <div>
          {reserves.data?.map(reserve => (
            <Reserve data={reserve} key={reserve._id} operatorView={false} refetchFunc={reserves} />
          ))}
        </div>
        <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default Reserves;
