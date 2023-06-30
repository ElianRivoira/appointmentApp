import { ServerError } from '../errors/server-error';
import { IAdvanceReserves, IAllBranchesMetrics } from '../interfaces/IMetrics';
import { AppointmentDoc } from '../models/Appointment.model';
import appointmentService from '../models/appointment-service';
import branchOfficeService from '../models/branchOffice-service';

const lineLabels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const pieLabels = ['Asistencia', 'Reservas'];
const statusOptions = {
  reserved: 'reserved',
  canceled: 'canceled',
};
const periodOptions = {
  monthly: 'monthly',
  annual: 'annual',
};

const setLineChart = (reserves: AppointmentDoc[], status: string, branchName?: string) => {
  // One day in miliseconds
  const oneDay = 86400000;

  let dateNow = new Date();
  //We obtain the actual useful day in string with first letter in uppercase to match with label's strings
  let dayNow =
    dateNow.toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() +
    dateNow.toLocaleDateString('es-ES', { weekday: 'long' }).slice(1);
  if (dayNow === 'Domingo') {
    dateNow = new Date(dateNow.getTime() - oneDay);
    dayNow =
      dateNow.toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() +
      dateNow.toLocaleDateString('es-ES', { weekday: 'long' }).slice(1);
  }

  // data to return
  let data: number[] = [];
  // auxiliar counter
  let j = 0;
  // Condition to break the while loop calculated based on dayNow and lineLabels array
  let loopCondition = lineLabels.indexOf(dayNow) * oneDay;

  while (loopCondition >= 0) {
    const targetDate = !j ? dateNow : new Date(dateNow.getTime() - oneDay * j);
    // dateNow converted to a string without time, only day, month and year
    const stringTargetDate = targetDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const filteredReserves = reserves.filter(reserve => {
      let reserveDate = reserve.date.toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric' });
      if (branchName) {
        if (status === statusOptions.reserved)
          return reserve.branch.name === branchName && stringTargetDate === reserveDate;
        else if (status === statusOptions.canceled)
          return (
            reserve.branch.name === branchName && stringTargetDate === reserveDate && reserve.status === 'canceled'
          );
      } else if (status === statusOptions.reserved) {
        return stringTargetDate === reserveDate;
      } else if (status === statusOptions.canceled)
        return stringTargetDate === reserveDate && reserve.status === 'canceled';
    });
    data.push(filteredReserves.length);
    j++;
    loopCondition -= oneDay;
  }
  return data;
};

const calcAdvanceReserves = (reserves: AppointmentDoc[], branchName?: string): IAdvanceReserves => {
  let reservesInAdvance = 0;
  let reservesWithoutAdvance = 0;
  const sevenDaysInMs = 604800000;
  const sixMonth = 15811200000;
  const dateNow = new Date();
  const reservesInLast6Months = reserves.filter(
    reserve => dateNow.getTime() - reserve.creationDate.getTime() <= sixMonth
  );
  reservesInLast6Months.forEach(reserve => {
    if (branchName) {
      if (reserve.branch.name === branchName) {
        if (reserve.date.getTime() - reserve.creationDate.getTime() >= sevenDaysInMs) reservesInAdvance++;
        else reservesWithoutAdvance++;
      }
    } else {
      if (reserve.date.getTime() - reserve.creationDate.getTime() >= sevenDaysInMs) reservesInAdvance++;
      else reservesWithoutAdvance++;
    }
  });
  return {
    reservesInAdvance,
    reservesWithoutAdvance,
  };
};

const setPieChart = (reserves: AppointmentDoc[], period: string, branchName?: string) => {
  const dateNow = new Date();
  const oneMonth = 2635200000;
  const oneYear = 31622400000;

  let returnData = {
    reserved: 0,
    assisted: 0,
    labels: [``],
  };
  if (period === periodOptions.monthly) {
    const monthlyReserves = reserves.filter(reserve => {
      if (branchName && branchName !== 'Todas') {
        return dateNow.getTime() - reserve.date.getTime() <= oneMonth && reserve.branch.name === branchName;
      } else {
        return dateNow.getTime() - reserve.date.getTime() <= oneMonth;
      }
    });
    let assisted = 0;
    let reserved = 0;
    monthlyReserves.forEach(reserve => {
      reserve.status === 'confirmed' ? assisted++ : reserved++;
    });
    const assistedPercentage = Math.round((assisted / monthlyReserves.length) * 100);
    const reservedPercentage = Math.round((reserved / monthlyReserves.length) * 100);
    returnData = {
      reserved: reserved,
      assisted: assisted,
      labels: [
        `${pieLabels[0]} ${assisted === 0 ? 0 : assistedPercentage}%`,
        `${pieLabels[1]} ${reserved === 0 ? 0 : reservedPercentage}%`,
      ],
    };
  } else if (period === periodOptions.annual) {
    const annualReserves = reserves.filter(reserve => {
      if (branchName && branchName !== 'Todas') {
        return dateNow.getTime() - reserve.date.getTime() <= oneYear && reserve.branch.name === branchName;
      } else {
        return dateNow.getTime() - reserve.date.getTime() <= oneYear;
      }
    });
    let assisted = 0;
    let reserved = 0;
    annualReserves.forEach(reserve => {
      reserve.status === 'confirmed' ? assisted++ : reserved++;
    });
    const assistedPercentage = Math.round((assisted / annualReserves.length) * 100);
    const reservedPercentage = Math.round((reserved / annualReserves.length) * 100);
    returnData = {
      reserved: reserved,
      assisted: assisted,
      labels: [
        `${pieLabels[0]} ${assisted === 0 ? 0 : assistedPercentage}%`,
        `${pieLabels[1]} ${reserved === 0 ? 0 : reservedPercentage}%`,
      ],
    };
  }
  return returnData;
};

const setReservesMetrics = async (): Promise<IAllBranchesMetrics> => {
  try {
    const reserves = await appointmentService.getAllAppointments();
    const branches = await branchOfficeService.getAllBranches();

    const allBranchesMetrics: IAllBranchesMetrics = {
      all: {
        total: reserves.length,
        canceled: reserves.filter(reserve => reserve.status === 'canceled').length,
        asisted: reserves.filter(reserve => reserve.status === 'confirmed').length,
        lineChart: {
          reserved: setLineChart(reserves, statusOptions.reserved),
          canceled: setLineChart(reserves, statusOptions.canceled),
          labels: lineLabels,
        },
        pieChart: {
          monthly: setPieChart(reserves, periodOptions.monthly),
          annual: setPieChart(reserves, periodOptions.annual),
        },
        advanceReserves: calcAdvanceReserves(reserves),
      },
    };
    branches.forEach(branch => {
      if (branch.name === '') return;
      allBranchesMetrics[branch.name] = {
        total: reserves.filter(reserve => reserve.branch.name === branch.name).length,
        canceled: reserves.filter(reserve => reserve.branch.name === branch.name && reserve.status === 'canceled')
          .length,
        asisted: reserves.filter(reserve => reserve.branch.name === branch.name && reserve.status === 'confirmed')
          .length,
        lineChart: {
          reserved: setLineChart(reserves, statusOptions.reserved, branch.name),
          canceled: setLineChart(reserves, statusOptions.canceled, branch.name),
          labels: lineLabels,
        },
        pieChart: {
          monthly: setPieChart(reserves, periodOptions.monthly, branch.name),
          annual: setPieChart(reserves, periodOptions.annual, branch.name),
        },
        advanceReserves: calcAdvanceReserves(reserves, branch.name),
      };
    });

    return allBranchesMetrics;
  } catch (e) {
    throw new ServerError(e);
  }
};

export default setReservesMetrics;
