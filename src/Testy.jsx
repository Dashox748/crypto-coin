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
import { checkData } from "./firebase";
import Notification from "./components/Notification/Notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({ user }) => {
  const [showFavourite, setShowFavourite] = useState(false);
  const [favourite, setFavourite] = useState([]);
  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    if (user === null) return;
    checkData(user.uid).then((listFavourite) => setFavourite(listFavourite));
  }, [user]);

  return (
    <>
      <div
        style={{ display: "flex", overflow: "scroll initial" }}
        className="wazne border-end"
      >
        <CDBSidebar textColor="black" backgroundColor="white">
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
              <NavLink to="/profile">
                <CDBSidebarMenuItem className="szmata" icon="clipboard-list">
                  List of All
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/">
                <CDBSidebarMenuItem className="szmata" icon="fire">
                  Most Popular
                </CDBSidebarMenuItem>
              </NavLink>

              <CDBSidebarMenu className=" p-0">
                <CDBSidebarMenuItem
                  icon="star"
                  onClick={() => {
                    if (favourite.length !== 0) {
                      setShowFavourite(!showFavourite);
                    } else {
                      toast.info("Favourite list is empty");
                    }
                  }}
                  className="user-select-none d-flex align-items-center align-content-center szmata"
                >
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
                    theme="light"
                    className="toast-notification"
                  />
                  Favourites
                  {!showFavourite ? (
                    <i class="bi bi-caret-down m-2"></i>
                  ) : (
                    <i class="bi bi-caret-up m-2"></i>
                  )}
                </CDBSidebarMenuItem>
                <div
                  className={
                    showFavourite
                      ? "d-flex flex-column"
                      : "d-flex flex-column d-none"
                  }
                >
                  {favourite.length !== 0
                    ? favourite.map((currency, index) => (
                        <CDBSidebarMenuItem key={index} className="my-0 sciera">
                          {currency.fullName}
                        </CDBSidebarMenuItem>
                      ))
                    : null}
                </div>
              </CDBSidebarMenu>

              <NavLink to="/analytics">
                <CDBSidebarMenuItem className="szmata" icon="chart-line">
                  Trending
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink to="/hero404" target="_blank">
                <CDBSidebarMenuItem
                  className="szmata"
                  icon="exclamation-circle"
                >
                  404 page
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter>
            <div className="form-check form-switch m-4">
              <input
                className="form-check-input "
                type="checkbox"
                id="flexSwitchCheckDefault"
                style={{ cursor: "pointer", marginRight: "20px" }}
              />
              <span className=" user-select-none">Dark Mode</span>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default Sidebar;