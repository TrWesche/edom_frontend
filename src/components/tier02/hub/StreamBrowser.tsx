import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import StreamCard from './StreamCard';

const StreamBrowser = () => {
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
        {["Robot Streams", "User Streams"].map((sectionId) => (
            <li key={`section-${sectionId}`}>
                <ul>
                    <ListSubheader>{`${sectionId}`}</ListSubheader>
                    {[0, 1, 2].map((item) => (
                        <ListItem key={`item-${sectionId}-${item}`}>
                            <StreamCard />
                        </ListItem>
                    ))}
                </ul>
            </li>
        ))}
        </List>
    );
}

export default StreamBrowser;