import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [calledPush, setCalledPush] = useState(false);

  useEffect(() => {
    async function func() {
      if (calledPush) return;
      const token = localStorage.getItem('token');
      if (token) {
        await dispatch(fetchUser());
      } else {
        setCalledPush(true);
        return router.push('login');
      }
    }
    func();
  }, []);
  
  useEffect(() => {
    if (calledPush) return;
    if (user) {
      if (user.role === 'user'){
        router.push('reservePanel');
        setCalledPush(true);
      } else if (user.role === 'operator') {
        router.push('operator/reserves');
        setCalledPush(true);
      } else if (user.role === 'admin') {
        setCalledPush(true);
        router.push('admin/operators');
      }
    }
    }, [user])

  return <div>index</div>;
};

export default Index;
