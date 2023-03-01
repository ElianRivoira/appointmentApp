import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';
import { getReserves } from '@/services/appointments';
import Reserve from '@/components/Reserve';
import Navbar from '@/components/Navbar';

const Reserves = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [reservesFromUser, setReservesFromUser] = useState<reserveUser[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('login');
    dispatch(fetchUser());
  }, []);
  
  useEffect(() => {
    const getReserve = async () => {
      if (user) {
        const reservas = await getReserves(user._id);
        setReservesFromUser(reservas);
      }
    };
    getReserve();
  }, [user])

  return (
    <>
      <Navbar />
      <div className='mt-12 mx-24'>
        <div className='font-semibold text-xl mb-6'>Reservas</div>
        {reservesFromUser.map((reserve) => (
          <Reserve data={reserve} key={reserve._id} operatorView={false} />
        ))}
      </div>
    </>
  );
};

export default Reserves;
