import { NavigateFunction } from 'react-router-dom';
import { MouseEvent } from 'react';

import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    Avatar,
    Toolbar,
    IconButton,
    Typography,
    Link,
    // useTheme
} from "@mui/material";

import {
    styled
} from "@mui/material/styles"

import {
    Menu as MenuIcon,
} from '@mui/icons-material'

// Providers
import { authToken } from "../../providers/authProvider";


interface ClickEvent extends MouseEvent<HTMLSpanElement> {
    target: ClickTarget
};

interface ClickTarget extends EventTarget {
    href?: string
};

const handleClick = (e: ClickEvent, navigate: NavigateFunction, target: string) => {
    e.preventDefault();
    // console.log(`Clicked: ${target}`)
    if (target !== "") {
        navigate(target);
    } else {
        console.log("Error, destination not defined")
    }
};



interface AppBarProps extends MuiAppBarProps {
    open?: boolean,
    drawerwidth: number
};

interface NavBarProps {
    drawerwidth: number,
    open: boolean,
    handleDrawerOpen: () => void
    authData: authToken
    navigate: NavigateFunction
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open, drawerwidth: drawerwidth }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerwidth}px)`,
        marginLeft: `${drawerwidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const NavBar = ( {handleDrawerOpen, open, drawerwidth, authData, navigate}: NavBarProps ) => {
    return (
        <AppBar position="fixed" open={open} drawerwidth={drawerwidth} sx={{
            backgroundColor: "background.paper"
        }} >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>{ open ? 
                    (
                        <Link 
                            variant="h6" 
                            noWrap 
                            component="div" 
                            sx={{ flexGrow: 1 }}>
                        </Link>
                    ) : (
                        <Link 
                            variant="h6" 
                            noWrap 
                            component="div" 
                            sx={{ flexGrow: 1, cursor: "pointer" }}
                            underline = "none"
                            color = "secondary"
                            href="/"
                            onClick={(event) => handleClick(event, navigate, '/')}
                        >
                            EDOM
                        </Link>
                    )
                }
                <Avatar />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;