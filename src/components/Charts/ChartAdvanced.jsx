import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useEffect } from "react";
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

const ChartAdvanced = ({ id }) => {
  const [activeRange, setActiveRange] = useState("1");
  const [activeType, setActiveType] = useState(true);
  const [data, setData] = useState({
    datasets: [],
  });
  const options = {
    responsive: true,
    fill: true,
    maintainAspectRatio: false,
    borderColor: "#7db5ec",
    backgroundColor: "rgba(14,69,120,30%)",
    pointRadius: 0,
    lineTension: 0.1,
    pointHitRadius: 20,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          source: "auto",
          stepSize: 50,
          maxRotation: 0,
          autoSkip: false,
          maxTicksLimit: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  function convertMsToTime(milliseconds) {
    const date = new Date(milliseconds);
    if (activeRange === "1" || activeRange === "7") {
      return date.toLocaleTimeString("en-US").slice(0, 4);
    }
    if (activeRange === "30") {
      const reg = /\d+\/\d+/gm;
      const x = date.toLocaleDateString("en-US");
      return x.match(reg);
    }
    if (activeRange === "360") {
      const reg = /\/\d+\//gm;
      const x = date.toLocaleDateString("en-US");
      return x.replace(reg, "/");
    }
    if (activeRange === "max") {
      const reg = /\d+\/\d+\//gm;
      const x = date.toLocaleDateString("en-US");
      return x.replace(reg, "");
    }
  }

  // not used right now, maybe in feature as left legend of the chart
  //    function convertToShort(x) {
  //        if(isNaN(x)) return x;
  //
  //        if(x < 9999) {
  //            return x;
  //        }
  //
  //        if(x < 1000000) {
  //            return Math.round(x/1000) + "K";
  //        }
  //        if( x < 10000000) {
  //            return (x/1000000).toFixed(2) + "M";
  //        }
  //
  //        if(x < 1000000000) {
  //            return Math.round((x/1000000)) + "M";
  //        }
  //
  //        if(x < 1000000000000) {
  //            return Math.round((x/1000000000)) + "B";
  //        }
  //
  //        return "1T+";
  //    }
  //    function padTo2Digits(num) {
  //        return num.toString().padStart(2, '0');
  //    }

  const getDataForChart = async () => {
    let x = [];
    let newArray = [];
    let newArrayTime = [];
    await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${activeRange}`
    )
      .then((response) => response.json())
      .then((data) => (x = activeType ? data.prices : data.market_caps));
    x.map((item) => {
      if (activeType) {
        if (item[1] !== null) newArray.push(parseFloat(item[1].toFixed(4)));
        if (item[0] !== null) newArrayTime.push(convertMsToTime(item[0]));
      }
      if (!activeType) {
        if (item[1] !== null) newArray.push(parseFloat(item[1].toFixed(4)));
        if (item[0] !== null) newArrayTime.push(convertMsToTime(item[0]));
      }
    });
    setData({
      labels: newArrayTime,
      datasets: [
        {
          label: activeType ? "Price" : "Market Cap",
          data: newArray,
        },
      ],
    });
  };
  useEffect(() => {
    getDataForChart();
  }, [id, activeRange, activeType]);
  console.log();
  return (
    <div className="advanced_contaier_left-main-info-chart chart-container my-5 py-5 m-auto">
      <div className="d-flex justify-content-between mb-3 flex-column flex-sm-row gap-3">
        <div className="d-flex gap-1 gap-md-4 buttons-group-range">
          <button
            className="rounded-4 px-3 py-1"
            style={{ background: activeType ? "#F3F3F3" : null }}
            onClick={() => setActiveType(true)}
          >
            Price
          </button>
          <button
            className="rounded-4 px-3 py-1"
            style={{ background: !activeType ? "#F3F3F3" : null }}
            onClick={() => setActiveType(false)}
          >
            Market Cap
          </button>
        </div>
        <div className="d-flex gap-1 gap-md-4 buttons-group-range ">
          <button
            className="rounded-4 px-3 py-1"
            style={{ background: activeRange === "1" ? "#F3F3F3" : null }}
            onClick={() => setActiveRange("1")}
          >
            1D
          </button>
          <button
            className="rounded-4 px-3 py-1"
            style={{ background: activeRange === "7" ? "#F3F3F3" : null }}
            onClick={() => setActiveRange("7")}
          >
            1W
          </button>
          <button
            className="rounded-4 px-3 py-1"
            style={{ background: activeRange === "30" ? "#F3F3F3" : null }}
            onClick={() => setActiveRange("30")}
          >
            1M
          </button>
          <button
            className="rounded-4 px-3 py-1"
            style={{ background: activeRange === "360" ? "#F3F3F3" : null }}
            onClick={() => setActiveRange("360")}
          >
            1Y
          </button>
          <button
            className="rounded-4 px-3 py-1"
            style={{ background: activeRange === "max" ? "#F3F3F3" : null }}
            onClick={() => setActiveRange("max")}
          >
            ALL
          </button>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartAdvanced;
