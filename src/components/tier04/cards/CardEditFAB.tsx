// Library Imports
import { Fragment, MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';
import {
    Fab
} from "@mui/material"
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
    } 
};

const CardEditFAB = (props: {editPermissions: boolean, navigate: NavigateFunction, navDestination: string}) => {
    return (
        <Fragment>
            {props.editPermissions && 
                <Fab 
                    color='secondary' 
                    size='small' 
                    aria-label='edit' 
                    sx={{ position: "absolute", zIndex: 100, margin: "6px 0 0 6px" }}
                    onClick={(e) => handleClick(e, props.navigate, props.navDestination)}
                >
                    <Edit />
                </Fab>
            }
        </Fragment>
    )
};

export default CardEditFAB;