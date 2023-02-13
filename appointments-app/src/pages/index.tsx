import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    async function func() {
      const token = localStorage.getItem('token')
      if (token) {
        await dispatch(fetchUser());
        router.push('reservePanel');
      } else {
        router.push('login');
      }
    }
    func();
  }, []);

  return <div>index</div>;
};

export default Index;
