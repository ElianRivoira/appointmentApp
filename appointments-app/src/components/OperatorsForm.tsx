import React, { useState } from 'react';

import Input from '@/commons/Input';
import Select from '@/commons/Select';
import PasswordInput from '@/commons/PasswordInput';
import Button from '@/commons/Button';

interface OperatorFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  branches: Branch[] | undefined;
  branch: string;
  setBranch: (state: string) => void;
  name: string;
  setName: (state: string) => void;
  phone: number;
  setPhone: (state: number) => void;
  email: string;
  setEmail: (state: string) => void;
  dni: number;
  setDni: (state: number) => void;
  password: string;
  setPassword: (state: string) => void;
  edit: boolean;
}

const OperatorsForm: React.FC<OperatorFormProps> = ({
  handleSubmit,
  branches,
  branch,
  setBranch,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  dni,
  setDni,
  password,
  setPassword,
  edit,
}) => {
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label='Nombre'
        type='text'
        name='username'
        id='username'
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Input
        label='Correo electrónico'
        type='email'
        name='email'
        id='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        label='Teléfono'
        type='tel'
        name='phone'
        id='phone'
        value={phone}
        onChange={e => setPhone(Number(e.target.value))}
        required
      />
      <div className='flex mb-3'>
        <div className='w-1/2 mr-4'>
          <Input
            label='DNI'
            type='tel'
            name='dni'
            id='dni'
            value={dni}
            onChange={e => setDni(Number(e.target.value))}
            required
          />
        </div>
        <div className='w-1/2'>
          <Select
            label='Sucursal'
            name='branch'
            id='branch'
            value={branch}
            onChange={e => {
              setBranch(e.target.value);
            }}
            required
            data={branches}
            width='full'
          />
        </div>
      </div>
      {!edit ? (
        <>
          <div className='flex mb-3'>
            <div className='w-1/2 mr-4'>
              <PasswordInput
                label='Contraseña'
                name='password'
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='w-1/2'>
              <PasswordInput
                label='Repetir Contraseña'
                name='password2'
                id='password2'
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='flex mt-4'>
            {name &&
            email &&
            dni &&
            branch &&
            password &&
            repeatPassword &&
            password === repeatPassword &&
            password.length >= 8 ? (
              <Button type='submit'>Enviar</Button>
            ) : (
              <Button type='submit' disabled>
                Enviar
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className='flex mt-4'>
          {name && email && dni && branch ? (
            <Button type='submit'>Enviar</Button>
          ) : (
            <Button type='submit' disabled>
              Enviar
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

export default OperatorsForm;
