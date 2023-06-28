import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';

import Modal from '@/components/General/Modal';
import rightCheckbox from '@/assets/icons/rightCheckbox.svg';
import wrongCheckbox from '@/assets/public/icons/wrongCheckbox.svg';
import { getBranches } from '@/services/branches';
import { getOneOperator } from '@/services/operators';
import OperatorsForm from '@/components/OperatorsForm';
import { updateUser } from '@/services/users';
import { NextPageContext } from 'next';
import { hasCookie } from 'cookies-next';

const CreateOperators = ({ query }: MyPageProps) => {
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
  const operatorId = query.id;

  const updateOperator = useMutation({
    mutationFn: updateUser,
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

  const branches = useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
    enabled: hasCookie('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const operator = useQuery({
    queryKey: ['operator', operatorId],
    queryFn: () => getOneOperator(operatorId),
    enabled: hasCookie('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateOperator.mutate({
      id: operatorId,
      name,
      email,
      dni,
      branch,
      phone,
    });
  };

  useEffect(() => {
    if (operator.data) {
      setName(operator.data.name);
      setEmail(operator.data.email);
      setDni(operator.data.dni);
      if (operator.data.phone) {
        setPhone(operator.data.phone);
      }
      if (operator.data.branch) {
        setBranch(operator.data.branch.name);
      }
    }
  }, [operator.isRefetching, operator.isSuccess]);

  useEffect(() => {
    if (type === 1 && open === false) {
      router.push({
        pathname: `/admin/operators`,
      });
    }
  }, [open]);

  return (
    <div className='h-screen bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Edición de operador</p>
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
            edit={true}
          />
        </div>
        <Modal open={open} type={type} errors={errors} onClose={() => setOpen(false)}>
          <h1>Operador modificado con éxito</h1>
        </Modal>
      </div>
    </div>
  );
};

export default CreateOperators;

interface MyPageProps {
  query: {
    [key: string]: string;
  };
}

CreateOperators.getInitialProps = async ({ query }: NextPageContext): Promise<MyPageProps> => {
  const castedQuery = query as unknown as MyPageProps['query'];
  return { query: castedQuery };
};
