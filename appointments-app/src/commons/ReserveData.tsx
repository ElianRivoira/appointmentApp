import React from 'react';

interface Props {
  label: string;
  data: string;
}

const ReserveData: React.FC<Props> = ({ label, data }) => {
  return (
    <div className='flex flex-col flex-1'>
      <div className='text-xs'>{label}</div>
      <div className='text-xm sm:text-sm font-semibold'>{data}</div>
    </div>
  );
};

export default ReserveData;
