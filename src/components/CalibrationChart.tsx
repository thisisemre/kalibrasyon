'use client';

import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
// @ts-ignore
import ChartTrendline from 'chartjs-plugin-trendline';
// @ts-ignore
import { Line } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, ChartTrendline);

type Props = {
  xValues: number[];
  yValues: number[];
};

export default function CalibrationChart({ xValues, yValues }: Props) {
  const data = {
    labels: xValues,
    datasets: [
      {
        label: 'Kalibrasyon Verisi',
        data: yValues,
        borderColor: 'blue',
        fill: false,
        tension: 0.1,
        trendlineLinear: {
          style: 'rgba(255, 99, 132, 0.8)',
          lineStyle: "solid",
          width: 2
        }
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Kalibrasyon Grafiği',
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X (Konsantrasyon)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Y (Ölçüm)'
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}