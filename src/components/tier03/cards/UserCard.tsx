// Library Imports
import React, { MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';
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
        <Card sx={{ flexGrow: 1}} elevation={2}>
            <CardActionArea onClick={(e) => handleClick(e, navigate, `/users/${data.username_clean}`)}>
                <CardMedia
                    component="img"
                    height="200"
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
                    {data.first_name || data.last_name ? 
                        <Typography variant="body2" color="text.secondary">
                            {data.first_name ? data.first_name : ""} {data.last_name ? data.last_name : ""}
                        </Typography>
                        :
                        <React.Fragment />
                    }
                    {data.location ? 
                        <Typography variant="body2" color="text.secondary">
                            {data.location}
                        </Typography>
                        :
                        <React.Fragment />
                    }
                    {data.headline ? 
                        <Typography variant="body2" color="text.secondary">
                            {data.headline}
                        </Typography>
                        :
                        <React.Fragment />
                    }
                </CardContent>
            </CardActionArea>
        </Card>          
    )
};

export default UserCard;