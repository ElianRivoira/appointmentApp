import React, { useState } from 'react';
import { hasCookie } from 'cookies-next';
import { useQuery } from '@tanstack/react-query';

import List from '@/components/List';
import { getOperators } from '@/services/operators';
import Modal from '@/commons/Modal';
import { checkLocalStorage } from '@/utils/localStorage';
import Spinner2 from '@/components/General/Spinner2';
import Head from 'next/head';

const Operators = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);

  const operators = useQuery({
    queryKey: ['operators'],
    queryFn: getOperators,
    enabled: checkLocalStorage('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  if (operators.isLoading) return <Spinner2 />;

  return (
    <>
      <Head>
        <title>Admin Appointments - Operadores</title>
      </Head>
      <div className='mt-12 mx-24 pb-16'>
        <h1 className='font-semibold text-xl mb-6'>Operadores</h1>
        <div>
          {operators.data?.map(oper => (
            <List user={oper} key={oper._id} />
          ))}
        </div>
        <Modal open={open} type={type} errors={errors} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default Operators;
