import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function ScurveChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://be-icu-api.vercel.app/api/project-progress')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const chartData = {
    labels: data.map(item => `Week ${item.week_no}`),
    datasets: [
      {
        label: 'Planned Progress (%)',
        data: data.map(item => item.plan_progress),
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
      {
        label: 'Actual Progress (%)',
        data: data.map(item => item.actual_progress),
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>S-curve Chart</h2>
      <Line data={chartData} />
    </div>
  );
}

export default ScurveChart;
