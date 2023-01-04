import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdvancedChart = ({ chartData }: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={200}
        height={400}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
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
        <XAxis dataKey="date" interval={40} />
        <YAxis
          tickCount={8}
          domain={[
            chartData?.reduce(function (prev: number, curr: CoinDataTypes) {
              return prev < curr.price ? prev : curr;
            }),
            chartData?.reduce(function (prev: number, curr: CoinDataTypes) {
              return prev > curr.price ? prev : curr;
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
