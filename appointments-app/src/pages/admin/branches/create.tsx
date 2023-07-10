import React, { useEffect, useState } from 'react';
import { postBranch } from '@/services/branches';
import { useMutation } from '@tanstack/react-query';
import Modal from '@/commons/Modal';
import { useRouter } from 'next/router';
import BranchesForm from '@/components/BranchesForm';

const createBranch = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [phone, setPhone] = useState(0);
  const [openHour, setOpenHour] = useState('');
  const [closeHour, setCloseHour] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const router = useRouter();

  const postBranchOffice = useMutation({
    mutationFn: postBranch,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postBranchOffice.mutate({ name, email, phone, capacity, openHour, closeHour });
  };

  useEffect(() => {
    if (!open && type === 1) router.push('/admin/branches');
  }, [open]);

  return (
    <div className=' bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Creación de sucursales</p>
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
      </div>
      <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)}>
        <h1>Sucursal creada con éxito</h1>
      </Modal>
    </div>
  );
};

export default createBranch;
