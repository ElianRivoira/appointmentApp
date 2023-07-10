import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';

import Modal from '@/commons/Modal';
import { createOperator } from '@/services/operators';
import { getBranches } from '@/services/branches';
import OperatorsForm from '@/components/OperatorsForm';
import { checkLocalStorage } from '@/utils/localStorage';
import { useRouter } from 'next/router';

const CreateOperators = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [branch, setBranch] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState(0);
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState('');

  const router = useRouter();

  const postOperator = useMutation({
    mutationFn: createOperator,
    onSuccess: operator => {
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    postOperator.mutate({ name, email, dni, password, branch, phone });
  };

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

  useEffect(() => {
      if ((type === 1 && !open)) {
        router.push({
          pathname: `/admin/operators`,
        });
      }
    }, [open]);

  return (
    <div className='bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Creación de operadores</p>
          <OperatorsForm
            handleSubmit={handleSubmit}
            branches={branches.data}
            branch={branch}
            setBranch={setBranch}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            dni={dni}
            setDni={setDni}
            password={password}
            setPassword={setPassword}
            edit={false}
          />
        </div>
        <Modal open={open} type={type} errors={errors} onClose={() => setOpen(false)}>
          <h1>Operador creado con éxito</h1>
        </Modal>
      </div>
    </div>
  );
};

export default CreateOperators;
