import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    async function func() {
      await dispatch(fetchUser());
      console.log(state)
      if (state.user) {
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
