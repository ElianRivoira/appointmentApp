import React from 'react';
import { useRouter } from 'next/router';
import { hasCookie } from 'cookies-next';
import { useQuery } from '@tanstack/react-query';

import { getLoggedUser } from '@/services/users';
import Spinner2 from '@/components/General/Spinner2';
import { checkLocalStorage } from '@/utils/localStorage';

const Index = () => {
  const router = useRouter();

  const loggedUser = useQuery({
    queryKey: ['loggedUser'],
    enabled: checkLocalStorage('session'),
    queryFn: getLoggedUser,
  });

  if (loggedUser.isLoading) return <Spinner2 />;
  if (loggedUser.isSuccess) {
    if (loggedUser.data?.role === 'user') {
      router.push('reservePanel');
    } else if (loggedUser.data?.role === 'operator') {
      router.push('operator/reserves');
    } else if (loggedUser.data?.role === 'admin') {
      router.push('admin/operators');
    }
  }

  return <></>;
};

export default Index;
