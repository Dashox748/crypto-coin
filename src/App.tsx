import "./App.css";
import SidebarLeft from "./containers/global/Sidebar";
import Topbar from "./containers/global/Topbar";
import {Route, Routes} from "react-router-dom";
import {Box, Container} from "@mui/material";
import React, {useState} from "react";
import ListOfAll from "./containers/ListOfAll/ListOfAll";
import NotFound from "./containers/NotFound/NotFound";
import Contact from "./containers/Contact/Contact";
import TrendingCurrencies from "./containers/TrendingCurrencies/TrendingCurrencies";
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
                            <Route path="trending" element={<TrendingCurrencies/>}/>
                            <Route path="advancedInfo/:coin"/>
                            <Route path="contact" element={<Contact/>}/>
                        </Routes>
                    </Container>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
