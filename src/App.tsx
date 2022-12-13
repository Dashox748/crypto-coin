import './App.css'
import SidebarLeft from "./containers/global/Sidebar"
import Topbar from './containers/global/Topbar'
import {Route, Routes} from "react-router-dom";

function App() {

    return (
        <div className="app">
            <SidebarLeft/>
            <main style={{background: "#31353F"}}>
                <Topbar/>
                <Routes>
                    <Route path=""></Route>
                    <Route path=""></Route>
                    <Route path=""></Route>
                    <Route path=""></Route>
                    <Route path=""></Route>
                    <Route path=""></Route>
                </Routes>
            </main>
        </div>
    )
}

export default App
