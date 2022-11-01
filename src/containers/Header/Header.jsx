import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import RegisterPopup from "../../components/RegisterPopup/RegisterPopup";
import { auth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoDark from "../../images/logo-dark.png";
import logoWhite from "../../images/logo-white.png";
import { Link } from "react-router-dom";

function Header({ darkTheme }) {
  const [user] = useAuthState(auth);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchRespond, setSearchRespond] = useState([]);
  const [showSearchlist, setShowSearchlist] = useState(false);
  const profilePhoto = "https://graph.facebook.com/5544168012334199/picture";

  useEffect(() => {
    if (searchInput.length < 2) {
      setSearchRespond([]);
      setShowSearchlist(false);
      return;
    }
    setShowSearchlist(true);
    const timer = setTimeout(() => {
      fetch(`https://api.coingecko.com/api/v3/search?query=${searchInput}`)
        .then((respond) => respond.json())
        .then((data) => setSearchRespond(data.coins));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleClose = (what) => {
    if (what === "login") setShowLoginMenu(false);
    if (what === "register") {
      setShowRegisterMenu(false);
    }
    if (what === "registerWithPopup") {
      setShowRegisterMenu(false);
      toast.info("Successfully Register");
    }
  };

  return (
    <div
      className={
        darkTheme
          ? "header__container sticky-top"
          : "header__container sticky-top"
      }
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
      {showLoginMenu === true ? (
        <Modal
          show={showLoginMenu}
          onHide={() => handleClose("login")}
          dialogClassName="modal-width"
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <LoginPopup handleClose={handleClose} />
        </Modal>
      ) : null}
      {showRegisterMenu === true ? (
        <Modal show={showRegisterMenu} onHide={() => handleClose("register")}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <RegisterPopup handleClose={handleClose} />
        </Modal>
      ) : null}
      <Navbar
        collapseOnSelect
        expand="lg py-2c px-4  "
        style={{ background: darkTheme ? "#141316" : null }}
      >
        <div className="container-fluid p-2  d-flex align-items-center">
          <Navbar.Brand
            href="/"
            style={{ fontSize: "30px", fontWeight: "700" }}
            className={
              darkTheme
                ? " d-flex align-items-center me-5 text-decoration-none text-white"
                : " d-flex align-items-center me-5 text-decoration-none"
            }
          >
            <img src={darkTheme ? logoDark : logoWhite} />
            CryptoCoin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ zIndex: "1010" }}
          >
            <div className="me-lg-auto justify-content-center user-select-none ps-5 ms-5">
              <h2 className={darkTheme ? "m-0 text-white" : "m-0"}>Welcome</h2>
              <p className={darkTheme ? "siema text-white-50" : "siema"}>
                Here is the information about all crypto currencies, Login to
                get more options
              </p>
            </div>
            {user !== null ? (
              <Nav className="d-flex align-items-center justify-content-center justify-content-lg-start">
                <form
                  style={{ position: "relative" }}
                  className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                  role="search"
                >
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{
                      background: darkTheme ? "#262528" : "",
                      border: darkTheme ? "none" : "",
                      color: darkTheme ? "white" : "",
                      //                                            width:"315px"
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      maxHeight: "300px",
                      background: darkTheme ? "#2c2b2e" : "white",
                      width: "315px",
                      top: "50px",
                      right: "0px",
                      cursor: "pointer",
                    }}
                    className={
                      showSearchlist
                        ? "overflow-auto p-3 d-flex flex-column shadow rounded-4"
                        : "d-none"
                    }
                  >
                    {searchRespond.length !== 0
                      ? searchRespond.map((item) => (
                          <Link
                            to={`/Currencies/AdvancedInfo/${item.id}`}
                            style={{
                              textDecoration: "none",
                              color: darkTheme ? "white" : "black",
                            }}
                          >
                            <div
                              className={
                                darkTheme
                                  ? "d-flex justify-content-between hover-search-list-dark py-3 px-2 rounded-2"
                                  : "d-flex justify-content-between hover-search-list py-3 px-2 rounded-2"
                              }
                            >
                              <div>
                                <img src={item.thumb} className="me-3" />
                                <span className="fw-semibold">{item.name}</span>
                              </div>
                              <span className="">{item.symbol}</span>
                            </div>
                          </Link>
                        ))
                      : null}
                  </div>
                </form>
                <NavDropdown
                  menuVariant={darkTheme ? "dark" : null}
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  title={
                    <img
                      src={
                        user.photoURL !== null ? user.photoURL : profilePhoto
                      }
                      alt="Profile"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  }
                  drop="left"
                  style={{ position: "relative" }}
                >
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-outline-primary me-2"
                  onClick={() => setShowLoginMenu(true)}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowRegisterMenu(true)}
                >
                  Sign-up
                </button>
              </div>
            )}
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
