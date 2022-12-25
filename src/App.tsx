import "./App.css";
import SidebarLeft from "./containers/global/Sidebar";
import Topbar from "./containers/global/Topbar";
import { Route, Routes } from "react-router-dom";
import { Box, Container } from "@mui/material";
import React, { useState, lazy, Suspense } from "react";
import ListOfAll from "./containers/ListOfAll/ListOfAll";
import useResponsive from "./utils/hooks/useResponsive";

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
            overflow: "auto",
            padding: responsive ? "0 10px!important" : "",
          }}
        >
          <Topbar />
          <Container maxWidth={false} sx={{ padding: "0!important" }}>
            <Routes>
              <Route path="/" element={<ListOfAll />} />
              <Route path="profile/:id" />
              <Route path="settings/:id" />
              <Route path="listOfAll" element={<ListOfAll />} />
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
