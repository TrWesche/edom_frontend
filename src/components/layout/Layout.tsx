import React from "react";
import { Outlet } from "react-router";

import {
    Box,
    styled,
    // useTheme
} from "@mui/material"

import NavBar from "../navigation/NavBar";
import NavDrawer from "../navigation/NavDrawer";

const drawerwidth = 240;

interface MainProps {
    open: boolean
}

const Main = styled('main', { 
        shouldForwardProp: (prop) => prop !== 'open' 
    }) <MainProps> (({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerwidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }));

const Offset = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
}));

const Layout = () => {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {setOpen(true);};
    const handleDrawerClose = () => {setOpen(false);};

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar drawerwidth={drawerwidth} open={open} handleDrawerOpen={handleDrawerOpen} />
            <NavDrawer drawerwidth={drawerwidth} open={open} handleDrawerClose={handleDrawerClose} />
            <Main open={open}>
                <Offset />
                <Outlet />
            </Main>
        </Box>
    )
}

export default Layout;