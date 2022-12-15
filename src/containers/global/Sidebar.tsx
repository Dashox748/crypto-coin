import {Sidebar, Menu, SubMenu, MenuItem, useProSidebar, menuClasses} from "react-pro-sidebar";
import {Box, IconButton, Typography} from "@mui/material";
import logoDark from "../../assets/logo-dark.png";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ListAltIcon from '@mui/icons-material/ListAlt';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ErrorIcon from '@mui/icons-material/Error';
import ChatIcon from '@mui/icons-material/Chat';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {Link} from "react-router-dom"
import {ReactNode} from "react";


const SidebarLeft = () => {
    const {collapseSidebar, collapsed} = useProSidebar();

    const createMenuItem = (itemIcon: ReactNode, name: string, link: string) => {
        return <MenuItem icon={itemIcon} routerLink={<Link to={link}/>} rootStyles={{
            ['.' + menuClasses.button]: {
                backgroundColor: '#1B2028',
                color: '#9E9E9E',
                '&:hover': {
                    backgroundColor: '#7314ed',
                    color: "white"
                },
            },
        }}
        > {name} </MenuItem>
    }

    const createSubMenu = (subMenuIcon: ReactNode, label: string, items: ReactNode) => {
        return <SubMenu icon={subMenuIcon} label={label} rootStyles={{
            ['& > .' + menuClasses.button]: {
                backgroundColor: "#1B2028",
                color: '#9E9E9E',
                '&:hover': {
                    backgroundColor: '#7314ed',
                    color: "white"
                },
            },
        }}>
            {items}
        </SubMenu>
    }
    return (
        <Box height="100%">
            <Sidebar backgroundColor="#1B2028"
                     rootStyles={{
                         height: "100%",
                         border: "0",
                     }}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Menu>
                        <MenuItem rootStyles={{
                            ['.' + menuClasses.button]: {
                                color: 'white',
                                height: "80px",
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            },
                        }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                {!collapsed ?
                                    <Link to="/" style={{textDecoration: "none", color: "white"}}><Box display="flex"
                                                                                                       gap="6px"><img
                                        src={logoDark} alt=""
                                        style={{width: "35px"}}/><Typography
                                        sx={{fontSize: "21px", fontWeight: "700"}}>CryptoCoin</Typography></Box>
                                    </Link> : null}
                                <IconButton onClick={() => collapseSidebar()}>
                                    <MenuOutlinedIcon style={{color: "white"}}/>
                                </IconButton>
                            </Box>
                        </MenuItem>
                        {createMenuItem(<ListAltIcon/>, "List Of All", "listOfAll")}
                        {createSubMenu(<WhatshotIcon/>, "Most Popular", [
                            createMenuItem(<ListAltIcon/>, "BitCoin", "bitcoin"),
                            createMenuItem(<ListAltIcon/>, "Ethereum", "ethereum"),
                            createMenuItem(<ListAltIcon/>, "DogeCoin", "dogecoin"),
                            createMenuItem(<ListAltIcon/>, "Terra", "terra"),
                        ])}
                        {createSubMenu(<StarIcon/>, "Favourite", [
                            createMenuItem(<ListAltIcon/>, "BitCoin", "bitcoin"),
                            createMenuItem(<ListAltIcon/>, "Ethereum", "ethereum"),
                            createMenuItem(<ListAltIcon/>, "DogeCoin", "dogecoin"),
                            createMenuItem(<ListAltIcon/>, "Terra", "terra"),
                        ])}
                        {createMenuItem(<TrendingUpIcon/>, "Trending", "trending")}
                        {createMenuItem(<ErrorIcon/>, "404 page", "notFound")}
                    </Menu>
                    <Menu>
                        {createMenuItem(<ChatIcon/>, "Cotact Us", "contact")}
                        {createMenuItem(<DarkModeIcon/>, "Dark Mode", "mode")}

                    </Menu>
                </Box>
            </Sidebar>
        </Box>
    )
}

export default SidebarLeft