import AdminNavbar from '@/components/AdminNavbar';
import List from '@/components/List';
import Navbar from '@/components/Navbar';
import { getBranches } from '@/services/branches';
import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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
          <List data={branch} key={branch._id} />
        ))}
      </div>
    </>
  );
};

export default branches;
