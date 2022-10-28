import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import RegisterPopup from "../../components/RegisterPopup/RegisterPopup";
import {auth, logout} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {ToastContainer, toast} from "react-toastify";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
    const [user] = useAuthState(auth);
    const [showLoginMenu, setShowLoginMenu] = useState(false);
    const [showRegisterMenu, setShowRegisterMenu] = useState(false);

    const profilePhoto="https://graph.facebook.com/5544168012334199/picture"


    const handleClose = (what) => {
        if (what === "login")
            setShowLoginMenu(false)
        if (what === "register") {
            setShowRegisterMenu(false);
        }
        if (what === "registerWithPopup") {
            setShowRegisterMenu(false);
            toast.info("Successfully Register");
        }


    };


    return (
        <div className="header__container">
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
                    <LoginPopup handleClose={handleClose}/>
                </Modal>
            ) : null}
            {showRegisterMenu === true ? (
                <Modal show={showRegisterMenu} onHide={() => handleClose("register")}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <RegisterPopup handleClose={handleClose}/>
                </Modal>
            ) : null}
            <Navbar collapseOnSelect expand="lg py-2c px-5 border-bottom">
                <div className="container-fluid p-2  d-flex align-items-center">
                    <Navbar.Brand
                        href="/"
                        style={{fontSize: "35px", fontWeight: "700"}}
                        className=" d-flex align-items-center me-5 text-decoration-none text_gradient"
                    >
                        CryptoCurrency
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse
                        id="responsive-navbar-nav"
                        style={{zIndex: "1010"}}
                    >
                        <div className="me-lg-auto justify-content-center user-select-none">
                            <h2 className="m-0">Welcome</h2>
                            <p className="siema">
                                Here is the information about all crypto currencies, Login to
                                get more options
                            </p>
                        </div>
                        {user !== null ? (
                            <Nav className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                <form
                                    className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                                    role="search"
                                >
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search..."
                                        aria-label="Search"
                                    />
                                </form>
                                <NavDropdown
                                    href="#"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    title={
                                        <img
                                            src={user.photoURL!==null ? user.photoURL : profilePhoto}
                                            alt="Profile"
                                            width="32"
                                            height="32"
                                            className="rounded-circle"
                                        />
                                    }
                                    drop="left"
                                    style={{position: "relative"}}
                                >
                                    <NavDropdown.Item href="#action/3.1">
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Settings
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">
                                        Moze cos bedzie
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
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
