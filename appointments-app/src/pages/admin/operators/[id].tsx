import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { hasCookie } from 'cookies-next';

import Modal from '@/commons/Modal';
import { getBranches } from '@/services/branches';
import { deleteOneOperator, getOneOperator } from '@/services/operators';
import OperatorsForm from '@/components/OperatorsForm';
import { updateUser } from '@/services/users';
import { checkLocalStorage } from '@/utils/localStorage';
import Button from '@/commons/Button';

const EditOperators = ({ query }: MyPageProps) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [branch, setBranch] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState(0);
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const [message, setMessage] = useState('');
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

  const deleteOperator = useMutation({
    mutationFn: deleteOneOperator,
    onSuccess: user => {
      setType(3);
      setMessage('El Operador ha sido eliminado con éxito');
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
    enabled: checkLocalStorage('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const operator = useQuery({
    queryKey: ['operator', operatorId],
    queryFn: () => getOneOperator(operatorId),
    enabled: checkLocalStorage('session'),
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

  const handleDelete = () => {
    setType(4);
    setDeleteMsg('¿Está seguro que desea eliminar este Operador?');
    setOpen(true);
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
    if ((type === 1 && !open) || (type === 3 && !open)) {
      router.push({
        pathname: `/admin/operators`,
      });
    }
  }, [open]);

  return (
    <div className='h-screen bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <div className='flex justify-between items-center mb-4'>
            <p className='font-bold text-xb'>Edición de operador</p>
            <Button type='button' onClick={handleDelete} style='bg-error hover:bg-errorHover w-fit px-6'>
              Eliminar
            </Button>
          </div>
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
        <Modal
          open={open}
          type={type}
          type3Message={message}
          deleteMessage={deleteMsg}
          deleteFunc={() => deleteOperator.mutate(operatorId)}
          errors={errors}
          onClose={() => setOpen(false)}
        >
          <h1>Operador modificado con éxito</h1>
        </Modal>
      </div>
    </div>
  );
};

export default EditOperators;

interface MyPageProps {
  query: {
    [key: string]: string;
  };
}

EditOperators.getInitialProps = async ({ query }: NextPageContext): Promise<MyPageProps> => {
  const castedQuery = query as unknown as MyPageProps['query'];
  return { query: castedQuery };
};
