import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface CountDownProps {
  start: boolean;
  countDown: string;
  setCountDown: (state: string) => void;
  formatTime: (mss: number, router: NextRouter) => string;
  margin: boolean;
}

const CountDown: React.FC<CountDownProps> = ({start, countDown, setCountDown, formatTime, margin}) => {
  const router = useRouter();

  useEffect(() => {
    if(start){
      const expirationDate = new Date().getTime() + 300000; // 5 minutes
      const intervalId = setInterval(() => {
        const now = new Date();
        const difference = expirationDate - now.getTime();
        const count = formatTime(difference, router);
        setCountDown(count);
      }, 1000);
  
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [start]);

  return (
      <div className={`lgMax:fixed bottom-0 right-4 flex w-full justify-end ${margin ? '' : 'lg:mt-10'}`}>
        <div className='rounded-lg h-11 bg-cruceHover p-3 text-lb font-bold text-white w-30 shadow-timer'>
          {countDown}
        </div>
      </div>
  );
};

export default CountDown;
