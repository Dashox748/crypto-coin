import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function CustomizedTables({
  change1h,
  change24h,
  change7d,
  change30d,
  change1y,
}: any) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgb(20, 19, 22)",
      border: "2px solid gray",
      color: "gray",
      padding: "10px",
    },
    [`&.${tableCellClasses.body}`]: {
      border: "2px solid gray",
      padding: "10px",
    },
  }));
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">1h</StyledTableCell>
            <StyledTableCell align="center">24h</StyledTableCell>
            <StyledTableCell align="center">7d</StyledTableCell>
            <StyledTableCell align="center">30d</StyledTableCell>
            <StyledTableCell align="center">1y</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell
              align="center"
              sx={{
                color: change1h > 0 ? "rgb(0, 224, 142)" : "rgb(220,53,69)",
              }}
            >
              {change1h?.toFixed(2)}%
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{
                color: change24h > 0 ? "rgb(0, 224, 142)" : "rgb(220,53,69)",
              }}
            >
              {change24h?.toFixed(2)}%
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{
                color: change7d > 0 ? "rgb(0, 224, 142)" : "rgb(220,53,69)",
              }}
            >
              {change7d?.toFixed(2)}%
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{
                color: change30d > 0 ? "rgb(0, 224, 142)" : "rgb(220,53,69)",
              }}
            >
              {change30d?.toFixed(2)}%
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{
                color: change1y > 0 ? "rgb(0, 224, 142)" : "rgb(220,53,69)",
              }}
            >
              {change1y?.toFixed(2)}%
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
