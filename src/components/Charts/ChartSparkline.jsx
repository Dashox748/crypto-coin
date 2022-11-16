import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

const Chart = ({ sparkline, dataSevenDays }) => {
  const [data, setData] = useState({
    labels: new Array(sparkline.length).fill(""),
    datasets: [
      {
        label: "Price",
        data: sparkline,
      },
    ],
  });

  const changeData = async () => {
    await setData({
      labels: new Array(sparkline.length).fill(""),
      datasets: [
        {
          label: "Price",
          data: sparkline,
        },
      ],
    });
  };
  useEffect(() => {
    changeData();
  }, [sparkline]);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    borderColor: dataSevenDays < 0 ? "#dc3545" : "#198754",
    backgroundColor: "#f1f7fd",
    pointRadius: 0,
    lineTension: 0.1,
    scales: {
      x: {
        grid: {
          display: false,
        },
        display: false,
      },
      y: {
        grid: {
          display: false,
        },
        display: false,
      },
      axis: {
        display: false,
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      labels: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="chart-container-spark">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
