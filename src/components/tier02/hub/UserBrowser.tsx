import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import UserCard from './UserCard';

const UserBrowser = () => {
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
        {["User 1", "User 2"].map((userID) => (
            <li key={`section-${userID}`}>
                <ul>
                    <ListItem key={`item-${userID}`}>
                        <UserCard />
                    </ListItem>
                </ul>
            </li>
        ))}
        </List>
    );
}

export default UserBrowser;