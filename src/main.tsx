import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import {ProSidebarProvider} from 'react-pro-sidebar';
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <ProSidebarProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ProSidebarProvider>
)
