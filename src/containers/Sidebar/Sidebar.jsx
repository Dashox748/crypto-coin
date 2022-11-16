import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { checkData } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../redux/darkThemeSlice";
import "./sidebar.css";

const Sidebar = () => {
  const [showFavourite, setShowFavourite] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const [favourite, setFavourite] = useState([]);
  const [popular, setPopular] = useState([]);
  const [user] = useAuthState(auth);
  const darkTheme = useSelector((state) => state.darkTheme.value);
  const loadFavourite = useSelector((state) => state.loadFavourite.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      setFavourite([]);
      return;
    }
    checkData(user.uid).then((listFavourite) => setFavourite(listFavourite));
  }, [user, loadFavourite]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cdogecoin%2Cethereum%2Cterra-luna-2&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setPopular(data);
      });
  }, []);

  return (
    <>
      <div
        style={{ display: "flex", overflow: "scroll initial", top: "115px" }}
        className={
          darkTheme
            ? "sticky-top sticky-sidebar border-position-sidebar "
            : "border-end sticky-top sticky-sidebar border-top"
        }
      >
        <CDBSidebar
          toggled={window.innerWidth < 1400}
          breakpoint={1400}
          textColor="black"
          backgroundColor="white"
          style={{
            background: darkTheme ? "#1B1A1D" : null,
            color: darkTheme ? "white" : null,
          }}
        >
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Menu
            </a>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content d-flex">
            <CDBSidebarMenu className=" flex-fill">
              <NavLink to="Currencies/ListOfAll">
                <CDBSidebarMenuItem
                  className={
                    darkTheme
                      ? "sidebar-item-hover-dark"
                      : "sidebar-item-hover-light"
                  }
                  icon="clipboard-list"
                  style={{ color: darkTheme ? "white" : "" }}
                >
                  List of All
                </CDBSidebarMenuItem>
              </NavLink>

              <CDBSidebarMenuItem
                style={{ color: darkTheme ? "white" : "black" }}
                className={
                  darkTheme
                    ? "sidebar-item-hover-dark user-select-none"
                    : "sidebar-item-hover-light user-select-none"
                }
                icon="fire"
                suffix={
                  !showPopular ? (
                    <i className="bi bi-caret-down m-2"></i>
                  ) : (
                    <i className="bi bi-caret-up m-2"></i>
                  )
                }
                onClick={() => setShowPopular(!showPopular)}
              >
                Most Popular
              </CDBSidebarMenuItem>
              <div
                className={
                  showPopular
                    ? "d-flex flex-column"
                    : "d-flex flex-column d-none"
                }
              >
                {popular.length !== 0
                  ? popular.map((data, index) => (
                      <NavLink
                        key={index}
                        to={`Currencies/AdvancedInfo/${data.id}`}
                      >
                        <div
                          style={{ color: darkTheme ? "white" : "" }}
                          className={
                            darkTheme
                              ? "d-flex align-items-center justify-content-center sidebar-item-hover-dark py-2 flex-fill fw-normal"
                              : "d-flex align-items-center justify-content-center sidebar-item-hover-light py-2 flex-fill fw-normal"
                          }
                        >
                          <img
                            src={data.image}
                            alt="siema"
                            style={{
                              width: "30px",
                              height: "30px",
                              marginLeft: "-5px",
                            }}
                          />
                          <CDBSidebarMenuItem
                            className="my-0 mx-0 p-0 hide-name-on-toggle"
                            tag="img"
                            style={{ width: "100px" }}
                          >
                            {data.name}
                          </CDBSidebarMenuItem>
                        </div>
                      </NavLink>
                    ))
                  : null}
              </div>

              <CDBSidebarMenuItem
                suffix={
                  !showFavourite ? (
                    <i className="bi bi-caret-down m-2"></i>
                  ) : (
                    <i className="bi bi-caret-up m-2"></i>
                  )
                }
                style={{ color: darkTheme ? "white" : "black" }}
                icon="star"
                onClick={() => {
                  if (favourite.length !== 0) {
                    setShowFavourite(!showFavourite);
                  } else {
                    if (user === null) {
                      toast.info("u have to be logged in");
                    } else {
                      toast.info("Favourite list is empty");
                    }
                  }
                }}
                className={
                  darkTheme
                    ? "user-select-none sidebar-item-hover-dark"
                    : "user-select-none sidebar-item-hover-light"
                }
              >
                Favourites
              </CDBSidebarMenuItem>
              <div
                className={
                  showFavourite
                    ? "d-flex flex-column"
                    : "d-flex flex-column d-none"
                }
              >
                {favourite.length !== 0
                  ? favourite.slice(0, 4).map((currency, index) => (
                      <NavLink
                        key={index}
                        to={`Currencies/AdvancedInfo/${currency.keyToApi}`}
                      >
                        <div
                          style={{ color: darkTheme ? "white" : "" }}
                          className={
                            darkTheme
                              ? "d-flex align-items-center justify-content-center sidebar-item-hover-dark py-2 flex-fill"
                              : "d-flex align-items-center justify-content-center sidebar-item-hover-light py-2 flex-fill"
                          }
                        >
                          <img
                            src={`${currency.image}`}
                            alt="siema"
                            style={{
                              width: "30px",
                              height: "30px",
                              marginLeft: "-5px",
                            }}
                          />
                          <CDBSidebarMenuItem
                            className="my-0 mx-0 p-0 xd2"
                            tag="img"
                            style={{ width: "100px" }}
                          >
                            {currency.fullName}
                          </CDBSidebarMenuItem>
                        </div>
                      </NavLink>
                    ))
                  : null}
                {favourite.length > 3 ? (
                  <NavLink to="Currencies/Favourites">
                    <div
                      style={{ color: darkTheme ? "white" : null }}
                      className={
                        darkTheme
                          ? "d-flex align-items-center sidebar-item-hover-dark justify-content-center p-1 mb-3"
                          : "d-flex align-items-center sidebar-item-hover-light justify-content-center p-1 mb-3"
                      }
                    >
                      <div className="my-0 mx-0 p-0 fw-semibold">Show All</div>
                    </div>
                  </NavLink>
                ) : null}
              </div>
              <NavLink to="Currencies/Trending">
                <CDBSidebarMenuItem
                  className={
                    darkTheme
                      ? "sidebar-item-hover-dark"
                      : "sidebar-item-hover-light"
                  }
                  icon="chart-line"
                  style={{ color: darkTheme ? "white" : "" }}
                >
                  Trending
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink
                to="/hero404"
                style={{ color: darkTheme ? "white" : "" }}
              >
                <CDBSidebarMenuItem
                  className={
                    darkTheme
                      ? "sidebar-item-hover-dark"
                      : "sidebar-item-hover-light"
                  }
                  icon="exclamation-circle"
                >
                  404 page
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter className="mb-4 user-select-none">
            <NavLink to="/Contact" className="text-decoration-none">
              <CDBSidebarMenuItem
                className={
                  darkTheme
                    ? "sidebar-item-hover-dark d-flex"
                    : "sidebar-item-hover-light d-flex"
                }
                icon="comment-dots"
                style={{
                  color: darkTheme ? "white" : "black",
                  cursor: "pointer",
                }}
              >
                Contact Us
              </CDBSidebarMenuItem>
            </NavLink>
            <div className="d-flex flex-wrap align-items-center">
              <CDBSidebarMenuItem className="d-flex" icon="palette">
                <div className="d-flex align-items-center justify-content-center py-2">
                  Dark Mode
                </div>
              </CDBSidebarMenuItem>
              <div className="d-flex justify-content-center flex-fill orm-check form-switch">
                <input
                  checked={!!darkTheme}
                  onChange={() => dispatch(changeTheme())}
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  style={{ cursor: "pointer", paddingLeft: "30px" }}
                />
              </div>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default Sidebar;
