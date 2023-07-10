import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { hasCookie } from 'cookies-next';

import { getBranches } from '@/services/branches';
import ReportsCard from '@/components/Reports/ReportsCard';
import reportesReservas from '@/assets/icons/reportesReservas.svg';
import reportesCancelaciones from '@/assets/icons/reportesCancelaciones.svg';
import reportesAsistencias from '@/assets/icons/reportesAsistencias.svg';
import Modal from '@/commons/Modal';
import { calculateMetrics } from '@/services/appointments';
import LineChart from '@/components/Reports/LineChart';
import styles from '@/styles/Reports.module.css';
import PieChart from '@/components/Reports/PieChart';
import ReportModal from '@/components/Reports/ReportModal';
import { checkLocalStorage } from '@/utils/localStorage';

const reports = () => {
  const bar1 = useRef<HTMLDivElement>(null);
  const bar2 = useRef<HTMLDivElement>(null);
  const [branch, setBranch] = useState('Todas');
  const [period, setPeriod] = useState('Mensual');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);
  const [errors, setErrors] = useState<CustomError[]>([]);
  const [metrics, setMetrics] = useState<IMetrics>({
    total: 0,
    canceled: 0,
    asisted: 0,
    lineChart: {
      reserved: [0],
      canceled: [0],
      labels: [''],
    },
    pieChart: {
      monthly: {
        reserved: 0,
        assisted: 0,
        labels: [''],
      },
      annual: {
        reserved: 0,
        assisted: 0,
        labels: [''],
      },
    },
    advanceReserves: {
      reservesInAdvance: 0,
      reservesWithoutAdvance: 0,
    },
  });

  const calcBarsWidth = ({
    reservesInAdvance,
    reservesWithoutAdvance,
  }: {
    reservesInAdvance: number;
    reservesWithoutAdvance: number;
  }) => {
    const max = Math.max(reservesInAdvance, reservesWithoutAdvance);
    const ratio = max !== 0 ? 100 / max : 0;
    bar1?.current ? (bar1.current.style.width = `${reservesInAdvance * ratio}%`) : null;
    bar2?.current ? (bar2.current.style.width = `${reservesWithoutAdvance * ratio}%`) : null;
  };

  const branches = useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
    enabled: checkLocalStorage('session'),
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
  });

  const reservesMetrics = useQuery({
    queryKey: ['reservesMetrics'],
    queryFn: calculateMetrics,
    enabled: checkLocalStorage('session'),
    refetchOnWindowFocus: false,
    onError: error => {
      setType(2);
      setErrors((error as any).response.data.errors);
      setOpen(true);
    },
    onSuccess: allReservesMetrics => {
      if(allReservesMetrics){
        setMetrics(allReservesMetrics.all);
        calcBarsWidth(allReservesMetrics.all.advanceReserves);
      }
    },
  });

  useEffect(() => {
    if (reservesMetrics.data) {
      if (branch === 'Todas') {
        setMetrics(reservesMetrics.data.all);
        calcBarsWidth(reservesMetrics.data.all.advanceReserves);
      } else {
        setMetrics(reservesMetrics.data[branch]);
        calcBarsWidth(reservesMetrics.data[branch].advanceReserves);
      }
    }
  }, [branch]);

  return (
    <div className='bg-cruceBackground justify-center'>
      <div className='mt-6 flex justify-center'>
        <div className='max-w-7xl xlMax:px-4 w-full'>
          <div>
            <h2 className='text-sm font-semibold mb-5'>Filtro por sucursal</h2>
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
                <option value={branchOffice.name} key={branchOffice._id}>
                  {branchOffice.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-8 flex gap-4'>
            <ReportsCard svgIcon={reportesReservas} dataNumber={metrics.total}>
              Total de reservas
            </ReportsCard>
            <ReportsCard svgIcon={reportesCancelaciones} dataNumber={metrics.canceled}>
              Total de cancelaciones
            </ReportsCard>
            <ReportsCard svgIcon={reportesAsistencias} dataNumber={metrics.asisted}>
              Asistencias
            </ReportsCard>
          </div>
          <div className='flex w-full h-[370px] gap-4 mt-5'>
            <div className='relative bg-white rounded-[18px] w-1/3 shadow-xg px-8 py-7'>
              <h2 className='font-semibold text-sm'>Reservas vs Asistencias</h2>
              <select
                name='period'
                id='period'
                value={period}
                onChange={e => setPeriod(e.target.value)}
                className='absolute w-[84%] mt-2 rounded-lg text-xm font-semibold h-11 p-3 border border-grey3 hover:border-grey5 focus:border-cruce outline-none'
              >
                <option value='Mensual'>Mensual</option>
                <option value='Anual'>Anual</option>
              </select>
              <button
                type='button'
                className='absolute bottom-[22px] w-[84%] active:shadow-active bg-cruceSecondary hover:bg-cruceSecondaryHover text-cruce font-semibold text-lb rounded-lg h-11'
              >
                Ver reporte
              </button>
              <div className='h-full w-full'>
                <PieChart propsData={metrics.pieChart} period={period} />
              </div>
            </div>
            <div className='flex justify-center bg-white rounded-[20px] w-2/3 shadow-xg px-8 py-6'>
              <LineChart propsData={metrics.lineChart} />
            </div>
          </div>
          <div className='mt-6 mb-10 w-full h-[230px] bg-white rounded-[20px] p-8 pt-6 shadow-xg'>
            <h2 className='font-semibold text-sm'>Plazo de antelación de solicitud de las reservas</h2>
            <p className='text-xm text-grey7 font-medium mt-4 ml-1'>Últimos 6 meses</p>
            <div className='mt-5 w-full'>
              <div className='flex justify-between'>
                <span className='text-ss font-normal'>Reservas con antelación</span>
                <span className='text-ss font-normal'>{metrics.advanceReserves.reservesInAdvance}</span>
              </div>
              <div ref={bar1} className={`h-4 bg-cruce rounded-md mt-1 ${styles.bar1}`}></div>
            </div>
            <div className='mt-4 w-full'>
              <div className='flex justify-between'>
                <span className='text-ss font-normal'>Reservas sin antelación</span>
                <span className='text-ss font-normal'>{metrics.advanceReserves.reservesWithoutAdvance}</span>
              </div>
              <div ref={bar2} className={`h-4 bg-error rounded-md mt-1 ${styles.bar2}`}></div>
            </div>
          </div>
        </div>
        <Modal type={type} errors={errors} open={open} onClose={() => setOpen(false)} />
        {/* <ReportModal  /> */}
      </div>
    </div>
  );
};

export default reports;
