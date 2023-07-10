import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';

import { deleteOneBranch, getBranch, updateBranch } from '@/services/branches';
import Modal from '@/commons/Modal';
import BranchesForm from '@/components/BranchesForm';
import { checkLocalStorage } from '@/utils/localStorage';
import Button from '@/commons/Button';

const EditBranch = ({ query }: MyPageProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [phone, setPhone] = useState(0);
  const [openHour, setOpenHour] = useState('');
  const [closeHour, setCloseHour] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [message, setMessage] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const router = useRouter();
  const branchId = query.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    putBranchOffice.mutate({
      id: branchId,
      name,
      email,
      capacity,
      phone,
      openHour,
      closeHour,
    });
  };

  const putBranchOffice = useMutation({
    mutationFn: updateBranch,
    onSuccess: branch => {
      setType(1);
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const branch = useQuery({
    queryKey: ['branch', branchId],
    queryFn: () => getBranch(branchId),
    enabled: checkLocalStorage('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const deleteBranch = useMutation({
    mutationFn: deleteOneBranch,
    onSuccess: user => {
      setType(3);
      setMessage('La Sucursal ha sido eliminada con éxito');
      setOpen(true);
    },
    onError: (err: any) => {
      setType(2);
      setErrors(err.response.data.errors);
      setOpen(true);
    },
  });

  const handleDelete = () => {
    setType(4);
    setDeleteMsg('¿Está seguro que desea eliminar esta Sucursal?');
    setOpen(true);
  };

  useEffect(() => {
    if (branch.data) {
      setName(branch.data.name);
      setEmail(branch.data.email);
      setCapacity(branch.data.capacity);
      setPhone(branch.data.phone);
      setOpenHour(branch.data.openHour);
      setCloseHour(branch.data.closeHour);
    }
  }, [branch.isSuccess, branch.isRefetching]);

  useEffect(() => {
    if ((type === 1 && !open) || (type === 3 && !open)) {
      router.push({
        pathname: `/admin/branches`,
      });
    }
  }, [open]);

  return (
    <div className='bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <div className='flex justify-between items-center mb-4'>
            <p className='font-bold text-xb'>Editar sucursal</p>
            <Button type='button' onClick={handleDelete} style='bg-error hover:bg-errorHover w-fit px-6'>
              Eliminar
            </Button>
          </div>
          <BranchesForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            capacity={capacity}
            setCapacity={setCapacity}
            phone={phone}
            setPhone={setPhone}
            openHour={openHour}
            setOpenHour={setOpenHour}
            closeHour={closeHour}
            setCloseHour={setCloseHour}
          />
        </div>
        <Modal
          open={open}
          type={type}
          type3Message={message}
          deleteMessage={deleteMsg}
          deleteFunc={() => deleteBranch.mutate(branchId)}
          errors={errors}
          onClose={() => setOpen(false)}
        >
          <h1>Sucursal modificada con éxito</h1>
        </Modal>
      </div>
    </div>
  );
};

export default EditBranch;

interface MyPageProps {
  query: {
    [key: string]: string;
  };
}

EditBranch.getInitialProps = async ({ query }: NextPageContext): Promise<MyPageProps> => {
  const castedQuery = query as unknown as MyPageProps['query'];
  return { query: castedQuery };
};
