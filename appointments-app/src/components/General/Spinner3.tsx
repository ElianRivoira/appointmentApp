import React from 'react';

import styles from '@/styles/Spinner3.module.css';

const Spinner3 = () => {
  return (
    <div className='mt-5 flex justify-center w-full'>
      <div className={`${styles.ldsDualRing}`}></div>
    </div>
  );
};

export default Spinner3;
