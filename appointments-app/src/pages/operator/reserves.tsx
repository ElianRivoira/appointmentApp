import React, { useState } from 'react';

import Reserve from '@/components/Reserve';
import { getBranch } from '@/services/branches';
import { useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';
import { getLoggedUser } from '@/services/users';
import Modal from '@/components/General/Modal';
import Spinner from '@/components/General/Spinner';
import Spinner3 from '@/components/Spinner3';
import Spinner2 from '@/components/Spinner2';

const Reserves = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);

  const loggedUser = useQuery({
    queryKey: ['loggedUser'],
    enabled: hasCookie('session'),
    queryFn: getLoggedUser,
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const branch = useQuery({
    queryKey: ['branch reserves'],
    queryFn: () => getBranch(loggedUser.data?.branch?._id),
    enabled: loggedUser.isSuccess,
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  if (branch.isLoading || loggedUser.isLoading) return <Spinner2 />;

  return (
    <>
      <div className='pt-12 px-24 pb-16'>
        <div className='font-semibold text-xl mb-6'>Reservas</div>
        {branch.data?.appointments?.map(reserve => {
          if (reserve.status === 'pending') {
            return <Reserve data={reserve} key={reserve._id} operatorView={true} refetchFunc={branch} />;
          }
        })}
        {!branch.data?.appointments.length ? <p className=''>No existen reservas pendientes para tu sucursal</p> : null}
      </div>
      <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Reserves;
