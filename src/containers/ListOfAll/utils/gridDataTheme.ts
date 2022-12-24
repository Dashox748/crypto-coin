import { styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

export const CustomDataGrid = styled(DataGrid)((background: any) => ({
  border: 0,
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  [`& .${gridClasses.row}.evenlight`]: {
    backgroundColor: "rgb(27, 26, 29)",
  },
  [`& .${gridClasses.row}.evendark`]: {
    backgroundColor: "#1B2028",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
    height: "80px",
    padding: "0 5px",
  },
  "& .MuiDataGrid-columnHeader": {
    padding: "0 5px",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .price-change.negative": {
    color: "rgb(220,53,69)",
    fontWeight: "600",
  },
  "& .price-change.positive": {
    color: "rgb(25,135,84)",
    fontWeight: "600",
  },
}));
