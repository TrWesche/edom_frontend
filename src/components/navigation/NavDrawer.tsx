import { styled, useTheme } from '@mui/material/styles';

import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemText,

    IconButton,
    ListItemIcon
} from '@mui/material'


import {
    MoveToInbox,
    Mail,
    ChevronLeft,
    ChevronRight
} from '@mui/icons-material'


interface NavDrawerProps {
    drawerWidth: number,
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

function NavDrawer ({ drawerWidth, open, handleDrawerClose }: NavDrawerProps) {
  const theme = useTheme();

  return (
    <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
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
        </DrawerHeader>
        <Divider />
        <List>
            {['Home', 'Explore', 'FAQ', 'Device Management'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>
                        {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    </Drawer>
  );
}

export default NavDrawer;