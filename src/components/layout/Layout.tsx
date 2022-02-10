import React, { useEffect, useState } from "react";
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
        // backgroundColor: theme.palette.primary.dark
    }));

const Offset = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
}));

const Layout = () => {
    const [open, setOpen] = useState(false);
    const [dimensions, setDimensions] = React.useState({ 
        height: window.innerHeight,
        width: window.innerWidth
    });
      
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }
        window.addEventListener('resize', handleResize)
    });
        

    const handleDrawerOpen = () => {setOpen(true);};
    const handleDrawerClose = () => {setOpen(false);};

    return (
        <Box sx={{ display: 'flex' }} bgcolor={'background.default'} minHeight={`${dimensions.height}px`} minWidth={`${dimensions.width}px`}>
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