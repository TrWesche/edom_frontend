// React
import { MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

// Material UI
import {
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia
} from "@mui/material"


// Interface Imports
import { ReturnUserObject } from '../../../interfaces/edomUserInterfaces';

interface ClickEvent extends MouseEvent<HTMLButtonElement> {
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

const UserCard = (data: ReturnUserObject, navigate: NavigateFunction) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={(e) => handleClick(e, navigate, `/users/${data.username_lowercase}`)}>
                <CardMedia
                    component="img"
                    height="140"
                    src={data.image_url}
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
                        {data.first_name} {data.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.headline}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>          
    )
};

export default UserCard;