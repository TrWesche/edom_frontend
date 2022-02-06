import {
    AppBar as MuiAppBar,
    AppBarProps as MuiAppBarProps,
    Avatar,
    Toolbar,
    IconButton,
    Typography,
    // useTheme
} from "@mui/material";

import {
    styled
} from "@mui/material/styles"

import {
    Menu as MenuIcon,
} from '@mui/icons-material'


interface AppBarProps extends MuiAppBarProps {
    open?: boolean,
    drawerwidth: number
};

interface NavBarProps {
    drawerwidth: number,
    open: boolean,
    handleDrawerOpen: () => void
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


const NavBar = ( {handleDrawerOpen, open, drawerwidth}: NavBarProps ) => {
    return (
        <AppBar position="fixed" open={open} drawerwidth={drawerwidth} color="primary">
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
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        </Typography>
                    ) : (
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            EDOM
                        </Typography>
                    )
                }
                <Avatar />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;