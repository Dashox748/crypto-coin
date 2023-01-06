import { useEffect, useState } from "react";
import useResponsive from "../../../utils/hooks/useResponsive";
import { CoinDataTypes } from "./interfaces";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface xd {
  chartData: any;
  coinChartDays: any;
  coinChartType: any;
}
const AdvancedChart = ({ chartData, coinChartDays, coinChartType }: xd) => {
  console.log(coinChartType);
  const down540px = useResponsive("down", 540);
  const [intervalTick, setIntervalTick] = useState<number>(40);

  useEffect(() => {
    if (coinChartDays === "1") {
      setIntervalTick(down540px ? 80 : 40);
    }
    if (coinChartDays === "7") {
      setIntervalTick(down540px ? 70 : 40);
    }
    if (coinChartDays === "30") {
      setIntervalTick(down540px ? 150 : 120);
    }
    if (coinChartDays === "365") {
      setIntervalTick(down540px ? 120 : 70);
    }
    if (coinChartDays === "max") {
      setIntervalTick(down540px ? 600 : 380);
    }
  }, [chartData, down540px]);
  return (
    <ResponsiveContainer width="100%" height="100%" maxHeight={600}>
      <AreaChart
        width={200}
        height={400}
        data={chartData}
        margin={{
          top: 0,
          right: !down540px ? 30 : 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#666" />
        <XAxis dataKey="date" interval={intervalTick} />
        <YAxis
          tickFormatter={(tick) => {
            return Intl.NumberFormat("en-US", {
              notation: coinChartType !== "prices" ? "compact" : "standard",
              maximumFractionDigits: 1,
            }).format(tick);
          }}
          tickCount={8}
          domain={[
            chartData?.reduce(function (prev: number, curr: CoinDataTypes) {
              return prev < curr?.price ? prev : curr?.price;
            }),
            chartData?.reduce(function (prev: number, curr: CoinDataTypes) {
              return prev > curr?.price ? prev : curr?.price;
            }),
          ]}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          strokeWidth="2px"
          fillOpacity={1}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AdvancedChart;
