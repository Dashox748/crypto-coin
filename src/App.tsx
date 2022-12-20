import "./App.css";
import SidebarLeft from "./containers/global/Sidebar";
import Topbar from "./containers/global/Topbar";
import {Route, Routes} from "react-router-dom";
import {Box, Container} from "@mui/material";
import React, {useState, lazy, Suspense} from "react";
import ListOfAll from "./containers/ListOfAll/ListOfAll";

const NotFound = lazy(() => import("./containers/NotFound/NotFound"))
const Contact = lazy(() => import("./containers/Contact/Contact"))
const TrendingCurrencies = lazy(() => import("./containers/TrendingCurrencies/TrendingCurrencies"))
const AdvancedInfoAboutCurrency = lazy(() => import("./containers/AdvancedInfoAboutCurrency/AdvancedInfoAboutCurrency"))

import {
    ThemeProvider
} from "@mui/material";
import {darkTheme, lightTheme} from "./utils/Theme";

function App() {
    const [lightMode, setLightMode] = useState<boolean>(true)

    const changeTheme = () => {
        setLightMode(!lightMode)
    }
    return (
        <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
            <Box className="app">
                <SidebarLeft changeTheme={changeTheme}/>
                <Container maxWidth={false}
                           sx={{background: (theme) => theme.palette.background.default, overflow: "auto"}}>
                    <Topbar/>
                    <Container maxWidth={false}>
                        <Routes>
                            <Route path="/" element={<ListOfAll/>}/>
                            <Route path="profile/:id"/>
                            <Route path="settings/:id"/>
                            <Route path="listOfAll" element={<ListOfAll/>}/>
                            <Route path="trending" element={<Suspense><TrendingCurrencies/></Suspense>}/>
                            <Route path="advancedInfo/:coin"
                                   element={<Suspense>< AdvancedInfoAboutCurrency/></Suspense>}/>
                            <Route path="contact" element={<Suspense><Contact/></Suspense>}/>
                            <Route path="notFound" element={<Suspense><NotFound/></Suspense>}/>
                        </Routes>
                    </Container>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
