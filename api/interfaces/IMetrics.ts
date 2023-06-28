interface ILineChart {
  reserved: number[];
  canceled: number[];
  labels: string[];
}
interface IPieChart {
  monthly: {
    reserved: number;
    assisted: number;
    labels: string[];
  };
  annual: {
    reserved: number;
    assisted: number;
    labels: string[];
  };
}

export interface IAdvanceReserves {
  reservesInAdvance: number;
  reservesWithoutAdvance: number;
}

export interface IMetrics {
  total: number;
  canceled: number;
  asisted: number;
  lineChart: ILineChart;
  pieChart: IPieChart;
  advanceReserves: IAdvanceReserves;
}

export interface IAllBranchesMetrics {
  [key: string]: IMetrics;
}
