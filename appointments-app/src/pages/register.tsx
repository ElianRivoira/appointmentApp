import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import flechitaIzq from '@/assets/icons/flechitaIzq.svg';
import rightCheckbox from '@/assets/icons/rightCheckbox.svg';
import wrongCheckbox from '@/assets/icons/wrongCheckbox.svg';
import Modal from '@/commons/Modal';
import { postUser } from '../services/users';
import { useMutation } from '@tanstack/react-query';
import Input from '@/commons/Input';
import PasswordInput from '@/commons/PasswordInput';
import Button from '@/commons/Button';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Register = () => {
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [mayus, setMayus] = useState(0);
  const [minus, setMinus] = useState(0);
  const [numb, setNumb] = useState(0);
  const [length, setLength] = useState(0);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [message, setMessage] = useState('');
  const [type3Img, setType3Img] = useState('');

  const router = useRouter();

  useEffect(() => {
    const hasUppercase = (str: string) => {
      return /[A-Z]/.test(str);
    };
    const hasLowercase = (str: string) => {
      return /[a-z]/.test(str);
    };
    const hasNumber = (str: string) => {
      return /\d/.test(str);
    };
    const enoughLength = (str: string) => {
      return str.length >= 8;
    };
    if (password.length === 0) {
      setMayus(0);
      setMinus(0);
      setNumb(0);
      setLength(0);
    }
    if (password.length > 0) {
      if (hasUppercase(password)) setMayus(1);
      else setMayus(0);
      if (hasLowercase(password)) setMinus(1);
      else setMinus(0);
      if (hasNumber(password)) setNumb(1);
      else setNumb(0);
      if (enoughLength(password)) setLength(1);
      else setLength(0);
    }
  }, [password]);

  const createUser = useMutation({
    mutationFn: postUser,
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

  const registerButton = (e: React.FormEvent) => {
    e.preventDefault();
    if (mayus === 1 && minus === 1 && numb === 1 && length === 1) {
      if (password !== passwordTwo) {
        setMessage('Las contraseñas deben coincidir');
        setType(3);
        setType3Img('error');
        setOpen(true);
      } else {
        let numberDni = Number(dni);
        createUser.mutate({ name, dni: numberDni, email, password });
      }
    } else {
      setMessage('La contraseña debe cumplir las condiciones');
      setType(3);
      setType3Img('error');
      setOpen(true);
    }
  };

  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleDni = (e: any) => {
    setDni(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handlePasswordTwo = (e: any) => {
    setPasswordTwo(e.target.value);
  };

  useEffect(() => {
    if (type === 1 && !open) {
      router.push({
        pathname: `/login`,
      });
    }
  }, [open]);

  return (
    <>
      <Head>
        <title>Appointments - Registro</title>
      </Head>
      <div className='flex justify-center'>
        <div className='flex flex-col p-8 px-12 w-3/4 max-w-screen-sm h-3/5 border-2 mt-8 rounded-xl shadow-xg bg-white'>
          <div className='flex w-full text-cruce font-semibold'>
            <Link href={'login'}>
              <button className='flex'>
                <Image src={flechitaIzq} alt='flechitaIzq' className='w-4 h-4 mr-1'></Image>
                <p className='flex -mt-1'>Atrás</p>
              </button>
            </Link>
          </div>
          <div className='flex justify-center mt-1'>
            <h3 className='font-semibold text-2xl mb-5'>Crear cuenta</h3>
          </div>
          <form onSubmit={registerButton}>
            <div className='w-full flex gap-4'>
              <div className='w-1/2 flex flex-col'>
                <Input
                  label='Nombre y Apellido'
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={handleName}
                  required
                />
              </div>
              <div className='w-1/2 flex flex-col'>
                <Input label='DNI' type='tel' name='dni' id='dni' value={dni} onChange={handleDni} required />
              </div>
            </div>
            <div className='flex flex-col'>
              <Input
                label='Email'
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={handleEmail}
                required
              />
            </div>
            <div className='flex gap-4'>
              <div className='w-1/2 flex flex-col'>
                <PasswordInput
                  label='Contraseña'
                  name='password'
                  id='password'
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </div>
              <div className='w-1/2 flex flex-col'>
                <PasswordInput
                  label='Repetir Contraseña'
                  name='password2'
                  id='password2'
                  value={passwordTwo}
                  onChange={handlePasswordTwo}
                  required
                />
              </div>
            </div>
            <div className='flex flex-col bg-[#F5F5F5] py-4 px-5 rounded-lg mt-4 mb-5'>
              <div className='font-medium text-xs mb-3'>
                <p className='mb-0.5'>La contraseña debe contener:</p>
                <hr />
              </div>
              <div className='w-full flex flex-col'>
                <div className='flex text-xs w-full mb-2'>
                  <div className='w-1/2 flex'>
                    <Image src={mayus > 0 ? rightCheckbox : wrongCheckbox} alt='x' className='w-4 h-4 mr-2'></Image>
                    <span className={`${mayus > 0 ? 'text-green-500' : 'text-red-500'}`}>ABC Una letra mayúscula</span>
                  </div>
                  <div className='w-1/2 flex'>
                    <Image src={minus > 0 ? rightCheckbox : wrongCheckbox} alt='x' className='w-4 h-4 mr-2'></Image>
                    <span className={`${minus > 0 ? 'text-green-500' : 'text-red-500'}`}>ABC Una letra minúscula</span>
                  </div>
                </div>
                <div className='flex text-xs'>
                  <div className='w-1/2 flex'>
                    <Image src={numb > 0 ? rightCheckbox : wrongCheckbox} alt='x' className='w-4 h-4 mr-2'></Image>
                    <span className={`${numb > 0 ? 'text-green-500' : 'text-red-500'}`}>123 Un número</span>
                  </div>
                  <div className='w-1/2 flex'>
                    <Image src={length > 0 ? rightCheckbox : wrongCheckbox} alt='x' className='w-4 h-4 mr-2'></Image>
                    <span className={`${length > 0 ? 'text-green-500' : 'text-red-500'}`}>*** Mínimo 8 caracteres</span>
                  </div>
                </div>
              </div>
            </div>
            {name && dni && email && password.length >= 8 && passwordTwo.length >= 8 ? (
              <Button type='submit'>Registrarme</Button>
            ) : (
              <Button type='submit' disabled>
                Registrarme
              </Button>
            )}
          </form>
          <hr className='w-full border-grey3 my-5' />
          <Link href='/login'>
            <button className='active:shadow-active bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce w-full font-semibold rounded-lg mb-5 h-11'>
              ¿Ya tenés cuenta? Iniciá Sesión
            </button>
          </Link>
        </div>
        <Modal
          type={type}
          errors={errors}
          open={open}
          type3Message={message}
          type3Img={type3Img}
          onClose={() => setOpen(false)}
        >
          <h1>Tu usuario ha sido creado satisfactoriamente</h1>
        </Modal>
      </div>
    </>
  );
};

export default Register;
