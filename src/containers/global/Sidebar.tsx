import { useEffect, useState } from "react";

import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { createSubMenu, createMenuItem } from "./utils/createSidebarMenus";
import { useLocation } from "react-router-dom";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ErrorIcon from "@mui/icons-material/Error";
import ChatIcon from "@mui/icons-material/Chat";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloseIcon from "@mui/icons-material/Close";
import TopbarMenu from "./utils/TopbarMenu";

import { fetchMostPopularCrypto } from "./utils/fetch";
import { fetchCoins } from "./utils/interfaces";
import useResponsive from "../../utils/hooks/useResponsive";
import { SidebarProps } from "./utils/interfaces";

const SidebarLeft = ({
  changeTheme,
  collapseSidebar,
  collapsed,
  sidebarCollapse,
  changeSidebar,
}: SidebarProps) => {
  let location = useLocation();
  const theme = useTheme();
  const responsiveCollapse = useResponsive("down", 1100);
  const down750px = useResponsive("down", 750);
  const [mostPopular, setMostPopular] = useState<fetchCoins[]>([]);

  useEffect(() => {
    (async () => {
      setMostPopular(await fetchMostPopularCrypto());
    })();
  }, []);
  useEffect(() => {
    if (!sidebarCollapse) return;
    changeSidebar();
  }, [location]);

  return (
    <Box>
      <Sidebar
        width="238px"
        transitionDuration={300}
        defaultCollapsed={responsiveCollapse ? !down750px : false}
        backgroundColor={theme.palette.background.paper}
        rootStyles={{
          height: "100%",
          border: "0",
          zIndex: "55",
          position: down750px ? "fixed" : "static",
          left: !sidebarCollapse ? "-750px" : "0",
          width: down750px ? "100vw" : "238px",
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
                    <Typography sx={{ fontSize: "21px", fontWeight: "700" }}>
                      Menu
                    </Typography>
                  </Box>
                ) : null}
                <IconButton
                  onClick={() =>
                    down750px ? changeSidebar() : collapseSidebar()
                  }
                >
                  {!down750px ? <MenuOutlinedIcon /> : <CloseIcon />}
                </IconButton>
              </Box>
            </MenuItem>
            {down750px && <TopbarMenu />}
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
            {createMenuItem(<ChatIcon />, "Contact Us", "contact", theme)}
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
