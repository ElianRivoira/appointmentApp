import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { deleteOneBranch, getBranch, updateBranch } from '@/services/branches';
import { NextPageContext } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';
import Modal from '@/components/General/Modal';

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
    enabled: hasCookie('session'),
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
    <div className='h-screen bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <div className='flex justify-between items-center mb-4'>
            <p className='font-bold text-xb'>Editar sucursal</p>
            <button
              onClick={handleDelete}
              className='h-11 px-6 py-3 rounded-lg bg-error font-semibold text-ls text-white active:shadow-active hover:bg-errorHover'
            >
              Eliminar
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username' className='text-sm font-medium'>
              Nombre
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
            />
            <label htmlFor='email' className='text-sm font-medium'>
              Correo electrónico
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3'
            />
            <div className='flex mb-3'>
              <div className='w-1/2 mr-4'>
                <label htmlFor='phone' className='text-sm font-medium'>
                  Teléfono
                </label>
                <input
                  type='tel'
                  name='phone'
                  id='phone'
                  value={phone}
                  onChange={e => setPhone(Number(e.target.value))}
                  required
                  className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
              <div className='w-1/2'>
                <label htmlFor='capacity' className='text-sm font-medium'>
                  Capacidad máxima
                </label>
                <input
                  type='number'
                  name='capacity'
                  id='capacity'
                  value={capacity}
                  onChange={e => setCapacity(Number(e.target.value))}
                  required
                  className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
            </div>
            <div className='flex mb-3'>
              <div className='w-1/2 mr-4'>
                <label htmlFor='openHour' className='text-sm font-medium'>
                  Horario de Inicio
                </label>
                <input
                  type='string'
                  name='openHour'
                  id='openHour'
                  value={openHour}
                  pattern='^(?:[0-5][0-9]):[0-5][0-9]$'
                  onChange={e => setOpenHour(e.target.value)}
                  required
                  className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
              <div className='w-1/2'>
                <label htmlFor='closeHour' className='text-sm font-medium'>
                  Horario de Cierre
                </label>
                <input
                  type='string'
                  name='closeHour'
                  id='closeHour'
                  value={closeHour}
                  pattern='^(?:[0-5][0-9]):[0-5][0-9]$'
                  onChange={e => setCloseHour(e.target.value)}
                  required
                  className='w-full border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 outline-none p-3'
                />
              </div>
            </div>
            <div className='flex mt-4'>
              <button
                type='submit'
                className=' bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'
                onClick={() => {}}
              >
                Enviar
              </button>
            </div>
          </form>
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
