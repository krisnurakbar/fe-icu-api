import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';

function ScurveChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dataset = [
    {
      id: 'Planned Progress',
      data: [
        { x: 'Week 1', y: 5 },
        { x: 'Week 2', y: 10 },
        { x: 'Week 3', y: 14 },
        // Add more data points here
      ],
    },
    {
      id: 'Actual Progress',
      data: [
        { x: 'Week 1', y: 3 },
        { x: 'Week 2', y: 8 },
        { x: 'Week 3', y: 15 },
        // Add more data points here
      ],
    },
  ];

  return dataset.length > 0 ? (
    <LineChart data={dataset} />
  ) : (
    <p>Loading data...</p>
  );
  

  useEffect(() => {
    axios.get('https://be-icu-api.vercel.app/api/project-progress')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const planData = data.map(item => ({
    x: `Week ${item.week_no}`,
    y: item.plan_progress,
  }));

  const actualData = data.map(item => ({
    x: `Week ${item.week_no}`,
    y: item.actual_progress,
  }));

  return (
    <div>
      <h2>S-curve Chart</h2>
      <LineChart
        series={[
          { label: 'Planned Progress (%)', data: planData },
          { label: 'Actual Progress (%)', data: actualData },
        ]}
        width={600}
        height={400}
        xAxis={[{ data: data.map(item => `Week ${item.week_no}`) }]}
      />
    </div>
  );
}

export default ScurveChart;
