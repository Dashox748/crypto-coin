import {
    Box,
    Typography,
    Container,
    useTheme,
    AppBar,
    Toolbar,
    IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AsynchronousSearch from "./utils/asynchronousSearch";



import {Link} from "react-router-dom";

import useResponsive from "../../utils/hooks/useResponsive";
import {TopbarProps} from "./utils/interfaces";
import TopbarMenu from "./utils/TopbarMenu";
import logoDark from "../../assets/logo-dark.png";
const Topbar = ({changeSidebar}: TopbarProps) => {
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 }
        ]
    const theme = useTheme();
    const up700px = useResponsive("up", 800);
    const up750px = useResponsive("up", 751);
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
                    <Link
                        to="/"
                        style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            textDecoration: "none",
                            color: "white",
                        }}
                    >
                        <img
                            src={logoDark}
                            alt="logo"
                            style={{width: "50px", height: "50px"}}
                        />

                        {up700px && (
                            <Typography
                                sx={{fontSize: "calc(1.375rem + 1.3vw)", fontWeight: "700"}}
                            >
                                CryptoCoin
                            </Typography>
                        )}
                    </Link>
                    <AsynchronousSearch/>
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                        }}
                    >
                        {!up750px ? (
                            <>
                                <IconButton onClick={() => changeSidebar()}>
                                    <MenuIcon/>
                                </IconButton>
                            </>
                        ) : (
                            <TopbarMenu/>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Topbar;
