import { useState, Fragment } from "react";
import { NavigateFunction } from 'react-router-dom';
import { MouseEvent } from 'react';

import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    Avatar,
    Toolbar,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Tooltip,
    Box
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
    const settings = [
        { display: 'Profile', link: `/users/${authData.username}`},
        { display: 'Account', link: '/dm/account'},
        { display: 'Logout', link: '/logout'},
    ];

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                </IconButton>
                { open ? 
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
                            color = "text.primary"
                            href="/"
                            onClick={(event) => handleClick(event, navigate, '/')}
                        >
                            EDOM
                        </Link>
                    )
                }
                { authData.logged_in ?
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="User Account">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="user-menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.link} onClick={handleCloseUserMenu}>
                                    <Link 
                                        textAlign="center"
                                        underline = "none"
                                        color = "secondary"
                                        href={`${setting.link}`}
                                        onClick={(event) => handleClick(event, navigate, `${setting.link}`)}
                                    >
                                        {setting.display}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    :
                    <Fragment>
                        <Link 
                            variant="h6" 
                            noWrap 
                            component="div" 
                            sx={{ cursor: "pointer" }}
                            underline = "none"
                            color = "secondary"
                            href="/login"
                            margin={"0 10px"}
                            onClick={(event) => handleClick(event, navigate, '/login')}
                        >
                            Login
                        </Link>
                        <Link 
                            variant="h6" 
                            noWrap 
                            component="div" 
                            sx={{ cursor: "pointer" }}
                            underline = "none"
                            color = "secondary"
                            href="/register"
                            margin={"0 10px"}
                            onClick={(event) => handleClick(event, navigate, '/register')}
                        >
                            Register
                        </Link>
                    </Fragment>

                }
                
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;