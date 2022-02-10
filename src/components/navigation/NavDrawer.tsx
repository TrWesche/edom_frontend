import { styled, useTheme } from '@mui/material/styles';

import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemText,
    Typography,
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
            {['Home', 'Browse', 'FAQ', 'Device Management'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>
                        {index % 2 === 0 ? <MoveToInbox color="secondary" /> : <Mail color="secondary" />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    </Drawer>
  );
}

export default NavDrawer;