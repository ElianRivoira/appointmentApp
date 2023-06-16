import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { fetchUser } from '@/store/slices/userSlice';
import OperatorNavbar from '../../components/OperatorNavbar';
import Reserve from '@/components/Reserve';
import { getBranch } from '@/services/branches';

const Reserves = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [reservesFromBranch, setReservesFromBranch] = useState<reserveUser[]>();
  const [state, setState] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    const getReserves = async () => {
      if (user?.branch?._id) {
        const branch = await getBranch(user?.branch?._id);
        setReservesFromBranch(branch.appointments);
      }
    };
    getReserves();
  }, [user]);

  return (
    <>
      <OperatorNavbar />
      <div className='mt-12 mx-24'>
        <div className='font-semibold text-xl mb-6'>Reservas</div>
        {reservesFromBranch?.map(reserve => {
          if (!reserve.confirmed) {
            if (!state) setState(true);
            return (
              <Reserve data={reserve} key={reserve._id} operatorView={true} />
            );
          }
        })}
        {!state ? (
          <p className=''>No existen reservas pendientes para tu sucursal</p>
        ) : null}
      </div>
    </>
  );
};

export default Reserves;
