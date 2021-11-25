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
    drawerWidth: number
};

interface NavBarProps {
    drawerWidth: number,
    open: boolean,
    handleDrawerOpen: () => void
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open, drawerWidth }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const NavBar = ( {handleDrawerOpen, open, drawerWidth}: NavBarProps ) => {
    return (
        <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
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
                <Typography variant="h6" noWrap component="div">
                    Persistent drawer
                </Typography>
                <Avatar />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;