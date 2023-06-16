import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { hasCookie } from 'cookies-next';
import { useQuery } from '@tanstack/react-query';
import { getLoggedUser } from '@/services/users';
import Spinner from '@/components/Spinner';

const Index = () => {
  const router = useRouter();

  const loggedUser = useQuery({
    queryKey: ['loggedUser'],
    enabled: hasCookie('session'),
    queryFn: getLoggedUser,

  });

  // useEffect(() => {
  //   if (!hasCookie('session')) {
  //     router.push('/login');
  //   }
  // }, []);

  if (loggedUser.isLoading) return <Spinner />;
  // if (loggedUser.isError) {
  //   return <h1>{(loggedUser.error as any)?.response.data.errors[0].message}</h1>;
  // }
  if (loggedUser.isSuccess) {
    if (loggedUser.data.role === 'user') {
      router.push('reservePanel');
    } else if (loggedUser.data.role === 'operator') {
      router.push('operator/reserves');
    } else if (loggedUser.data.role === 'admin') {
      router.push('admin/operators');
    }
  }

  return <></>;
};

export default Index;
