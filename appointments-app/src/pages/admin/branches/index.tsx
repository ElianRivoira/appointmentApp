import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import AdminNavbar from '@/components/AdminNavbar';
import List from '@/components/List';
import { getBranches } from '@/services/branches';
import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';

const branches = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [allBranches, setAllBranches] = useState<Branch[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('login');
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    const getBranch = async () => {
      if (user) {
        const branches = await getBranches();
        setAllBranches(branches);
      }
    };
    getBranch();
  }, [user]);

  return (
    <>
      <AdminNavbar />
      <div className='mt-12 mx-24'>
        <div className='font-semibold text-xl mb-6'>Sucursales</div>
        {allBranches.map((branch) => (
          <List branch={branch} key={branch._id} />
        ))}
      </div>
    </>
  );
};

export default branches;
