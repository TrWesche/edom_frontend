// Library Imports
import React, { Fragment, MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';
import {
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CardActions,
    Fab,
    Box
} from "@mui/material"

import CardMediaImage from '../../tier04/cards/CardMediaImage';
import CardContentSection, {CardContentProps} from '../../tier04/cards/CardContentSection';
import CardEditFAB from '../../tier04/cards/CardEditFAB';
import { CardProps } from "./_interfaceCardProps";

// Interface Imports
// interface CardSettingProps {
//     numColumns: number
//     numRows: number
//     displayEdit: boolean
//     displayMedia: boolean
//     mediaHeight: number
//     displayContent: boolean
//     contentHeight: number
//     displayActions: boolean
//     actionHeight: number
//     enableActionArea: boolean
// };

// interface CardDataProps {
//     editAllowed: boolean
//     editButtonDestination: string
//     actionAreaDestination: string
//     mediaURI: string
//     mediaAltText: string
//     contentTexts: Array<CardContentProps>
// };

// export interface HorizontalCardProps {
//     settings: CardSettingProps
//     data: CardDataProps
// };

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


const HorizontalCard = (config: CardProps, navigate: NavigateFunction) => {
    return (
        <Box>
            {config.settings.displayEdit && 
                <CardEditFAB 
                    editPermissions={config.data.editAllowed}
                    navigate={navigate}
                    navDestination={config.data.editButtonDestination}
                />
            }

            <Card sx={{ flexGrow: 1}} elevation={2}>
                {config.settings.enableActionArea ?
                    <CardActionArea onClick={(e) => handleClick(e, navigate, config.data.actionAreaDestination)}>
                        <CardMediaImage 
                            showMedia={config.settings.displayMedia}
                            mediaHeight={config.settings.mediaHeight}
                            srcURI={config.data.mediaURI}
                            altText={config.data.mediaAltText}
                        />
                        <CardContentSection 
                            showContent={config.settings.displayContent}
                            contentHeight={config.settings.contentHeight}
                            textSections={config.data.contentTexts}
                        />
                    </CardActionArea>
                    :
                    <Fragment>
                        <CardMediaImage 
                            showMedia={config.settings.displayMedia}
                            mediaHeight={config.settings.mediaHeight}
                            srcURI={config.data.mediaURI}
                            altText={config.data.mediaAltText}
                        />
                        <CardContentSection 
                            showContent={config.settings.displayContent}
                            contentHeight={config.settings.contentHeight}
                            textSections={config.data.contentTexts}
                        />
                    </Fragment>
                }
            </Card>
        </Box>
    )
};

export default HorizontalCard;