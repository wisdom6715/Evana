import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,  // Add this
} from 'chart.js';

ChartJS.register(
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  Tooltip, 
  Legend,
  Filler  // Register this
);

const data = {
  labels: [400, 300, 200, 278, 189, 239, 349],
  datasets: [{
    label: 'UV Data',
    data: [400, 300, 200, 278, 189, 239, 349],
    borderColor: '#8884d8',
    backgroundColor: 'rgba(136, 132, 216, 0.2)',
    fill: true,
    borderWidth: 2,
    tension: 0.4,
  }],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    filler: {
      propagate: true
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
    },
  },
};

const ResponsiveChart = () => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ResponsiveChart;