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

import { NavigateFunction, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';


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
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NavDrawer ({ drawerwidth, open, handleDrawerClose }: NavDrawerProps) {
  const theme = useTheme();
  const navigate = useNavigate();

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

            <ListItemButton 
                key='navdrawer-explore'
                href='/explore'
                onClick={(event) => handleClick(event, navigate, '/explore')}>
                <ListItemIcon>
                    <Explore color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Explore" />
            </ListItemButton>

            <ListItemButton 
                key='navdrawer-favorites'
                href='/favorites'
                onClick={(event) => handleClick(event, navigate, '/favorites')}>
                <ListItemIcon>
                    <Star color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Favorites" />
            </ListItemButton>

            <ListItemButton 
                key='navdrawer-groups'
                href='/groups'
                onClick={(event) => handleClick(event, navigate, '/groups')}>
                <ListItemIcon>
                    <Group color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Groups" />
            </ListItemButton>

            <ListItemButton 
                key='navdrawer-rooms'
                href='/rooms'
                onClick={(event) => handleClick(event, navigate, '/rooms')}>
                <ListItemIcon>
                    <MeetingRoom color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Rooms" />
            </ListItemButton>

            <ListItemButton 
                key='navdrawer-equip'
                href='/equip'
                onClick={(event) => handleClick(event, navigate, '/equip')}>
                <ListItemIcon>
                    <DeviceHub color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Equip" />
            </ListItemButton>
{/* 

            {['Home', 'Explore', 'FAQ', 'Device Management'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>
                        {index % 2 === 0 ? <MoveToInbox color="secondary" /> : <Mail color="secondary" />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))} */}
        </List>
    </Drawer>
  );
}

export default NavDrawer;