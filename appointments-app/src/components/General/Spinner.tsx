import React from 'react';

import styles from '@/styles/Spinner.module.css';

const Spinner = () => {
  return (
    <div className='h-14 flex justify-center w-full'>
      <div className={`${styles.ldsEllipsis}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
