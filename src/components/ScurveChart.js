import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';

function ScurveChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  

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
        xAxis={[
          {
            title: 'Week Number',
            data: data.map(item => `Week ${item.week_no}`),
          },
        ]}
        //series={[{ data: [null, null, 10, 11, 12] }]}
        //xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6] }]}
      />
    </div>
  );

}



export default ScurveChart;
