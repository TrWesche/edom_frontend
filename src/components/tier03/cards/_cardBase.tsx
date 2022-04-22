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

import CardEditFAB from '../../tier04/cards/cardEditFAB';
import CardMediaImage from '../../tier04/cards/CardMediaImage';
import CardContentSection, {CardContentProps} from '../../tier04/cards/CardContentSection';

// Interface Imports
interface CardSettingProps {
    numColumns: number
    numRows: number
    displayEdit: boolean
    displayMedia: boolean
    displayContent: boolean
    displayActions: boolean
    enableActionArea: boolean
};

interface CardDataProps {
    editAllowed: boolean
    editButtonDestination: string
    actionAreaDestination: string
    mediaURI: string
    mediaAltText: string
    contentTexts: Array<CardContentProps>
};

export interface CardBaseProps {
    settings: CardSettingProps
    navigate: NavigateFunction
    data: CardDataProps
};

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


const CardBase = (config: CardBaseProps) => {
    return (
        <Box>
            {config.settings.displayEdit && 
                <CardEditFAB 
                    editPermissions={config.data.editAllowed}
                    navigate={config.navigate}
                    navDestination={config.data.editButtonDestination}
                />
            }

            <Card sx={{ flexGrow: 1}} elevation={2}>
                {config.settings.enableActionArea ?
                    <CardActionArea onClick={(e) => handleClick(e, config.navigate, config.data.actionAreaDestination)}>
                        <CardMediaImage 
                            showMedia={config.settings.displayMedia}
                            srcURI={config.data.mediaURI}
                            altText={config.data.mediaAltText}
                        />
                        <CardContentSection 
                            showContent={config.settings.displayContent}
                            textSections={config.data.contentTexts}
                        />
                    </CardActionArea>
                    :
                    <Fragment>
                        <CardMediaImage 
                            showMedia={config.settings.displayMedia}
                            srcURI={config.data.mediaURI}
                            altText={config.data.mediaAltText}
                        />
                        <CardContentSection 
                            showContent={config.settings.displayContent}
                            textSections={config.data.contentTexts}
                        />
                    </Fragment>
                }
            </Card>
        </Box>
    )
};

export default CardBase;