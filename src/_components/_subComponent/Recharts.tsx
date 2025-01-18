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
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data = {
  labels: [400, 300, 200, 278, 189, 239, 349], // Use X-axis values as labels
  datasets: [
    {
      label: 'UV Data',
      data: [400, 300, 200, 278, 189, 239, 349],
      borderColor: '#8884d8',
      borderWidth: 2,
      tension: 0.4, // Curve style
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Ensures it adapts to parent container
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Optional: Hide gridlines on X-axis
      },
    },
    y: {
      display: false, // Remove Y-axis
    },
  },
};

const ResponsiveChart = () => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#e8f5e9' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ResponsiveChart;
