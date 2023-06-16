import { NextRouter } from 'next/router';

const formatTime = (mss: number, router: NextRouter): string => {
  const minutesOperation = (mss % (1000 * 60 * 60)) / (1000 * 60);
  const secondsOperation = (mss % (1000 * 60)) / 1000;
  const minutes = parseInt(minutesOperation.toString());
  const seconds = parseInt(secondsOperation.toString());

  if (minutes === 0 && seconds === 0) router.reload();

  return seconds < 10 ? `Quedan ${minutes}:0${seconds}` : `Quedan ${minutes}:${seconds}`;
};

export default formatTime;
