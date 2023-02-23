import { getReserves } from '@/services/appointments';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import Reserve from '@/components/Reserve';
import Navbar from '@/components/Navbar';

const Reserves = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [reservesFromUsers, setReservesFromUsers] = useState<reserveUser[]>([]);

  useEffect(() => {
    const getReserve = async () => {
      if (user) {
        console.log(user.id);
        const reservas = await getReserves(user.id);
        setReservesFromUsers(reservas);
      }
    };
    getReserve();
  }, []);

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
