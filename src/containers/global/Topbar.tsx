import {
  Box,
  Typography,
  Container,
  useTheme,
  AppBar,
  Toolbar,
  InputBase,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import useResponsive from "../../utils/hooks/useResponsive";
import { TopbarProps } from "./utils/interfaces";
import TopbarMenu from "./utils/TopbarMenu";

import IconButton from "@mui/material/IconButton";
import logoDark from "../../assets/logo-dark.png";

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
          <Link
            to="/"
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              textDecoration: "none",
              color: "white",
            }}
          >
            <img
              src={logoDark}
              alt="logo"
              style={{ width: "50px", height: "50px" }}
            />

            {up700px && (
              <Typography
                sx={{ fontSize: "calc(1.375rem + 1.3vw)", fontWeight: "700" }}
              >
                CryptoCoin
              </Typography>
            )}
          </Link>
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
