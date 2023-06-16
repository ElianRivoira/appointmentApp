import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';

import { getBranches } from '../../services/branches';
import ReportsCard from '../../components/ReportsCard';
import reportesReservas from '@/assets/icons/reportesReservas.svg';
import reportesCancelaciones from '@/assets/icons/reportesCancelaciones.svg';
import reportesAsistencias from '@/assets/icons/reportesAsistencias.svg';
import Modal from '@/components/Modal';

const reports = () => {
  const [branch, setBranch] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);

  const branches = useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
    enabled: hasCookie('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  return (
    <div className='bg-cruceBackground justify-center'>
      <div className='mt-6 flex justify-center'>
        <div className='max-w-7xl w-full'>
          <div>
            <p className='text-sm font-semibold mb-5'>Filtro por sucursal</p>
            <select
              name='branch'
              id='branch'
              className='w-1/3 rounded-lg text-sm font-semibold h-11 p-3 border border-grey3 hover:border-grey5 focus:border-cruce outline-none'
              value={branch}
              onChange={e => {
                setBranch(e.target.value);
              }}
            >
              {branches.data?.map(branchOffice => (
                <option value={branchOffice.name} key={branchOffice._id} hidden={branchOffice.name === ''}>
                  {branchOffice.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-8 flex gap-4'>
            <ReportsCard svgIcon={reportesReservas} dataNumber={100}>
              Total de reservas
            </ReportsCard>
            <ReportsCard svgIcon={reportesCancelaciones} dataNumber={12}>
              Total de cancelaciones
            </ReportsCard>
            <ReportsCard svgIcon={reportesAsistencias} dataNumber={69}>
              Asistencias
            </ReportsCard>
          </div>
          <div className='flex w-full h-[370px] gap-4 mt-5'>
            <div className='bg-white rounded-[18px] w-1/3 shadow-xg px-8 py-7'>
              <p className='font-semibold text-sm'>Reservas vs Asistencias</p>
            </div>
            <div className='bg-white rounded-[20px] w-2/3 shadow-xg px-8 py-6'></div>
          </div>
          <div className='mt-6 mb-10 w-full h-[230px] bg-white rounded-[20px] p-8 pt-6 shadow-xg'>
            <p className='font-semibold text-sm'>Plazo de antelación de solicitud de las reservas</p>
          </div>
        </div>
        <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)}/>
      </div>
    </div>
  );
};

export default reports;
