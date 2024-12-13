'use client'
import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import styles from '@/_components/util/chartStyle.module.css';

export default function LineChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      chart: {
        type: 'line',
        toolbar: {
          show: false, // Hides all toolbar icons
        },
        background: 'transparent', // Ensures the background blends with your page
        height: 300, // Adjust height to fit your desired size
        width: '100%', // Make it responsive
      },
      series: [
        {
          name: 'sales',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
      ],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
      padding: {
        left: 0,
        right: 0,
        top: -10,
        bottom: -10,
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: 0,
          top: -5,
          bottom: -5,
        },
      },
      dataLabels: {
        enabled: false, // Hides data labels
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // Cleanup on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="chart" ref={chartRef} className={styles.chartContainer}></div>;
}
