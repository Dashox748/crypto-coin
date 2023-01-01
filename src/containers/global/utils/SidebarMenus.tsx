import {ReactNode, useState,lazy,Suspense} from "react";
import {MenuItem, menuClasses, SubMenu} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import {auth, logout} from "../../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
const LoginForm = lazy(() => import("../../../components/Forms/LoginForm"));

export const createMenuItem = (
    itemIcon: ReactNode,
    name: string,
    link: string,
    theme: any
) => {
    return (
        <MenuItem
            icon={itemIcon}
            routerLink={<Link to={link}/>}
            rootStyles={{
                ["." + menuClasses.button]: {
                    backgroundColor: theme.palette.background.paper,
                    color: "#9E9E9E",
                    "&:hover": {
                        backgroundColor: "#7314ed",
                        color: "white",
                    },
                },
            }}
        >
            {name}
        </MenuItem>
    );
};

export const createSubMenu = (
    subMenuIcon: ReactNode,
    label: string,
    items: ReactNode
) => {
    const [user] = useAuthState(auth);
    const [showLogin, setShowLogin] = useState<boolean>(false)
    return (
        <SubMenu
            icon={subMenuIcon}
            label={label}
            rootStyles={{
                ["& > ." + menuClasses.button]: {
                    backgroundColor: "transparent",
                    color: "#9E9E9E",
                    "&:hover": {
                        backgroundColor: "#7314ed",
                        color: "white",
                    },
                },
            }}
            onClick={() => (label === "Favourite" && user === null) && setShowLogin(true)}
        >
            {items}
            {showLogin&&<Suspense><LoginForm setShowLogin={setShowLogin}/></Suspense>}
        </SubMenu>
    );
};
