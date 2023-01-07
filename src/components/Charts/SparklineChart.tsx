import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const SparklineChart = ({ sparkLineData }: any) => {
  const [finalData, setFinalData] = useState<any>();
  useEffect(() => {
    let tempData: any = [];
    sparkLineData.sparkline.price.map((item: any) => {
      let obj = {
        price: Number(item),
      };
      tempData.push(obj);
    });
    setFinalData(tempData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={finalData}>
        <YAxis
          hide
          domain={[
            finalData?.reduce(function (prev: number, curr: any) {
              return prev < curr?.price ? prev : curr?.price;
            }),
            finalData?.reduce(function (prev: number, curr: any) {
              return prev > curr?.price ? prev : curr?.price;
            }),
          ]}
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="price"
          stroke={sparkLineData.change > 0 ? "green" : "#dc3545"}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SparklineChart;
