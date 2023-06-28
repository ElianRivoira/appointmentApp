import React from 'react';

import styles from '@/styles/Spinner2.module.css';

const Spinner2 = () => {
  return (
    <div className='mt-5 flex justify-center w-full'>
      <div className={`${styles.ldsRoller}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner2;
