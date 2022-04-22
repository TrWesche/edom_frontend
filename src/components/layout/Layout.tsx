// Libraries
import { useState, useLayoutEffect } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Outlet } from "react-router";
import {
    Box,
    styled,
    // useTheme
} from "@mui/material"

// Providers
import { useAuth } from "../../providers/authProvider";

// Components
import NavBar from "../tier01/navigation/NavBar";
import NavDrawer from "../tier01/navigation/NavDrawer";

// TODO: On webpage small (width less than 600 px) the NavDrawer should start sitting on top of the main window rather than resizing the content window.
// at Extra Small widths (with less than 480px)the NavDrawer's width should increase to cover the entire main window area and should automatically
// retract on click of an option from the menu.
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
            // console.log("Size Update", window.innerHeight, window.innerWidth);
            const scrollBarWidth = document.getElementsByTagName('html')[0].clientWidth;
            // console.log(document.getElementsByTagName('html')[0].clientWidth);
            setSize({
                height: window.innerHeight,
                width: window.innerWidth - scrollBarWidth
            });
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

const Layout = () => {
    const { authData } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const dimensions = useWindowSize();
        
    const handleDrawerOpen = () => {setOpen(true);};
    const handleDrawerClose = () => {setOpen(false);};

    return (
        <Box sx={{ display: 'flex' }} bgcolor={'background.default'} minHeight={`${dimensions.height}px`} minWidth={`${dimensions.width}px`}>
            <NavBar drawerwidth={drawerwidth} open={open} handleDrawerOpen={handleDrawerOpen} authData={authData} navigate={navigate}/>
            <NavDrawer drawerwidth={drawerwidth} open={open} handleDrawerClose={handleDrawerClose} authData={authData} navigate={navigate}/>
            <Main open={open}>
                <Offset />
                <Outlet />
            </Main>
        </Box>
    )
}

export default Layout;