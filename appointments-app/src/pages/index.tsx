import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [calledPush, setCalledPush] = useState(false);

  useEffect(() => {
    async function func() {
      if (calledPush) return;
      const token = localStorage.getItem('token');
      if (token) {
        await dispatch(fetchUser());
        return router.push('reservePanel');
        setCalledPush(true);
      } else {
        return router.push('login');
        setCalledPush(true);
      }
    }
    func();
  }, []);

  return <div>index</div>;
};

export default Index;
