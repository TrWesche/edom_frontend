import { NavigateFunction } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';

import {
    Drawer,
    List,
    Divider,
    ListItemText,
    Typography,
    IconButton,
    ListItemIcon,
    ListItemButton
} from '@mui/material'


import {
    ChevronLeft,
    ChevronRight,
    Explore,
    Home,
    Star,
    Group,
    DeviceHub,
    MeetingRoom
} from '@mui/icons-material'

import { MouseEvent } from 'react';

// Providers
import { authToken } from "../../providers/authProvider";

interface ClickEvent extends MouseEvent<HTMLAnchorElement> {
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


interface NavDrawerProps {
    drawerwidth: number,
    open: boolean,
    handleDrawerClose: () => void
    authData: authToken
    navigate: NavigateFunction
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NavDrawer ({ drawerwidth, open, handleDrawerClose, authData, navigate }: NavDrawerProps) {
  const theme = useTheme();

  return (
    <Drawer
        sx={{
            width: drawerwidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerwidth,
                boxSizing: 'border-box'
            },
        }}
        variant="persistent"
        anchor="left"
        open={open}
    >
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    EDOM
            </Typography>
        </DrawerHeader>
        <Divider sx={{
            borderColor: 'primary.dark'
        }}/>
        <List>
            <ListItemButton 
                key='navdrawer-home'
                href='/'
                onClick={(event) => handleClick(event, navigate, '/')}>
                <ListItemIcon>
                    <Home color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>

            { authData.logged_in ? 
                <ListItemButton 
                    key='navdrawer-explore'
                    href='/explore'
                    onClick={(event) => handleClick(event, navigate, '/explore')}>
                    <ListItemIcon>
                        <Explore color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Explore" />
                </ListItemButton>
                :
                <ListItemButton 
                    key='navdrawer-explore'
                    href='/explore'
                    onClick={(event) => handleClick(event, navigate, `/explore`)}
                    disabled
                >
                    <ListItemIcon>
                        <Star color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Explore" />
                </ListItemButton>
            }

            { authData.logged_in ? 
                <ListItemButton 
                    key='navdrawer-favorites'
                    href={`/${authData.username}/favorites`}
                    onClick={(event) => handleClick(event, navigate, `/${authData.username}/favorites`)}
                >
                    <ListItemIcon>
                        <Star color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                </ListItemButton>
                :
                <ListItemButton 
                    key='navdrawer-favorites'
                    href='/user/favorites'
                    onClick={(event) => handleClick(event, navigate, `/user/favorites`)}
                    disabled
                >
                    <ListItemIcon>
                        <Star color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                </ListItemButton>
            }
            
            { authData.logged_in ? 
                <ListItemButton 
                    key='navdrawer-groups'
                    href={`/${authData.username}/groups`}
                    onClick={(event) => handleClick(event, navigate, `/${authData.username}/groups`)}>
                    <ListItemIcon>
                        <Group color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="My Groups" />
                </ListItemButton>
                :
                <ListItemButton 
                    key='navdrawer-groups'
                    href={`/user/groups`}
                    onClick={(event) => handleClick(event, navigate, `/user/groups`)}
                    disabled
                >
                    <ListItemIcon>
                        <Group color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="My Groups" />
                </ListItemButton>
            }

            { authData.logged_in ? 
                <ListItemButton 
                    key='navdrawer-rooms'
                    href={`/${authData.username}/rooms`}
                    onClick={(event) => handleClick(event, navigate, `/${authData.username}/rooms`)}
                >
                    <ListItemIcon>
                        <MeetingRoom color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="My Rooms" />
                </ListItemButton>
                :
                <ListItemButton 
                    key='navdrawer-rooms'
                    href={`/user/rooms`}
                    onClick={(event) => handleClick(event, navigate, `/user/rooms`)}
                    disabled
                >
                    <ListItemIcon>
                        <MeetingRoom color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="My Rooms" />
                </ListItemButton>
            }

            { authData.logged_in ? 
                <ListItemButton 
                    key='navdrawer-equip'
                    href={`/${authData.username}/equip`}
                    onClick={(event) => handleClick(event, navigate, `/${authData.username}/equip`)}
                >
                    <ListItemIcon>
                        <DeviceHub color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="My Equip" />
                </ListItemButton>
                :
                <ListItemButton 
                    key='navdrawer-equip'
                    href={`/user/equip`}
                    onClick={(event) => handleClick(event, navigate, `/user/equip`)}
                    disabled
                >
                    <ListItemIcon>
                        <DeviceHub color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary="My Equip" />
                </ListItemButton>
            }
        </List>
    </Drawer>
  );
}

export default NavDrawer;