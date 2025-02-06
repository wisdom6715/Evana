import React from 'react';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
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

// const data = {
//   labels: [400, 300, 200, 278, 189, 239, 349],
//   datasets: [{
//     label: 'Interaction Data',
//     data: [400, 300, 200, 278, 189, 239, 349],
//     borderColor: '#8884d8',
//     backgroundColor: 'rgba(136, 132, 216, 0.2)',
//     fill: true,
//     borderWidth: 2,
//     tension: 0.4,
//   }],
// };

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
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Chat Interactions',
      data: [],
      borderColor: '#8884d8',
      backgroundColor: 'rgba(136, 132, 216, 0.2)',
      fill: true,
      borderWidth: 2,
      tension: 0.4,
    }],
  });


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/daily-chats/b0c2997a-9cea-454b-bcb1-f4709055713a');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        const dailyCounts = result.data.dailyCounts;

        setChartData({
          labels: dailyCounts.map((item: any) => formatDate(item.date)),
          datasets: [{
            label: 'Chat Interactions',
            data: dailyCounts.map((item: any) => item.count),
            borderColor: '#8884d8',
            backgroundColor: 'rgba(136, 132, 216, 0.2)',
            fill: true,
            borderWidth: 2,
            tension: 0.4,
          }]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
  
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ResponsiveChart;