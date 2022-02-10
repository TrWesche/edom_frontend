import { useState, useLayoutEffect } from "react";
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

const useWindowSize = () => {
    const [size, setSize] = useState(
        {
            height: 0,
            width: 0
        }
    );
    useLayoutEffect(() => {
        function updateSize() {
            setSize({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

const Layout = () => {
    const [open, setOpen] = useState(false);
    const dimensions = useWindowSize();
        
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