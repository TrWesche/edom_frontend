// Library Imports
import { Fragment } from 'react';
import {
    CardMedia
} from "@mui/material"


const CardMediaImage = (props: {showMedia: boolean, mediaHeight: number, srcURI: string, altText: string}) => {
    return (
        <Fragment>
            {props.showMedia && 
                <CardMedia
                    component="img"
                    height={`${props.mediaHeight}px`}
                    src={props.srcURI}
                    alt={props.altText}
                />
            }
        </Fragment>
    )
};

export default CardMediaImage;