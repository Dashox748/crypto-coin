import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';
import {CDBContainer} from 'cdbreact';
import {useEffect} from "react";
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
    TimeScale
} from 'chart.js';

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

const Chart = ({id}) => {
    const options = {
        responsive: true,
        fill: true,
        borderColor: 'rgb(194, 116, 161)',
        backgroundColor: 'rgba(194, 116, 161, 0.5)',
        pointRadius: 1,
        lineTension: 0.01,
        pointHitRadius: 20,
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    source: 'auto',
                    stepSize: 50,
                    maxRotation: 0,
                    autoSkip: false,
                    maxTicksLimit: 10,
                }
            },

        },
    };
    const [data, setData] = useState({
        datasets: [
        ],
    });

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function convertMsToHM(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = seconds >= 30 ? minutes + 1 : minutes;
        minutes = minutes % 60;
        hours = hours % 24;

        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
    }

    const getDataForChart = async () => {
        let x = []
        let newArray = [];
        let newArrayTime = [];
        await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`).then((response) => response.json()).then((data) => x = data.prices)
        x.map((item) => {
            newArray.push(parseFloat(item[1].toFixed(2)))
            newArrayTime.push(convertMsToHM(item[0]))
        })
        setData({
            labels: newArrayTime,
            datasets: [
                {
                    label: 'Price',
                    data: newArray,
                },
            ],
        })
    }
    useEffect(() => {
        getDataForChart()
    }, [id])

    return (
        <CDBContainer className="m-0">
            <Line data={data} options={options}/>
    </CDBContainer>
    );
};

export default Chart;