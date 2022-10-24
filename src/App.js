import "./App.css";
import Header from "./containers/Header/Header";
import Sidebar from "./containers/Sidebar/Sidebar";
import Home from "./containers/Home/Home";
import MostPopular from "./containers/MostPopular/MostPopular";
import TrendingCurrencies from "./containers/TrendingCurrencies/TrendingCurrencies";
import FavouriteCurrencies from "./containers/FavouriteCurrencies/FavouriteCurrencies";
import AdvancedInfoAboutCurrency from "./containers/AdvencedInfoAboutCurrency/AdvancedInfoAboutCurrency";
import ListOfAllCurrencies from "./containers/ListOfAllCurrencies/ListOfAllCurrencies";
import NotFound from "./containers/NotFound/NotFound";
import { BrowserRouter as Router } from "react-router-dom";
import {checkData} from "./firebase";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import {useEffect,useState} from "react";

function App() {
    const [user] = useAuthState(auth);
    const [updateFavourite,setUpdateFavourite]=useState(false)



  return (
    <div className="App d-flex flex-column">
      <Header />
      <div className="d-flex flex-fill">
        <BrowserRouter>
            <Sidebar user={user} updateFavourite={updateFavourite}/>
            <div className="d-flex flex-fill" style={{  background: "rgba(237, 242, 247, 30%);"}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="currencies">
                  <Route path="ListOfAll" element={<ListOfAllCurrencies user={user} updateFavourite={updateFavourite} setUpdateFavourite={setUpdateFavourite}/> } />
                <Route path="MostPopular" element={<MostPopular />} />
                <Route path="Favourites" element={<FavouriteCurrencies />} />
                <Route path="Trending" element={<TrendingCurrencies />} />
                <Route
                  path="AdvancedInfo/:id"
                  element={<AdvancedInfoAboutCurrency />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
