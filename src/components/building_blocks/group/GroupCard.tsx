// React
import { MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

import {
    Button,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    CardMedia
} from "@mui/material"

import { ReturnGroupObject } from '../../../interfaces/edomGroupInterfaces';

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


const GroupCard = (data: ReturnGroupObject, navigate: NavigateFunction) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={(e) => handleClick(e, navigate, `/groups/${data.id}`)}>
                <CardMedia
                    component="img"
                    height="140"
                    src={data.image_url}
                    alt="Scuttle Robot Picture"
                />
                <CardContent
                    sx={{
                        height: '100px',
                        textOverflow: 'ellipsis' 
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.headline}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Management Actions Area?
                </Button>
            </CardActions>
        </Card>          
    )
};

export default GroupCard;