import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  menuClasses,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import logoDark from "../../assets/logo-dark.png";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ErrorIcon from "@mui/icons-material/Error";
import ChatIcon from "@mui/icons-material/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { createSubMenu, createMenuItem } from "./utils/menu";
import { fetchMostPopularCrypto } from "./utils/fetch";
import { useEffect, useState } from "react";
import { fetchCoins } from "./utils/interfaces";

interface props {
  changeTheme: () => void;
}

const SidebarLeft = ({ changeTheme }: props) => {
  const theme = useTheme();
  const { collapseSidebar, collapsed } = useProSidebar();
  const [mostPopular, setMostPopular] = useState<fetchCoins[]>([]);

  useEffect(() => {
    (async () => {
      setMostPopular(await fetchMostPopularCrypto());
    })();
  }, []);

  return (
    <Box>
      <Sidebar
        width="225px"
        backgroundColor={theme.palette.background.paper}
        rootStyles={{
          height: "100%",
          border: "0",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Menu style={{ top: "0" }}>
            <MenuItem
              rootStyles={{
                ["." + menuClasses.button]: {
                  color: "white",
                  height: "80px",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {!collapsed ? (
                  <Box display="flex" gap="6px">
                    <img
                      src={logoDark}
                      alt=""
                      style={{ width: "35px", height: "35px" }}
                    />
                    <Typography sx={{ fontSize: "21px", fontWeight: "700" }}>
                      CryptoCoin
                    </Typography>
                  </Box>
                ) : null}
                <IconButton onClick={() => collapseSidebar()}>
                  <MenuOutlinedIcon style={{ color: "white" }} />
                </IconButton>
              </Box>
            </MenuItem>
            {createMenuItem(<ListAltIcon />, "List Of All", "listOfAll", theme)}
            {createSubMenu(<WhatshotIcon />, "Most Popular", [
              mostPopular.map((item: fetchCoins) =>
                createMenuItem(
                  <img
                    style={{ width: "25px", height: "25px" }}
                    src={item.image}
                  />,
                  item.name,
                  `/advancedInfo/${item.id}`,
                  theme
                )
              ),
            ])}
            {createSubMenu(<StarIcon />, "Favourite", [])}
            {createMenuItem(<TrendingUpIcon />, "Trending", "trending", theme)}
            {createMenuItem(<ErrorIcon />, "404 page", "notFound", theme)}
          </Menu>
          <Menu>
            {createMenuItem(<ChatIcon />, "Cotact Us", "contact", theme)}
            <MenuItem
              onClick={() => changeTheme()}
              icon={<DarkModeIcon />}
              rootStyles={{
                ["." + menuClasses.button]: {
                  backgroundColor: `${theme.palette.background.paper}`,
                  color: "#9E9E9E",
                  "&:hover": {
                    backgroundColor: "#7314ed",
                    color: "white",
                  },
                },
              }}
            >
              Theme
            </MenuItem>
          </Menu>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default SidebarLeft;
