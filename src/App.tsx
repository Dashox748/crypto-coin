import "./App.css";
import SidebarLeft from "./containers/global/Sidebar";
import Topbar from "./containers/global/Topbar";
import { Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import React, { useState, lazy, Suspense, useEffect } from "react";
import ListOfAll from "./containers/ListOfAll/ListOfAll";
import useResponsive from "./utils/hooks/useResponsive";
import LinearProgress from "@mui/material/LinearProgress";

const NotFound = lazy(() => import("./containers/NotFound/NotFound"));
const Contact = lazy(() => import("./containers/Contact/Contact"));
const TrendingCurrencies = lazy(
  () => import("./containers/TrendingCurrencies/TrendingCurrencies")
);
const AdvancedInfoAboutCurrency = lazy(
  () =>
    import("./containers/AdvancedInfoAboutCurrency/AdvancedInfoAboutCurrency")
);

import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./utils/Theme";

function App() {
  const [lightMode, setLightMode] = useState<boolean>(true);
  const responsive = useResponsive("down", 1200);
  const [fetching, setFetching] = useState<boolean>(true);

  const changeTheme = () => {
    setLightMode(!lightMode);
  };

  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <Box className="app">
        <SidebarLeft changeTheme={changeTheme} />

        <Container
          maxWidth={false}
          sx={{
            background: (theme) => theme.palette.background.default,
            overflowY: "auto",
            padding: responsive ? "0 0px!important" : "0 0!important",
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
          <Topbar />
          <Container
            maxWidth={false}
            sx={{ padding: responsive ? "0 10px!important" : "" }}
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
                    <TrendingCurrencies />
                  </Suspense>
                }
              />
              <Route
                path="advancedInfo/:coin"
                element={
                  <Suspense>
                    <AdvancedInfoAboutCurrency />
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
