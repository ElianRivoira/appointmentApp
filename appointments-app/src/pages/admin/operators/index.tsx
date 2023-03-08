import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import AdminNavbar from '@/components/AdminNavbar';
import List from '@/components/List';
import { getOperators } from '@/services/operators';
import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';

const Operators = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [operators, setOperators] = useState<User[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('login');
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    const getOper = async () => {
      if (user) {
        const operators = await getOperators();
        setOperators(operators);
      }
    };
    getOper();
  }, [user]);

  return (
    <>
      <AdminNavbar />
      <div className='mt-12 mx-24'>
        <div className='font-semibold text-xl mb-6'>Operadores</div>
        {operators.map((oper) => (
          <List user={oper} key={oper._id} />
        ))}
      </div>
    </>
  );
};

export default Operators