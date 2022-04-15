// React
import React, { MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

import {
    Button,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    CardMedia,
    Fab,
    Box
} from "@mui/material"

import { ReturnEquipObject } from '../../../interfaces/edomEquipInterfaces';
import { Edit } from '@mui/icons-material';

interface ClickEvent extends MouseEvent<HTMLButtonElement> {
    target: ClickTarget
};

interface ClickTarget extends EventTarget {
    href?: string
};

const handleClick = (e: ClickEvent, navigate: NavigateFunction, target: string) => {
    e.preventDefault();
    if (target !== "") {
        navigate(target);
    } else {
        console.log("Error, destination not defined")
    }
};

const EquipCard = (data: ReturnEquipObject, navigate: NavigateFunction) => {
    return (
        <Box>
            {data.edit_permissions ? 
                <Fab color='secondary' size='small' aria-label='edit' sx={{ position: "absolute", zIndex: 100, margin: "6px 0 0 6px" }}>
                    <Edit />
                </Fab> 
                : 
                <React.Fragment></React.Fragment>
            }
            <Card sx={{ flexGrow: 1}} elevation={2}>
                
                <CardActionArea onClick={(e) => handleClick(e, navigate, `/equip/${data.id}`)}>
                    <CardMedia
                        component="img"
                        height="200"
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
                        <Typography variant="body2" color="text.secondary">
                            {data.headline}
                        </Typography>
                    </CardContent>

                </CardActionArea>
            </Card>
        </Box>      
    )
};

export default EquipCard;