import { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Container,LinearProgress } from "@mui/material";

import Topbar from "./containers/global/Topbar";
import SidebarLeft from "./containers/global/Sidebar";
import ListOfAll from "./containers/ListOfAll/ListOfAll";
const NotFound = lazy(() => import("./containers/NotFound/NotFound"));
const Contact = lazy(() => import("./containers/Contact/Contact"));
const TrendingCurrencies = lazy(
  () => import("./containers/TrendingCurrencies/TrendingCurrencies")
);
const AdvancedInfoAboutCurrency = lazy(
  () =>
    import("./containers/AdvancedInfoAboutCurrency/AdvancedInfoAboutCurrency")
);

import useResponsive from "./utils/hooks/useResponsive";
import { useProSidebar } from "react-pro-sidebar";

import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from "./utils/Theme";

function App() {
  const [lightMode, setLightMode] = useState<boolean>(true);
  const responsive = useResponsive("down", 750);
  const [fetching, setFetching] = useState<boolean>(false);
  const { collapseSidebar, collapsed } = useProSidebar();
  const [sidebarCollapse, setSidebarCollapse] = useState<boolean>(false);

  const changeTheme = () => {
    setLightMode(!lightMode);
  };
  const changeSidebar = () => {
    setSidebarCollapse(!sidebarCollapse);
  };

  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <Box className="app">
        <SidebarLeft
          changeTheme={changeTheme}
          collapseSidebar={collapseSidebar}
          collapsed={collapsed}
          sidebarCollapse={sidebarCollapse}
          changeSidebar={changeSidebar}
        />

        <Container
          maxWidth={false}
          sx={{
            background: (theme) => theme.palette.background.default,
            overflowY: "auto",
            padding: "0 0px!important",
            scrollbarWidth: "3px",
          }}
        >
          {fetching && (
            <LinearProgress
              sx={{
                position: "fixed",
                top: "0",
                zIndex: "3",
                width: "100%",
              }}
            />
          )}
          <Topbar
            collapseSidebar={collapseSidebar}
            changeSidebar={changeSidebar}
          />
          <Container
            maxWidth={false}
            sx={{
              padding: responsive ? "0 0px!important" : "0 20px!important",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<ListOfAll setFetching={setFetching} />}
              />
              <Route path="profile/:id" />
              <Route path="settings/:id" />
              <Route
                path="listOfAll"
                element={<ListOfAll setFetching={setFetching} />}
              />
              <Route
                path="trending"
                element={
                  <Suspense>
                    <TrendingCurrencies setFetching={setFetching} />
                  </Suspense>
                }
              />
              <Route
                path="advancedInfo/:coin"
                element={
                  <Suspense>
                    <AdvancedInfoAboutCurrency setFetching={setFetching} />
                  </Suspense>
                }
              />
              <Route
                path="contact"
                element={
                  <Suspense>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="notFound"
                element={
                  <Suspense>
                    <NotFound />
                  </Suspense>
                }
              />
            </Routes>
          </Container>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
