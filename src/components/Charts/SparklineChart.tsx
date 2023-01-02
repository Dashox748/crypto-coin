import { Sparklines, SparklinesLine } from "react-sparklines";

const SparklineChart = ({ sparkLineData }: any) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sparklines
        data={sparkLineData.sparkline?.price}
        style={{ width: "100%", height: "65px" }}
      >
        <SparklinesLine
          color={sparkLineData?.change < 0 ? "#dc3545" : "green"}
          style={{ fill: "none", strokeWidth: "3px" }}
        />
      </Sparklines>
    </div>
  );
};

export default SparklineChart;
