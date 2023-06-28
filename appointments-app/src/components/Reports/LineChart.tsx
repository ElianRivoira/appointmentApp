import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
  propsData: ILineChart;
}

const LineChart: React.FC<LineChartProps> = ({ propsData }) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        min: 0,
      },
    },
  };

  const data = {
    labels: propsData.labels,
    datasets: [
      {
        label: 'Reservas',
        data: propsData.reserved,
        borderColor: '#A442F1',
        backgroundColor: '#A442F1',
        borderWidth: 2,
      },
      {
        label: 'Cancelaciones',
        data: propsData.canceled,
        borderColor: '#E53939',
        backgroundColor: '#E53939',
        borderWidth: 2,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
