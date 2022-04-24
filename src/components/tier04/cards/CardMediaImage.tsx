// Library Imports
import { Fragment } from 'react';
import {
    CardMedia
} from "@mui/material"


const CardMediaImage = (props: {showMedia: boolean, mediaHeight?: number , mediaWidth?: number , srcURI: string, altText: string}) => {
    return (
        <Fragment>
            {props.showMedia && 
                <CardMedia
                    component="img"
                    sx={{
                        height: props.mediaHeight ? `${props.mediaHeight}px` : 'auto',
                        width: props.mediaWidth ? `${props.mediaWidth}px` : '100%'
                    }}
                    src={props.srcURI}
                    alt={props.altText}
                />
            }
        </Fragment>
    )
};

export default CardMediaImage;