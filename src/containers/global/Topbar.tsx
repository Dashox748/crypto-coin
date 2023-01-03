import { Box, Typography, Container, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";

import useResponsive from "../../utils/hooks/useResponsive";
import { TopbarProps } from "./utils/interfaces";

import logoDark from "../../assets/logo-dark.png";
import TopbarMenu from "./utils/TopbarMenu";
import IconButton from "@mui/material/IconButton";

const Topbar = ({ changeSidebar }: TopbarProps) => {
  const theme = useTheme();

  const up700px = useResponsive("up", 800);
  const up750px = useResponsive("up", 751);
  return (
    <AppBar
      position="sticky"
      sx={{
        background: `${theme.palette.background.default}`,
        boxShadow: "none",
        top: "0",
        display: "flex",
        marginBottom: "50px",
        height: "120px",
        zIndex: "2",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0!important",
          }}
        >
          <Box display="flex" gap="15px" alignItems="center">
            <Link to="/">
              <img
                src={logoDark}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
            {up700px && (
              <Typography
                sx={{ fontSize: "calc(1.375rem + 1.3vw)", fontWeight: "700" }}
              >
                CryptoCoin
              </Typography>
            )}
          </Box>
          <InputBase
            sx={{
              m: 2,
              flex: 1,
              maxWidth: "500px",
              background: "#1B2028",
              borderRadius: "10px",
              padding: "6px 25px",
              color: "gray",
            }}
            placeholder="Search any coin..."
          />
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            {!up750px ? (
              <>
                <IconButton onClick={() => changeSidebar()}>
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <TopbarMenu />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Topbar;
