import { getReserves } from '@/services/appointments';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useEffect, useState } from 'react';
import Reserve from '@/components/Reserve';
import Navbar from '@/components/Navbar';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';

const Reserves = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [reservesFromUsers, setReservesFromUsers] = useState<reserveUser[]>([]);
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
        console.log(user.id);
        const reservas = await getReserves(user.id);
        setReservesFromUsers(reservas);
      }
    };
    getReserve();
  }, [user])

  return (
    <>
      <Navbar />
      <div className='mt-12 mx-24'>
        <div className='font-semibold text-xl mb-6'>Reservas</div>
        {reservesFromUsers.map((reserve) => (
          <Reserve data={reserve} key={reserve._id}></Reserve>
        ))}
      </div>
    </>
  );
};

export default Reserves;
