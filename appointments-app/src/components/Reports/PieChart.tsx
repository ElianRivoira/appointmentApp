import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  propsData: IPieChart;
  period: string;
}

const PieChart: React.FC<PieChartProps> = ({ propsData, period }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const periodData = period === 'Mensual' ? propsData.monthly : propsData.annual;
  console.log(periodData)

  const options = {
    responsive: true,
    mantainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          // This more specific font property overrides the global property
          usePointStyle: true,
          pointStyle: 'rectRounded',
          pointStyleWidth: 22,
          padding: 20,
          font: {
            size: 14,
          },
          color: 'rgb(0, 0, 0)',
          // generateLabels: function (chart: ChartJS) {
          //   const data = chart.data;
          //   console.log(data);
          //   if (data.labels?.length && data.datasets.length) {
          //     return data.labels.map((label, index) => {
          //       const meta = chart.getDatasetMeta(0);
          //       const ds = data.datasets[0];
          //       const arc = meta.data[index];
          //       console.log('meta', meta);
          //       console.log('ds', ds);
          //       console.log('arc', arc);
          //       const arcOpts = arc.options;
          //       console.log('arcOpts', arcOpts);
          //       const fill = arcOpts.backgroundColor;
          //       const stroke = arcOpts.borderColor;
          //       const bw = arcOpts.borderWidth;
          //       const text = `${label} ${ds.data[index]}%`;

          //       return {
          //         text,
          //         fillStyle: fill,
          //         strokeStyle: stroke,
          //         lineWidth: bw,
          //         hidden: false,
          //       };
          //     });
          //   } else {
          //     return [
          //       {
          //         text: ' ',
          //         fillStyle: '#fff',
          //         strokeStyle: '#fff',
          //         lineWidth: 1,
          //         hidden: true,
          //       },
          //     ];
          //   }
          // },
        },
      },
    },
    layout: {
      padding: 0,
    },
  };

  const data = {
    labels: periodData.labels,
    datasets: [
      {
        label: '',
        data: [periodData.assisted, periodData.reserved],
        borderColor: ['#CC6AFF', '#A442F1'],
        backgroundColor: ['#CC6AFF', '#A442F1'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie options={options} data={data} />;
};

export default PieChart;
