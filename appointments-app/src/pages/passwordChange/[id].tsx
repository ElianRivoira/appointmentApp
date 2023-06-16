import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { NextPageContext } from 'next';
import { useMutation } from '@tanstack/react-query';

import { updatePassword } from '@/services/users';
import openEye from '@/assets/icons/openEye.svg';
import Modal from '@/components/Modal';

const passwordChange = ({ query }: MyPageProps) => {
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const id = query.id;

  const putPass = useMutation({
    mutationFn: updatePassword,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass1 === pass2 && typeof id === 'string') {
      putPass.mutate({ id, pass: pass1 });
    } else {
      setMessage('Las contraseñas deben coincidir');
      setType(3);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (type === 1 && open === false) {
      router.push({
        pathname: '/myData',
      });
    }
  }, [open]);

  return (
    <div className='h-screen bg-cruceBackground'>
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Cambiar contraseña</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='pass1' className='text-sm font-medium'>
              Contraseña
            </label>
            <div className='relative mb-3'>
              {}
              <input
                onChange={e => setPass1(e.target.value)}
                type={visible1 ? 'text' : 'password'}
                id='pass1'
                name='pass1'
                value={pass1}
                className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                required
              ></input>
              <div className='absolute inset-y-0 right-2 pl-3 flex items-center'>
                <button type='button' className='h-5 w-5 object-cover' onClick={() => setVisible1(!visible1)}>
                  <Image src={openEye} alt='ojito' className='w-4 h-4'></Image>
                </button>
              </div>
            </div>
            <label htmlFor='pass2' className='text-sm font-medium'>
              Repetir contraseña
            </label>
            <div className='relative mb-5'>
              {}
              <input
                onChange={e => setPass2(e.target.value)}
                type={visible2 ? 'text' : 'password'}
                id='pass2'
                name='pass2'
                value={pass2}
                className='w-full border border-solid border-grey-500 focus:border-cruce rounded-lg h-11 outline-none p-3'
                required
              ></input>
              <div className='absolute inset-y-0 right-2 pl-3 flex items-center'>
                <button type='button' className='h-5 w-5 object-cover' onClick={() => setVisible2(!visible2)}>
                  <Image src={openEye} alt='ojito' className='w-4 h-4'></Image>
                </button>
              </div>
            </div>
            <div className='flex mt-4'>
              <button
                type='submit'
                className='active:shadow-active bg-cruce hover:bg-cruceHover text-white font-semibold text-lb rounded-lg h-11 w-full'
              >
                Aceptar
              </button>
            </div>
          </form>
          <Modal type={type} errors={errors} open={open} type3Message={message} onClose={() => setOpen(false)}>
            <h1>Su contraseña ha sido actualizada correctamente</h1>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default passwordChange;

interface MyPageProps {
  query: {
    [key: string]: string;
  };
}

passwordChange.getInitialProps = async ({ query }: NextPageContext): Promise<MyPageProps> => {
  const castedQuery = query as unknown as MyPageProps['query'];
  return { query: castedQuery };
};
