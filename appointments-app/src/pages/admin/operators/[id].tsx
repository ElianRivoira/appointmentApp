import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import AdminNavbar from '@/components/AdminNavbar';
import Modal from '@/components/Modal';
import rightCheckbox from '../../../../public/icons/rightCheckbox.svg';
import wrongCheckbox from '../../../../public/icons/wrongCheckbox.svg';
import { getBranches } from '@/services/branches';
import { getOneOperator } from '@/services/operators';
import OperatorsForm from '@/components/OperatorsForm';
import { updateUser } from '@/services/users';

const CreateOperators = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [branch, setBranch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('')
  const [branches, setBranches] = useState<Branch[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState(0);
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState('');
  const [thisOperator, setThisOperator] = useState<User>();
  const router = useRouter();
  const operatorId = router.query.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (typeof operatorId === 'string') {
        const operator = await updateUser(
          operatorId, {
            name,
            email,
            dni,
            branch,
            phone,
          });
          console.log(operator);
          setType(1);
          setOpen(true);
      }
    } catch (e) {
      console.log(e);
      setType(3);
      setOpen(true);
    }
  };

  useEffect(() => {
    const func = async () => {
      const branches = await getBranches();
      setBranches(branches);
      if (typeof operatorId === 'string') {
        const operator = await getOneOperator(operatorId);
        setThisOperator(operator);
      }
    };
    func();
  }, []);

  useEffect(() => {
    if (thisOperator) {
      setName(thisOperator.name);
      setEmail(thisOperator.email);
      setDni(thisOperator.dni);
      if (thisOperator.phone) {
        setPhone(thisOperator.phone);
      }
      if (thisOperator.branch) {
        setBranch(thisOperator.branch.name);
        setSelectedBranch(thisOperator.branch.name)
      }
    }
  }, [thisOperator]);

  useEffect(() => {
    if (type === 1 && open === false) {
      if (typeof operatorId === 'string') {
        router.push({
          pathname: `/admin/operators`,
        });
      }
    }
  }, [open]);

  return (
    <div className='h-screen bg-cruceBackground'>
      <AdminNavbar />
      <div className='flex justify-center'>
        <div className='flex flex-col w-3/4 max-w-screen-md h-3/5 mt-12 p-10 pb-8 border rounded-xl shadow-navbar bg-white'>
          <p className='mb-4 font-bold text-xb'>Edición de operador</p>
          <OperatorsForm 
            handleSubmit={handleSubmit}
            selectedBranch={selectedBranch}
            branches={branches}
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
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className='flex flex-col items-center'>
              {type === 1 ? (
                <>
                  <Image
                    src={rightCheckbox}
                    alt='success'
                    className='w-10 h-10 mb-7'
                  />
                  <h1 className='text-ln font-bold'>
                    Operador modificado con éxito
                  </h1>
                </>
              ) : type === 2 ? (
                <>
                  <Image
                    src={wrongCheckbox}
                    alt='error'
                    className='w-10 h-10 mb-7'
                  />
                  <h1 className='text-ln font-bold'>Algo salió mal</h1>
                  <p className='text-sm font-normal mt-1'>
                    Ha ocurrido un error al editar el operador. Inténtelo más
                    tarde
                  </p>
                </>
              ) : type === 3 ? (
                <>
                  <Image
                    src={wrongCheckbox}
                    alt='error'
                    className='w-10 h-10 mb-7'
                  />
                  <h1 className='text-ln font-bold'>Ha ocurrido un error</h1>
                  <p className='text-sm font-normal mt-1'>
                    Ya existe un operador registrado con este correo electrónico
                  </p>
                </>
              ) : null}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateOperators;
