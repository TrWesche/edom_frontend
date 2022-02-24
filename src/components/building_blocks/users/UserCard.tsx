// Material UI
import {
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia
} from "@mui/material"


// Interface Imports
import { UserObjectProps } from '../../../interfaces/globalInterfaces';


const UserCard = (data: UserObjectProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    alt={`${data.username} Picture`}
                />
                <CardContent
                    sx={{
                        height: '100px',
                        textOverflow: 'ellipsis' 
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {data.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        First Name - Last Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Location
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User Headline
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>          
    )
};

export default UserCard;