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
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Contact from "./containers/Contact/Contact";
import Thanks from "./components/Thanks/Thanks";

    import { useSelector } from 'react-redux'

function App() {
    const  darkTheme = useSelector((state)=>state.darkTheme.value)
    const  loading = useSelector((state)=>state.loading.value)
  const [user] = useAuthState(auth);
  const [updateFavourite, setUpdateFavourite] = useState(false);
//  const [darkTheme, setDarkTheme] = useState(() => {
//    // getting stored value
//    const saved = localStorage.getItem("theme");
//    const initialValue = JSON.parse(saved);
//
//    return initialValue || true;
//  });

  useEffect(() => {
    // storing input name
    localStorage.setItem("theme", JSON.stringify(darkTheme));

  }, [darkTheme]);
  return (
    <div className="App d-flex flex-column">
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme={darkTheme?"dark":"light"}
            className="toast-notification"
        />
      <BrowserRouter>
        <Header darkTheme={darkTheme} />
        <div className="d-flex flex-fill">
          <Sidebar
            updateFavourite={updateFavourite}
            darkTheme={darkTheme}
          />
          <div
            className={
              darkTheme
                ? "d-flex flex-column flex-fill background-dark"
              : "d-flex flex-fill background"
            }
              style={{position:"relative"}}
          >
              {loading?<div className="loading_bar"/>:null}

    
            <Routes>
              <Route
                path="/"
                element={
                  <ListOfAllCurrencies
                    user={user}
                    updateFavourite={updateFavourite}
                    setUpdateFavourite={setUpdateFavourite}
                    darkTheme={darkTheme}
                  />
                }
              />
              <Route path="Currencies">
                <Route
                  path="ListOfAll"
                  element={
                    <ListOfAllCurrencies
                      user={user}
                      updateFavourite={updateFavourite}
                      setUpdateFavourite={setUpdateFavourite}
                      darkTheme={darkTheme}
                    />
                  }
                />
                <Route path="MostPopular" element={<MostPopular />} />
                <Route path="Favourites" element={<FavouriteCurrencies />} />
                <Route
                  path="Trending"
                  element={
                    <TrendingCurrencies
                      darkTheme={darkTheme}
                      user={user}
                      updateFavourite={updateFavourite}
                      setUpdateFavourite={setUpdateFavourite}
                    />
                  }
                />
                <Route
                  path="AdvancedInfo/:id"
                  element={<AdvancedInfoAboutCurrency darkTheme={darkTheme} />}
                />
              </Route>
                <Route path="Contact" element={<Contact darkTheme={darkTheme}/>}>

                </Route>
                <Route
                    path="Contact/Thanks"
                    element={<Thanks darkTheme={darkTheme} />}
                />
                <Route path="*" element={<NotFound darkTheme={darkTheme}/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
