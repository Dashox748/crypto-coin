import {
  GridColDef,
  GridCellParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import clsx from "clsx";
import SparklineChart from "./SparklineChart";
import changeFormat from "../../../utils/hooks/changeFormat";

export const columns: GridColDef[] = [
  { field: "id", headerName: "#", minWidth: 10, maxWidth: 30 },
  {
    field: "Name",
    renderCell: (cellValues: GridRenderCellParams) => {
      return (
        <Link
          to={cellValues.value.link}
          style={{
            textDecoration: "none",
            color: "white",
            cursor: "pointer",
            width: "100%",
            height: "100%",
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <img
            src={cellValues.value.img}
            alt={`${cellValues.value.Name} Logo`}
            style={{ width: "30px", height: "30px" }}
          />
          {cellValues.value.Name}
        </Link>
      );
    },
    flex: 1,
    sortable: false,
  },
  {
    field: "Price",
    valueFormatter: ({ value }) => `$ ${changeFormat(value, 3, 12)}`,
    flex: 1,
  },
  {
    field: "1h%",
    description: "price change in last hour",
    valueFormatter: ({ value }) => `${value.toFixed(2)} %`,
    flex: 0.7,
    cellClassName: (params: GridCellParams<number>) => {
      if (params.value == null) {
        return "";
      }
      return clsx("price-change", {
        negative: params.value < 0,
        positive: params.value > 0,
      });
    },
  },
  {
    field: "24h%",
    description: "price change in last day",
    valueFormatter: ({ value }) => `${value?.toFixed(2)} %`,
    flex: 0.7,
    cellClassName: (params: GridCellParams<number>) => {
      if (params.value == null) {
        return "";
      }
      return clsx("price-change", {
        negative: params.value < 0,
        positive: params.value > 0,
      });
    },
  },
  {
    field: "7d%",
    description: "price change in last week",
    valueFormatter: ({ value }) => `${value?.toFixed(2)} %`,
    flex: 0.7,
    cellClassName: (params: GridCellParams<number>) => {
      if (params.value == null) {
        return "";
      }
      return clsx("price-change", {
        negative: params.value < 0,
        positive: params.value > 0,
      });
    },
  },
  {
    field: "Market Cap",
    description: "price change in last week",
    valueFormatter: ({ value }) => `$ ${changeFormat(value, 3, 12)}`,
    flex: 1,
  },
  {
    field: "7 Day Chart",
    description: "This column has a value getter and is not sortable.",
    flex: 1.1,
    maxWidth: 300,
    renderCell: (cellValues: GridRenderCellParams) => {
      return <SparklineChart sparkLineData={cellValues.value} />;
    },
    sortable: false,
  },
];
