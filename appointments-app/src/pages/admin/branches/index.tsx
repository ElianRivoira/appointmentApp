import React, { useState } from 'react';
import { hasCookie } from 'cookies-next';
import { useQuery } from '@tanstack/react-query';

import List from '@/components/List';
import { getBranches } from '@/services/branches';
import Modal from '@/commons/Modal';
import { checkLocalStorage } from '@/utils/localStorage';
import Spinner2 from '@/components/General/Spinner2';
import Head from 'next/head';

const branches = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);

  const branches = useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
    enabled: checkLocalStorage('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  if (branches.isLoading) return <Spinner2 />;

  return (
    <>
      <Head>
        <title>Admin Appointments - Sucursales</title>
      </Head>
      <div className='mt-12 mx-24 pb-16'>
        <h1 className='font-semibold text-xl mb-6'>Sucursales</h1>
        <div>
          {branches.data?.map(branch => (branch.name === '' ? <></> : <List branch={branch} key={branch._id} />))}
        </div>
        <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default branches;
