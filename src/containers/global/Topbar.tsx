import {useState, lazy, Suspense} from "react";
import {auth} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {
    Box,
    Typography,
    Container,
    useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from "@mui/material/InputBase";
import useResponsive from "../../utils/hooks/useResponsive";
import logoDark from "../../assets/logo-dark.png";
import TopbarMenu from "./utils/TopbarMenu";
import IconButton from '@mui/material/IconButton';

interface props {

    collapseSidebar: () => void,


}

const Topbar = ({collapseSidebar}:props) => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const theme = useTheme();


    const up700px = useResponsive("up", 800);
    const up750px = useResponsive("up", 751);
    const up500px = useResponsive("up", 551);
    return (
        <AppBar
            position="sticky"
            sx={{
                background: `${theme.palette.background.default}`,
                boxShadow: "none",
                top: "0",
                display: "flex",
                marginBottom: "50px",
                height: "120px",
                zIndex: "2",
            }}
        >
            <Container maxWidth={false}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px 0!important",
                    }}
                >
                    <Box display="flex" gap="15px" alignItems="center">
                        <img
                            src={logoDark}
                            alt=""
                            style={{width: "50px", height: "50px"}}
                        />
                        {up700px && <Typography sx={{fontSize: "calc(1.375rem + 1.3vw)", fontWeight: "700"}}>
                            CryptoCoin
                        </Typography>}
                    </Box>
                    <InputBase
                        sx={{
                            m: 2,
                            flex: 1,
                            maxWidth: "500px",
                            background: "#1B2028",
                            borderRadius: "10px",
                            padding: "6px 25px",
                            color: "gray",
                        }}
                        placeholder="Search any coin..."
                    />
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                        }}
                    >
                        {!up750px ? <><IconButton onClick={() => collapseSidebar()}><MenuIcon/></IconButton>
                            <Box position="fixed" top="0" bottom="0" left={showMenu ? "0" : "-550px"} bgcolor="#1B2028"
                                 width={up500px ? "200px" : "100%"} sx={{transition: "all 0.5s ease-in-out"}}>
                            </Box></> : <TopbarMenu/>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Topbar;
