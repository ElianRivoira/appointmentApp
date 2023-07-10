import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { hasCookie } from 'cookies-next';
import { useQuery } from '@tanstack/react-query';

import { getLoggedUser } from '@/services/users';
import Spinner2 from '@/components/General/Spinner2';

const Index = () => {
  const router = useRouter();
  const [cookieError, setCookieError] = useState(false);

  const loggedUser = useQuery({
    queryKey: ['loggedUser index'],
    retry: 1,
    queryFn: getLoggedUser,
    onError: error => {
      setCookieError(true);
    },
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
  if (cookieError) router.push('/login');

  return <></>;
};

export default Index;
