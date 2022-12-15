import './App.css'
import SidebarLeft from "./containers/global/Sidebar"
import Topbar from './containers/global/Topbar'
import {Route, Routes} from "react-router-dom";
import {Container} from '@mui/material';
import React from "react";
import ListOfAll from './containers/ListOfAll/ListOfAll';
import NotFound from "./containers/NotFound/NotFound";
import Contact from "./containers/Contact/Contact";
import TrendingCurrencies from "./containers/TrendingCurrencies/TrendingCurrencies";

function App() {

    return (
        <div className="app">
            <SidebarLeft/>
            <main style={{background: "#31353F"}}>
                <Topbar/>
                <Container maxWidth="xl">
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
            </main>
        </div>
    )
}

export default App
