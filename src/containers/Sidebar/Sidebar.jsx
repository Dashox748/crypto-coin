import React, {useEffect, useState} from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from "cdbreact";
import {NavLink} from "react-router-dom";
import {auth} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {checkData} from "../../firebase";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({updateFavourite}) => {
    const [showFavourite, setShowFavourite] = useState(false);
    const [favourite, setFavourite] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user === null) {
            setFavourite([])
            return
        }
        ;
        checkData(user.uid).then((listFavourite) => setFavourite(listFavourite));
    }, [user, updateFavourite]);

    return (
        <>
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
            <div
                style={{display: "flex", overflow: "scroll initial", top: "111px"}}
                className="border-end sticky-top sticky-sidebar"
            >
                <CDBSidebar breakpoint={1250} textColor="black" backgroundColor="white">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <a
                            href="/"
                            className="text-decoration-none"
                            style={{color: "inherit"}}
                        >
                            Menu
                        </a>
                    </CDBSidebarHeader>
                    <CDBSidebarContent className="sidebar-content d-flex">
                        <CDBSidebarMenu className=" flex-fill">
                            <NavLink to="Currencies/ListOfAll">
                                <CDBSidebarMenuItem className="szmata" icon="clipboard-list">
                                    List of All
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <NavLink to="Currencies/MostPopular">
                                <CDBSidebarMenuItem className="szmata" icon="fire"
                                                    suffix={<i className="bi bi-caret-down m-2"></i>}>
                                    Most Popular
                                </CDBSidebarMenuItem>
                            </NavLink>
                            <CDBSidebarMenuItem suffix={<i className="bi bi-caret-down m-2"></i>}
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
                                                className="user-select-none "
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
                                                className="d-flex align-items-center justify-content-center szmata py-2 flex-fill">
                                                <img
                                                    src={`${currency.image}`}
                                                    alt="siema"
                                                    style={{width: "30px", height: "30px", marginLeft: "-5px"}}
                                                />
                                                <CDBSidebarMenuItem
                                                    className="my-0 mx-0 p-0 xd2"
                                                    tag="img"
                                                    style={{width: "100px"}}
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
                                            className="d-flex align-items-center szmata justify-content-center p-1 mb-3">
                                            <div className="my-0 mx-0 p-0 fw-semibold">
                                                Show All
                                            </div>
                                        </div>
                                    </NavLink>
                                ) : null}
                            </div>
                            <NavLink to="Currencies/Trending">
                                <CDBSidebarMenuItem className="szmata" icon="chart-line">
                                    Trending
                                </CDBSidebarMenuItem>
                            </NavLink>

                            <NavLink to="/hero404">
                                <CDBSidebarMenuItem
                                    className="szmata"
                                    icon="exclamation-circle"
                                >
                                    404 page
                                </CDBSidebarMenuItem>
                            </NavLink>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                    <CDBSidebarFooter className="mb-4">
                        <CDBSidebarMenuItem className="szmata d-flex " icon="comment-dots">
                            Contact Us
                        </CDBSidebarMenuItem>
                        <div className="d-flex flex-wrap align-items-center">
                            <CDBSidebarMenuItem className="d-flex" icon="palette">
                                <div
                                    className="d-flex align-items-center justify-content-center py-2">
                                    Dark Mode
                                </div>
                            </CDBSidebarMenuItem>
                            <div className="d-flex justify-content-center flex-fill orm-check form-switch"><input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                style={{cursor: "pointer", paddingLeft: "30px"}}
                            /></div>
                        </div>


                    </CDBSidebarFooter>
                </CDBSidebar>
            </div>
        </>
    );
};

export default Sidebar;
