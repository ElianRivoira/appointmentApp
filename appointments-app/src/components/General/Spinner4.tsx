import React from 'react';

import styles from '@/styles/Spinner4.module.css';

const Spinner4 = () => {
  return (
    <div className='flex justify-center w-full mt-5'>
      <span className={`${styles.loader}`}></span>;
    </div>
  );
};

export default Spinner4;
