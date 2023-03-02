import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';
import OperatorNavbar from '../../components/OperatorNavbar';
import Reserve from '@/components/Reserve';
import { getBranch } from '@/services/branches';

const Reserves = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);
  const [reservesFromBranch, setReservesFromBranch] = useState<reserveUser[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('login');
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    const getReserves = async () => {
      if (user?.branch) {
        const branch = await getBranch(user.branch);
        setReservesFromBranch(branch.appointments);
      }
    };
    getReserves();
  }, [user])

  return (
    <>
      <OperatorNavbar />
      <div className='mt-12 mx-24'>
        <div className='font-semibold text-xl mb-6'>Reservas</div>
        {reservesFromBranch.map((reserve) => {
          if(!reserve.confirmed){
            return <Reserve data={reserve} key={reserve._id} operatorView={true} />
          }
        })}
      </div>
    </>
  )
}

export default Reserves