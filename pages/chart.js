import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['label'],
  datasets: [
    {
      label: '# of Red Votes',
      data: [12],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '# of Blue Votes',
      data: [2],
      backgroundColor: 'rgb(54, 162, 235)',
    },
  ],
};

const options = {
  scales: {
    y: {
      stacked: true,
      ticks: {
        beginAtZero: true
      }
    },
    x: {
      stacked: true
    }
  },
  maintainAspectRatio: false
};

const Chart = () => (
  <>
    <h1 className='text-center' >Oroville Lake</h1>
    <div className="bg-green-400" style={{ width: 200 }} >
      <Bar data={data} options={options} height={200} />
    </div>
  </>
);

export default Chart;